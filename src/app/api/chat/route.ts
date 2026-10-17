// Allow up to 60 seconds for the LLM to respond
export const maxDuration = 60;

import { NextResponse } from "next/server";

/**
 * Chat API — calls Cloudflare Workers AI directly (Llama 3.1 8B Instruct).
 *
 * No n8n, no Oracle Cloud, no external dependencies.
 * Cloudflare Workers AI runs inference at the edge — fast + reliable.
 *
 * Env (Vercel):
 *   CLOUDFLARE_API_TOKEN  = Cloudflare API token
 *   CLOUDFLARE_ACCOUNT_ID = Cloudflare account ID
 *
 * Free tier: 10,000 requests/day (more than enough for a taxi dispatcher)
 */

const SYSTEM_PROMPT = [
  "Tu es l'agent virtuel de Taxi Chomedey (besttaxilaval.ca), un service de taxi à Laval et Montréal, Québec.",
  "",
  "INFORMATIONS SUR L'ENTREPRISE :",
  "- Nom : Taxi Chomedey (besttaxilaval.ca)",
  "- Téléphone : 514-239-6512",
  "- Courriel : contact@besttaxilaval.ca",
  "- Horaires : 24h/24, 7j/7 (service de nuit disponible)",
  "- Zone de service : Laval, Rive-Nord, Laurentides",
  "- Fondé en 2020",
  "- Flotte : 50+ véhicules récents, climatisés",
  "- Chauffeurs autorisés SAAQ, conforme MTMD",
  "- Note : 4.9/5 basée sur plus de 850 avis clients",
  "- NEQ : 2276874064",
  "",
  "TARIFICATION :",
  "- Tarif officiel CTQ (Commission des transports du Québec)",
  "- Prix fixe = max(UberX pointe, compteur CTQ jour/nuit)",
  "- Aligné sur UberX (pointe) — jamais de surge",
  "- Prix comptant = prix fixe ÷ 1.034 (remise 3,4 % correspondant aux frais de terminal carte)",
  "- Paiement accepté : carte de crédit, débit, comptant",
  "- Tarifs jour (5h–23h) : base 4,10 $ + 1,05 $ (levy) + 2,05 $/km + 0,77 $/min",
  "- Tarifs nuit (23h–5h) : base 4,70 $ + 1,05 $ (levy) + 2,35 $/km + 0,89 $/min",
  "- Sous 22,5 km/h le compteur charge le temps ; au-dessus, la distance. Jamais les deux.",
  "",
  "SERVICES :",
  "- Transport local (Laval, Rive-Nord, Laurentides)",
  "- Transport aéroport YUL (Montréal-Trudeau) — suivi de vol en direct, sans frais en cas de retard",
  "- Survoltage de batterie (boost) : 35 $ à 80 $ selon véhicule, heure et lieu",
  "- Déverrouillage de portière (débarrage) : 35 $ à 120 $ selon difficulté, véhicule et heure",
  "- Livraison express (Walmart, Maxi, Super C, colis)",
  "- Transport médical (vers hôpitaux : Cité-de-la-Santé, etc.)",
  "- Service de raccompagnement (vous rentrez avec votre propre véhicule)",
  "- Service d'urgence routière 24/7",
  "",
  "TON RÔLE :",
  "- Aider le client à obtenir un prix fixe et garanti pour son trajet taxi.",
  "- Collecter (une question à la fois) : origine → destination → date/heure.",
  "- Quand tu as les 3 informations, émettre un bloc ===FARE_REQUEST=== pour déclencher le calcul.",
  "",
  "CONDUITE DE LA CONVERSATION (pose UNE seule question par message) :",
  "",
  "1. Accueille le client en français québécois, demande l'origine (point de départ).",
  "2. Quand l'origine est donnée, demande la destination.",
  "3. Quand la destination est donnée, demande la date et l'heure de départ. Précise que c'est optionnel (maintenant par défaut).",
  "4. Quand tu as l'origine, la destination et (optionnellement) la date, tu retournes UN SEUL bloc à la fin de ta réponse, formaté EXACTEMENT comme suit (pas de texte après ce bloc) :",
  "",
  "===FARE_REQUEST===",
  '{"origin":"<adresse de départ nettoyée et complète>","destination":"<adresse destination nettoyée et complète>","datetime":"<ISO 8601 ou chaîne vide>"}',
  "===END_FARE_REQUEST===",
  "",
  "RÈGLES IMPORTANTES :",
  "- Pose UNE seule question par message. Sois bref et courtois.",
  "- Si le client donne l'origine et la destination en un seul message, passe directement à la demande de date.",
  '- Si le client dit "maintenant", "aujourd\'hui", "tout de suite", laisse le champ datetime vide ("").',
  '- Si le client dit "demain 8h", calcule la date réelle (demain à 8h00) en format ISO 8601 (ex: "2026-10-12T08:00").',
  '- Nettoie les adresses : ajoute "Laval, QC" ou "Montréal, QC" si le client donne juste un quartier (ex: "Chomedey" → "Chomedey, Laval, QC").',
  '- Pour YUL ou "aéroport", utilise "Aéroport international Montréal-Trudeau, Dorval, QC".',
  "- Réponds TOUJOURS en français québécois.",
  "- Si le client pose une question hors-sujet (info sur la compagnie, tarifs, services), réponds en utilisant les INFORMATIONS SUR L'ENTREPRISE ci-dessus en 1-3 phrases, puis reviens à la collecte du trip si pertinent.",
  "- Ne JAMAIS inventer un prix. Attends d'avoir les 3 informations avant d'émettre le bloc ===FARE_REQUEST===.",
  "- Ne JAMAIS afficher de tableau de prix toi-même. Le système va le générer automatiquement à partir du bloc.",
].join("\n");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, serviceContext } = body || {};

    if (!Array.isArray(messages)) {
      return NextResponse.json(
        { error: "messages array required" },
        { status: 400 }
      );
    }

    // If serviceContext is provided, prepend it to the system prompt
    // so the LLM knows which service page the user is on
    let fullPrompt = SYSTEM_PROMPT;
    if (serviceContext === "raccompagnement") {
      fullPrompt = SYSTEM_PROMPT + "\n\nIMPORTANT: L'utilisateur est actuellement sur la page RACCOMPAGNEMENT (chauffeur désigné). Vous DEVEZ utiliser le flux C (raccompagnement) — pas le flux A (taxi). Quand vous émettez le bloc ===FARE_REQUEST===, incluez TOUJOURS \"service\":\"raccompagnement\" dans le JSON. Ne demandez PAS la date/heure (toujours tarif jour). Collectez seulement origine + destination.";
    }

    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

    if (!apiToken || !accountId) {
      console.error("Cloudflare credentials not set");
      return NextResponse.json(
        { error: "Agent non configuré (CLOUDFLARE_API_TOKEN ou CLOUDFLARE_ACCOUNT_ID manquant)." },
        { status: 503 }
      );
    }

    // Call Cloudflare Workers AI (Llama 3.1 8B Instruct) directly
    // OpenAI-compatible format — simple and reliable
    const cfUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/meta/llama-3.1-8b-instruct`;

    const cfRes = await fetch(cfUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          { role: "system", content: fullPrompt },
          ...messages,
        ],
      }),
    });

    if (!cfRes.ok) {
      const text = await cfRes.text().catch(() => "");
      console.error("Cloudflare AI error:", cfRes.status, text);
      return NextResponse.json(
        { error: "Erreur agent — réessayez." },
        { status: 502 }
      );
    }

    const data = await cfRes.json();

    // Extract response — Cloudflare returns both 'response' and 'choices[0].message.content'
    const response =
      data?.result?.response ||
      data?.result?.choices?.[0]?.message?.content ||
      data?.response ||
      "";

    if (!response) {
      console.error("Empty response from Cloudflare AI:", JSON.stringify(data).slice(0, 200));
      return NextResponse.json(
        { error: "Réponse vide — réessayez." },
        { status: 502 }
      );
    }

    return NextResponse.json({ response });
  } catch (err) {
    console.error("Chat API error:", err);
    return NextResponse.json(
      { error: "Erreur serveur — réessayez." },
      { status: 500 }
    );
  }
}
