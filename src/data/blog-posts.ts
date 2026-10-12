/**
 * Blog post data for Taxi Chomedey (besttaxilaval.ca).
 *
 * 3 initial articles — French + English versions.
 *
 * Articles are written for SEO + AI search visibility:
 * - Keyword-rich titles matching real queries
 * - FAQPage-compatible Q&A in faqs[]
 * - Internal CTAs to service pages + chat agent
 *
 * To add a new article:
 * 1. Add to blogPostsFr (and blogPostsEn with same slug — translated)
 * 2. Article auto-appears on /fr/blog + /en/blog lists
 * 3. Article auto-renders at /fr/blog/[slug] + /en/blog/[slug]
 * 4. Sitemap auto-includes it (see src/app/sitemap.ts)
 */

export type BlogSection =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | {
      type: "callout";
      variant: "info" | "tip" | "warning";
      title?: string;
      text: string;
    }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "example";
      title: string;
      rows: Array<{ label: string; value: string }>;
    }
  | { type: "cta"; text: string; href: string; label: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date
  author: string;
  readingTime: string;
  category: string;
  body: BlogSection[];
  faqs: Array<{ q: string; a: string }>;
  relatedServices: Array<{ title: string; href: string }>;
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE 1: Combien coûte un taxi de Laval à l'aéroport YUL en 2026 ?
// ─────────────────────────────────────────────────────────────────────────────

const article1Fr: BlogPost = {
  slug: "combien-coute-taxi-laval-aeroport-yul-2026",
  title: "Combien coûte un taxi de Laval à l'aéroport YUL en 2026 ?",
  description:
    "Tarif officiel CTQ, prix fixe aligné sur UberX, exemple réel Laval → YUL ~60-70 $ le jour. Tout ce qui affecte le prix : distance, heure, paiement, astuces pour économiser.",
  date: "2026-01-15",
  author: "Taxi Chomedey",
  readingTime: "8 min",
  category: "Tarifs",
  body: [
    {
      type: "p",
      text: "Question que nous entendons chaque semaine : « Combien coûte un taxi de Laval à l'aéroport Montréal-Trudeau (YUL) en 2026 ? » La réponse courte : entre 55 $ et 75 $ le jour, 65 $ à 85 $ la nuit, selon votre point de départ exact à Laval. La réponse longue : le tarif dépend du compteur CTQ officiel, du prix UberX (pointe), de l'heure de départ, et du mode de paiement. Dans cet article, on vous explique tout — avec un exemple concret.",
    },
    { type: "h2", text: "Le tarif officiel CTQ (Commission des transports du Québec)" },
    {
      type: "p",
      text: "Tous les taxis licenciés au Québec doivent utiliser le tarif CTQ. Pas de surge, pas de prix inventé. Voici les taux en vigueur en 2026 :",
    },
    {
      type: "table",
      headers: ["Composante", "Jour (5h–23h)", "Nuit (23h–5h)"],
      rows: [
        ["Prise en charge (base)", "4,10 $", "4,70 $"],
        ["Redevance (levy)", "1,05 $", "1,05 $"],
        ["Par kilomètre", "2,05 $", "2,35 $"],
        ["Par minute", "0,77 $", "0,89 $"],
      ],
    },
    {
      type: "p",
      text: "Le compteur charge soit la distance, soit le temps — jamais les deux en même temps. Sous 22,5 km/h (embouteillage), c'est le temps. Au-dessus, c'est la distance. Le montant total est calculé automatiquement par le compteur homologué.",
    },
    { type: "h2", text: "Notre prix fixe — aligné sur UberX (pointe)" },
    {
      type: "p",
      text: "Chez Taxi Chomedey, on applique un prix fixe garanti pour le trajet Laval → YUL. La formule :",
    },
    {
      type: "callout",
      variant: "info",
      title: "Prix fixe = max(UberX pointe, compteur CTQ)",
      text: "On prend le plus élevé entre le prix UberX en heure de pointe et le compteur CTQ selon l'heure. Comme ça, le client paie jamais plus cher que UberX en pointe, et on garantit un revenu minimum au chauffeur.",
    },
    {
      type: "p",
      text: "Le paiement comptant vous donne 3,4 % de remise (qu'on enlève des frais de terminal carte). Donc un prix fixe de 65 $ carte devient 62,79 $ comptant.",
    },
    { type: "h2", text: "Exemple réel : Chomedey (Laval) → Aéroport YUL" },
    {
      type: "p",
      text: "Trajet typique : départ Chomedey, Laval, destination Aéroport international Montréal-Trudeau, Dorval. Distance ~25 km, durée ~28 minutes selon la circulation.",
    },
    {
      type: "example",
      title: "Calcul détaillé (jour, 14h, circulation normale)",
      rows: [
        { label: "Distance", value: "25 km" },
        { label: "Durée estimée", value: "28 min" },
        { label: "Compteur CTQ jour", value: "4,10 $ + 1,05 $ + (25 × 2,05 $) = 56,40 $" },
        { label: "UberX habituel", value: "5,75 $ + (25 × 1,15 $) + (28 × 0,28 $) = 43,49 $ (arrondi 43 $)" },
        { label: "UberX pointe (×1,45)", value: "43 $ × 1,45 = 62,35 $ (arrondi 62 $)" },
        { label: "Prix fixe (carte)", value: "max(62 $, 57 $) = 62 $" },
        { label: "Prix comptant (−3,4 %)", value: "62 $ / 1,034 = 59,96 $" },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Astuce : payez comptant",
      text: "Pour ce trajet, payer en argent comptant vous économise 2 $. Sur un aller-retour (Laval → YUL → Laval), c'est 4 $ d'économisé. Sur 10 trajets par mois, c'est 40 $.",
    },
    { type: "h2", text: "Ce qui affecte le prix" },
    {
      type: "ul",
      items: [
        "Point de départ exact à Laval (Chomedey vs Sainte-Rose vs Saint-François) — écart de 5-15 $",
        "Heure de départ (jour 5h–23h vs nuit 23h–5h) — la nuit coûte ~15 % plus cher",
        "Circulation (heure de pointe 7h–9h et 16h–19h ajoute du temps) — le compteur charge alors le temps au lieu de la distance",
        "Mode de paiement (comptant = −3,4 %, carte = plein tarif)",
        "Vol en retard — pas de surcharge, on ajuste automatiquement l'heure",
      ],
    },
    { type: "h2", text: "Quand réserver ?" },
    {
      type: "p",
      text: "Pour un vol tôt le matin (5h–7h), réservez la veille. On a 50+ véhicules mais les créneaux de pointe partent vite. Pour un vol en après-midi, vous pouvez appeler 30 minutes avant — on a presque toujours un chauffeur disponible dans Laval.",
    },
    {
      type: "cta",
      text: "Vous voulez un prix exact pour votre trajet Laval → YUL maintenant ?",
      href: "/fr/calculer-prix",
      label: "Calculer mon tarif fixe →",
    },
  ],
  faqs: [
    {
      q: "Combien coûte un taxi de Laval à l'aéroport YUL ?",
      a: "Entre 55 $ et 75 $ le jour (5h–23h), 65 $ à 85 $ la nuit (23h–5h), selon le quartier de Laval. Le prix fixe = max(UberX pointe, compteur CTQ). Paiement comptant = 3,4 % de remise.",
    },
    {
      q: "Est-ce qu'il y a un supplément de nuit ?",
      a: "Oui, le tarif CTQ nuit (23h–5h) est ~15 % plus cher que le tarif jour. La prise en charge passe de 4,10 $ à 4,70 $, le km de 2,05 $ à 2,35 $, la minute de 0,77 $ à 0,89 $.",
    },
    {
      q: "Le prix change-t-il en cas d'embouteillage ?",
      a: "Sous 22,5 km/h, le compteur CTQ charge le temps (et non la distance). En heure de pointe (7h–9h, 16h–19h), le trajet Laval → YUL peut coûter 5–10 $ de plus si la circulation est dense.",
    },
    {
      q: "Y a-t-il un supplément pour les bagages ?",
      a: "Non. Le tarif CTQ ne prévoit aucun supplément bagage. Le prix est le même pour 1 passager sans valise ou 4 passagers avec valises.",
    },
    {
      q: "Le chauffeur suit-il mon vol en cas de retard ?",
      a: "Oui. On suit le statut de votre vol en direct. Si votre avion a du retard, l'heure de prise en charge est automatiquement ajustée sans aucun frais supplémentaire.",
    },
  ],
  relatedServices: [
    { title: "Transport aéroport YUL", href: "/fr/transport-aeroport" },
    { title: "Calculer mon prix fixe", href: "/fr/calculer-prix" },
  ],
};

const article1En: BlogPost = {
  ...article1Fr,
  title: "How much does a taxi from Laval to YUL airport cost in 2026?",
  description:
    "Official CTQ rate, fixed price aligned with UberX, real example Laval → YUL ~$60-70 daytime. Everything that affects the price: distance, time, payment, money-saving tips.",
  body: [
    {
      type: "p",
      text: "Question we hear every week: \"How much does a taxi from Laval to Montréal-Trudeau Airport (YUL) cost in 2026?\" Short answer: $55 to $75 daytime (5am–11pm), $65 to $85 nighttime (11pm–5am), depending on your exact pickup point in Laval. Long answer: the fare depends on the official CTQ meter, UberX peak pricing, your departure time, and payment method. This article explains everything — with a real-world example.",
    },
    { type: "h2", text: "The official CTQ rate (Commission des transports du Québec)" },
    {
      type: "p",
      text: "All licensed Quebec taxis must use the CTQ rate. No surge, no invented pricing. Here are the rates in effect for 2026:",
    },
    {
      type: "table",
      headers: ["Component", "Day (5am–11pm)", "Night (11pm–5am)"],
      rows: [
        ["Pickup (base)", "$4.10", "$4.70"],
        ["Levy", "$1.05", "$1.05"],
        ["Per kilometer", "$2.05", "$2.35"],
        ["Per minute", "$0.77", "$0.89"],
      ],
    },
    {
      type: "p",
      text: "The meter charges either distance OR time — never both at once. Below 22.5 km/h (traffic), it's time. Above, it's distance. Total is automatically calculated by the certified meter.",
    },
    { type: "h2", text: "Our fixed price — aligned with UberX (peak)" },
    {
      type: "p",
      text: "At Taxi Chomedey, we offer a guaranteed fixed price for Laval → YUL trips. Formula:",
    },
    {
      type: "callout",
      variant: "info",
      title: "Fixed price = max(UberX peak, CTQ meter)",
      text: "We take the higher of UberX peak-hour price and the CTQ meter based on time of day. Customer never pays more than UberX peak, and driver income is guaranteed.",
    },
    {
      type: "p",
      text: "Cash payment gives you 3.4% discount (we remove the card terminal fee). So a $65 card price becomes $62.79 in cash.",
    },
    { type: "h2", text: "Real example: Chomedey (Laval) → YUL Airport" },
    {
      type: "p",
      text: "Typical trip: pickup Chomedey, Laval, destination Montréal-Trudeau International Airport, Dorval. Distance ~25 km, duration ~28 minutes depending on traffic.",
    },
    {
      type: "example",
      title: "Detailed calculation (daytime, 2pm, normal traffic)",
      rows: [
        { label: "Distance", value: "25 km" },
        { label: "Estimated duration", value: "28 min" },
        { label: "CTQ day meter", value: "$4.10 + $1.05 + (25 × $2.05) = $56.40" },
        { label: "UberX typical", value: "$5.75 + (25 × $1.15) + (28 × $0.28) = $43.49 (rounded $43)" },
        { label: "UberX peak (×1.45)", value: "$43 × 1.45 = $62.35 (rounded $62)" },
        { label: "Fixed price (card)", value: "max($62, $57) = $62" },
        { label: "Cash price (−3.4%)", value: "$62 / 1.034 = $59.96" },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Tip: pay cash",
      text: "For this trip, paying in cash saves $2. On a round trip (Laval → YUL → Laval), that's $4. Over 10 monthly trips, that's $40 saved.",
    },
    { type: "h2", text: "What affects the price" },
    {
      type: "ul",
      items: [
        "Exact pickup point in Laval (Chomedey vs Sainte-Rose vs Saint-François) — $5–15 difference",
        "Departure time (day 5am–11pm vs night 11pm–5am) — nighttime ~15% more expensive",
        "Traffic (peak hours 7am–9am and 4pm–7pm add time) — meter charges time instead of distance",
        "Payment method (cash = −3.4%, card = full fare)",
        "Flight delay — no surcharge, we adjust pickup time automatically",
      ],
    },
    { type: "h2", text: "When to book?" },
    {
      type: "p",
      text: "For an early morning flight (5am–7am), book the night before. We have 50+ vehicles but peak slots fill fast. For an afternoon flight, you can call 30 minutes ahead — we almost always have a driver available in Laval.",
    },
    {
      type: "cta",
      text: "Want an exact price for your Laval → YUL trip right now?",
      href: "/en/calculate-fare",
      label: "Calculate my fixed fare →",
    },
  ],
  faqs: [
    {
      q: "How much does a taxi from Laval to YUL airport cost?",
      a: "$55 to $75 daytime (5am–11pm), $65 to $85 nighttime (11pm–5am), depending on the Laval neighborhood. Fixed price = max(UberX peak, CTQ meter). Cash payment = 3.4% discount.",
    },
    {
      q: "Is there a nighttime surcharge?",
      a: "Yes, the CTQ night rate (11pm–5am) is ~15% higher than day rate. Pickup goes from $4.10 to $4.70, per km from $2.05 to $2.35, per minute from $0.77 to $0.89.",
    },
    {
      q: "Does the price change in traffic?",
      a: "Below 22.5 km/h, the CTQ meter charges time (not distance). In peak hours (7am–9am, 4pm–7pm), the Laval → YUL trip can cost $5–10 more if traffic is heavy.",
    },
    {
      q: "Is there a luggage surcharge?",
      a: "No. The CTQ rate has no luggage surcharge. Same price for 1 passenger with no luggage or 4 passengers with luggage.",
    },
    {
      q: "Does the driver track my flight in case of delay?",
      a: "Yes. We track your flight status live. If your plane is delayed, your pickup time is automatically adjusted at no extra charge.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE 2: Survoltage de batterie à Laval
// ─────────────────────────────────────────────────────────────────────────────

const article2Fr: BlogPost = {
  slug: "survoltage-batterie-laval-prix-delai-hiver",
  title: "Survoltage de batterie à Laval : prix, délai, conseils hiver",
  description:
    "Prix du boost de batterie à Laval : 35 $ à 80 $. Pourquoi choisir un Boost Pack pro vs câbles ? Hybrides et électriques. Conseils pour l'hiver québécois.",
  date: "2026-01-20",
  author: "Taxi Chomedey",
  readingTime: "7 min",
  category: "Survoltage",
  body: [
    {
      type: "p",
      text: "Batterie à plat ? Vous cherchez le prix d'un survoltage à Laval en 2026 ? Chez Taxi Chomedey, notre service de boost de batterie coûte entre 35 $ et 80 $, selon le véhicule, l'heure et le lieu. Intervention en moins de 15 minutes, 24/7, partout à Laval et la Rive-Nord. Dans cet article, on explique ce qui affecte le prix et pourquoi notre service est plus sécuritaire que des câbles traditionnels.",
    },
    { type: "h2", text: "Pourquoi un Boost Pack pro plutôt que des câbles ?" },
    {
      type: "p",
      text: "Les câbles traditionnels peuvent causer des dommages irréversibles à l'ordinateur de bord et aux composantes électroniques des véhicules modernes (surtout hybrides et électriques). Un pic de courant mal régulé peut griller un module à 1500 $.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Attention aux câbles bon marché",
      text: "Brancher des câbles à l'envers (+ sur −) peut détruire votre alternateur, votre calculateur moteur, et même déclencher un airbag. Les Boost Packs intelligents que nous utilisons préviennent ce risque avec une régulation automatique du courant.",
    },
    {
      type: "p",
      text: "Nos Boost Packs sont compatibles avec tous les types de véhicules, y compris :",
    },
    {
      type: "ul",
      items: [
        "Berlines et VUS essence (la majorité des appels)",
        "Véhicules hybrides (Toyota Prius, RAV4 hybride, Honda Insight, etc.) — protocole spécialisé",
        "Véhicules 100 % électriques (Tesla, Chevrolet Bolt, Hyundai Ioniq, etc.) — pour démarrer le système 12V auxiliaire, pas la batterie de traction",
        "Camions légers et fourgonnettes",
        "Véhicules lourds (diesel) — sur demande, surcoût possible",
      ],
    },
    { type: "h2", text: "Ce qui affecte le prix (35 $ à 80 $)" },
    {
      type: "table",
      headers: ["Facteur", "Impact sur le prix"],
      rows: [
        ["Type de véhicule", "Berline ~35–50 $, VUS ~45–60 $, hybride ~50–65 $, électrique ~60–80 $"],
        ["Heure", "Jour (5h–23h) = tarif normal, Nuit (23h–5h) = +20 % typique"],
        ["Lieu", "Laval et Rive-Nord = standard, autoroute ou zone éloignée = +10–20 $"],
        ["Difficulté d'accès", "Batterie accessible = standard, sous capot complexe = +10 $"],
        ["Vehicle lourd (diesel, RV)", "Surcoût possible, devis sur place"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Astuce : groupez vos appels",
      text: "Si vous êtes plusieurs voisins avec batterie à plat (souvent le cas après une vague de froid), appelez-nous — on peut faire plusieurs survoltages d'affilée au même tarif unitaire.",
    },
    { type: "h2", text: "Conseils pour l'hiver québécois" },
    {
      type: "p",
      text: "L'hiver à Laval (décembre à mars), les batteries souffrent. Une batterie de 4 ans a 50 % de chance de ne pas démarrer à −20 °C. Quelques conseils pour éviter le boost :",
    },
    {
      type: "ul",
      items: [
        "Branchez votre véhicule sur une prise électrique au Québec (cidebec) — chauffe-moteur + batterie",
        "Faites tourner le moteur 10 minutes par jour si le véhicule est peu utilisé",
        "Remplacez votre batterie aux 4–5 ans (avant qu'elle vous lâche)",
        "Gardez des câbles dans le coffre — mais ne les utilisez qu'en dernier recours",
        "Si vous devez faire un boost vous-même, vérifiez la polarité 2 fois avant de brancher",
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "Batterie qui ne tient plus après un boost",
      text: "Si après notre boost votre voiture ne démarre pas à nouveau après l'arrêt, la batterie est probablement morte (et non juste déchargée). Il faudra la remplacer. On peut vous dépanner jusqu'au garage le plus proche.",
    },
    { type: "h2", text: "Quand appeler vs faire vous-même" },
    {
      type: "p",
      text: "Appelez-nous si : vous n'avez pas de câbles, vous avez un véhicule hybride/électrique, vous êtes sur la route, ou vous ne savez pas comment brancher des câbles en sécurité. Faites-le vous-même si : vous avez l'habitude, vos câbles sont de bonne qualité, votre véhicule est une berline essence simple, et vous êtes chez vous.",
    },
    {
      type: "cta",
      text: "Batterie à plat maintenant ? On intervient en moins de 15 minutes.",
      href: "tel:+15142396512",
      label: "📞 514-239-6512",
    },
  ],
  faqs: [
    {
      q: "Combien coûte un survoltage de batterie à Laval ?",
      a: "Entre 35 $ et 80 $, selon le véhicule (berline, VUS, hybride, électrique), l'heure (jour vs nuit) et le lieu (Laval standard, autoroute surcoût). Intervention 24/7 en moins de 15 minutes.",
    },
    {
      q: "Le survoltage est-il sécuritaire pour un véhicule hybride ?",
      a: "Oui, on utilise des Boost Packs intelligents qui régulent le courant — sécuritaires pour l'électronique des véhicules hybrides (Prius, RAV4 hybride, etc.) et électriques (Tesla, Bolt, etc.). On suit un protocole spécialisé pour ne pas endommager le système 12V auxiliaire.",
    },
    {
      q: "Le service est-il disponible la nuit ?",
      a: "Oui, 24h/24, 7j/7. Surcoût typique de 20 % entre 23h et 5h (tarif nuit).",
    },
    {
      q: "Combien de temps ça prend ?",
      a: "Intervention garantie en moins de 15 minutes à Laval. Le boost lui-même prend 2–5 minutes. Le reste c'est le déplacement du chauffeur.",
    },
    {
      q: "Si ma batterie est morte (pas juste déchargée), que faites-vous ?",
      a: "Si après le boost votre voiture ne tient pas la charge, la batterie est probablement à remplacer. On peut vous dépanner jusqu'au garage le plus proche pour un remplacement.",
    },
  ],
  relatedServices: [
    { title: "Survoltage de batterie (Boost)", href: "/fr/survoltage-batterie" },
    { title: "Service d'urgence 24/7", href: "/fr/urgence" },
  ],
};

const article2En: BlogPost = {
  ...article2Fr,
  title: "Battery boost service in Laval: price, response time, winter tips",
  description:
    "Battery boost price in Laval: $35 to $80. Why choose pro Boost Pack vs jumper cables. Hybrids and EVs. Winter tips for Quebec cold.",
  body: [
    {
      type: "p",
      text: "Dead battery? Looking for a battery boost price in Laval for 2026? At Taxi Chomedey, our battery boost service costs $35 to $80, depending on vehicle, time, and location. Response in under 15 minutes, 24/7, throughout Laval and the North Shore. This article explains what affects the price and why our service is safer than traditional jumper cables.",
    },
    { type: "h2", text: "Why a pro Boost Pack instead of cables?" },
    {
      type: "p",
      text: "Traditional jumper cables can cause irreversible damage to onboard computers and electronic components of modern vehicles (especially hybrids and EVs). A poorly regulated current spike can fry a $1500 module.",
    },
    {
      type: "callout",
      variant: "warning",
      title: "Beware cheap cables",
      text: "Connecting cables backward (+ on −) can destroy your alternator, engine computer, even trigger an airbag. Our intelligent Boost Packs prevent this risk with automatic current regulation.",
    },
    {
      type: "p",
      text: "Our Boost Packs are compatible with all vehicle types, including:",
    },
    {
      type: "ul",
      items: [
        "Sedans and gas SUVs (majority of calls)",
        "Hybrid vehicles (Toyota Prius, RAV4 hybrid, Honda Insight, etc.) — specialized protocol",
        "100% electric vehicles (Tesla, Chevrolet Bolt, Hyundai Ioniq, etc.) — to start the 12V auxiliary system, not the traction battery",
        "Light trucks and vans",
        "Heavy vehicles (diesel) — on request, possible surcharge",
      ],
    },
    { type: "h2", text: "What affects the price ($35 to $80)" },
    {
      type: "table",
      headers: ["Factor", "Price impact"],
      rows: [
        ["Vehicle type", "Sedan ~$35–50, SUV ~$45–60, hybrid ~$50–65, EV ~$60–80"],
        ["Time", "Day (5am–11pm) = standard, Night (11pm–5am) = +20% typical"],
        ["Location", "Laval/North Shore = standard, highway or remote = +$10–20"],
        ["Access difficulty", "Accessible battery = standard, complex under-hood = +$10"],
        ["Heavy vehicle (diesel, RV)", "Possible surcharge, quote on-site"],
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Tip: group your calls",
      text: "If multiple neighbors have dead batteries (often the case after a cold snap), call us — we can do multiple boosts back-to-back at the same unit price.",
    },
    { type: "h2", text: "Tips for Quebec winter" },
    {
      type: "p",
      text: "Winter in Laval (December to March) is hard on batteries. A 4-year-old battery has a 50% chance of not starting at −20°C. A few tips to avoid needing a boost:",
    },
    {
      type: "ul",
      items: [
        "Plug your vehicle into a Quebec electrical outlet (block heater) — protects engine and battery",
        "Run the engine 10 minutes per day if the vehicle is rarely used",
        "Replace your battery every 4–5 years (before it fails)",
        "Keep cables in the trunk — but only use them as last resort",
        "If you must boost yourself, double-check polarity before connecting",
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "Battery not holding after a boost",
      text: "If after our boost your car won't start again after being shut off, the battery is probably dead (not just discharged). It will need replacement. We can drive you to the nearest garage.",
    },
    { type: "h2", text: "When to call vs DIY" },
    {
      type: "p",
      text: "Call us if: you don't have cables, you have a hybrid/EV, you're on the road, or you don't know how to safely connect cables. DIY if: you're experienced, your cables are good quality, your vehicle is a simple gas sedan, and you're at home.",
    },
    {
      type: "cta",
      text: "Dead battery right now? We respond in under 15 minutes.",
      href: "tel:+15142396512",
      label: "📞 514-239-6512",
    },
  ],
  faqs: [
    {
      q: "How much does a battery boost cost in Laval?",
      a: "$35 to $80, depending on vehicle (sedan, SUV, hybrid, EV), time (day vs night), and location (standard Laval, highway surcharge). 24/7 response in under 15 minutes.",
    },
    {
      q: "Is boost safe for hybrid vehicles?",
      a: "Yes, we use intelligent Boost Packs that regulate current — safe for hybrid (Prius, RAV4 hybrid, etc.) and EV (Tesla, Bolt, etc.) electronics. We follow a specialized protocol to avoid damaging the 12V auxiliary system.",
    },
    {
      q: "Is the service available at night?",
      a: "Yes, 24/7. Typical 20% surcharge between 11pm and 5am (night rate).",
    },
    {
      q: "How long does it take?",
      a: "Guaranteed response in under 15 minutes in Laval. The boost itself takes 2–5 minutes. The rest is driver travel time.",
    },
    {
      q: "If my battery is dead (not just discharged), what do you do?",
      a: "If after the boost your car doesn't hold the charge, the battery likely needs replacement. We can drive you to the nearest garage for replacement.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// ARTICLE 3: Taxi raccompagnement après soirée
// ─────────────────────────────────────────────────────────────────────────────

const article3Fr: BlogPost = {
  slug: "taxi-raccompagnement-apres-soiree-ce-quil-faut-savoir",
  title: "Taxi raccompagnement après soirée : ce qu'il faut savoir",
  description:
    "Service de raccompagnement (chauffeur désigné) à Laval. Prix = 2 × tarif CTQ jour. Comment ça marche (chauffeur + voiture de poursuite). Exemples concrets. Quand choisir cette option vs taxi classique.",
  date: "2026-01-25",
  author: "Taxi Chomedey",
  readingTime: "6 min",
  category: "Raccompagnement",
  body: [
    {
      type: "p",
      text: "Vous rentrez d'une soirée, vous avez bu, et vous voulez rentrer chez vous avec votre propre voiture ? C'est exactement le cas d'usage du service de raccompagnement. Un de nos chauffeurs vous ramène chez vous avec votre véhicule, et une voiture de poursuite suit pour récupérer le chauffeur. Voici comment ça marche et combien ça coûte.",
    },
    { type: "h2", text: "Comment fonctionne le raccompagnement" },
    {
      type: "p",
      text: "Le déroulement typique :",
    },
    {
      type: "ul",
      items: [
        "Vous appelez le 514-239-6512 — on prend votre adresse de départ et votre adresse d'arrivée",
        "Un chauffeur arrive à votre position en voiture de poursuite (15–20 min en moyenne à Laval)",
        "Le chauffeur prend le volant de votre véhicule, vous êtes passager",
        "La voiture de poursuite suit jusqu'à votre destination",
        "Arrivé chez vous, le chauffeur vous laisse avec votre voiture garée, et repart avec la voiture de poursuite",
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "Vous êtes passager, pas conducteur",
      text: "Le chauffeur conduit votre voiture. Vous êtes assis passager, ce qui vous permet de dormir, de continuer à boire, ou de gérer vos messages en toute sécurité. À l'arrivée, vous avez votre voiture chez vous — pas besoin d'aller la récupérer le lendemain.",
    },
    { type: "h2", text: "Le prix : 2 × tarif CTQ jour" },
    {
      type: "p",
      text: "Notre tarif raccompagnement est simple et transparent :",
    },
    {
      type: "callout",
      variant: "info",
      title: "Prix fixe = 2 × ceil(compteur CTQ jour)",
      text: "On calcule le compteur CTQ au tarif jour (5h–23h, peu importe l'heure réelle — c'est toujours le tarif jour pour le raccompagnement), on arrondit au dollar supérieur, et on multiplie par 2. Le ×2 couvre l'aller (avec vous) + le retour (chauffeur seul dans la voiture de poursuite).",
    },
    {
      type: "p",
      text: "Paiement comptant = 3,4 % de remise (frais de terminal carte enlevés), comme pour le taxi classique.",
    },
    { type: "h2", text: "Exemple : Centre-ville Montréal → Sainte-Rose (Laval)" },
    {
      type: "example",
      title: "Calcul détaillé",
      rows: [
        { label: "Distance", value: "32 km" },
        { label: "Durée estimée", value: "30 min" },
        { label: "Compteur CTQ jour", value: "4,10 $ + 1,05 $ + (32 × 2,05 $) = 70,75 $" },
        { label: "Arrondi au dollar", value: "71 $" },
        { label: "× 2 (aller + retour)", value: "142 $" },
        { label: "Prix fixe (carte)", value: "142 $" },
        { label: "Prix comptant (−3,4 %)", value: "142 $ / 1,034 = 137,33 $" },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Astuce : partagez le coût",
      text: "Si vous êtes 2 ou 3 à rentrer du même secteur (par exemple, 3 voisins qui rentrent d'un party à Sainte-Rose), le raccompagnement devient très abordable. 142 $ divisé par 3 = 47 $ par personne, et chacun récupère sa voiture le lendemain.",
    },
    { type: "h2", text: "Raccompagnement vs taxi classique : quand choisir ?" },
    {
      type: "table",
      headers: ["Critère", "Raccompagnement (votre voiture)", "Taxi classique"],
      rows: [
        ["Vous récupérez votre voiture le lendemain ?", "Oui ✅", "Non ❌"],
        ["Idéal si vous avez bu", "Oui ✅", "Oui ✅"],
        ["Prix typique Laval→Laval", "80–140 $", "40–70 $"],
        ["Prix typique Montréal→Laval", "120–180 $", "60–90 $"],
        ["Pas besoin d'aller chercher la voiture", "Oui ✅", "—"],
        ["Adapté pour un SUV/camion (votre voiture)", "Oui ✅", "—"],
      ],
    },
    { type: "h2", text: "Quand réserver ?" },
    {
      type: "p",
      text: "Pour une soirée de fin de semaine (vendredi/samedi soir, surtout entre 23h et 3h), appelez 30 minutes avant l'heure de départ souhaitée. On a 50+ véhicules mais les créneaux de pointe partent vite. Pour les soirs de fêtes (Nouvel An, Super Bowl, Halloween), réservez 2–3 jours à l'avance.",
    },
    {
      type: "cta",
      text: "Besoin d'un raccompagnement maintenant ou ce soir ?",
      href: "/fr/calculer-prix",
      label: "Calculer mon tarif raccompagnement →",
    },
  ],
  faqs: [
    {
      q: "Combien coûte un raccompagnement après soirée à Laval ?",
      a: "Le prix = 2 × ceil(compteur CTQ jour). Pour un trajet Laval→Laval (15–25 km), comptez 80–140 $. Pour Montréal→Laval (25–35 km), 120–180 $. Paiement comptant = 3,4 % de remise.",
    },
    {
      q: "Pourquoi le prix est-il 2 × le tarif normal ?",
      a: "Parce que le chauffeur doit faire l'aller (avec vous dans votre voiture) ET le retour (seul dans la voiture de poursuite). Le ×2 couvre ces deux trajets. Une voiture de poursuite suit toujours pour récupérer le chauffeur.",
    },
    {
      q: "Le chauffeur conduit-il ma voiture ou un taxi ?",
      a: "Notre chauffeur conduit VOTRE voiture. Vous êtes passager. Vous récupérez votre voiture chez vous, pas besoin d'aller la chercher le lendemain.",
    },
    {
      q: "Le service est-il disponible la nuit ?",
      a: "Oui, 24h/24, 7j/7. C'est même notre pic d'activité pour ce service (vendredi et samedi soir, 23h–3h). Pour les soirs de fêtes (Nouvel An, etc.), réservez 2–3 jours à l'avance.",
    },
    {
      q: "Le raccompagnement est-il moins cher qu'un taxi ?",
      a: "Non, c'est plus cher (environ 2 × le prix d'un taxi classique) parce qu'il y a 2 trajets (aller + retour chauffeur). Mais l'avantage est que vous récupérez votre voiture chez vous — pas besoin d'aller la chercher le lendemain.",
    },
  ],
  relatedServices: [
    { title: "Service de raccompagnement", href: "/fr/raccompagnement" },
    { title: "Calculer mon tarif", href: "/fr/calculer-prix" },
  ],
};

const article3En: BlogPost = {
  ...article3Fr,
  title: "Drive-home service after a night out: what you need to know",
  description:
    "Drive-home (designated driver) service in Laval. Price = 2 × CTQ day rate. How it works (driver + chase car). Real examples. When to choose this vs regular taxi.",
  body: [
    {
      type: "p",
      text: "Coming home from a night out, you've been drinking, and you want to get home with your own car? That's exactly the use case for our drive-home service. One of our drivers takes you home in your vehicle, and a chase car follows to pick up the driver. Here's how it works and how much it costs.",
    },
    { type: "h2", text: "How drive-home works" },
    {
      type: "p",
      text: "Typical flow:",
    },
    {
      type: "ul",
      items: [
        "You call 514-239-6512 — we take your pickup address and destination",
        "A driver arrives at your location in the chase car (15–20 min average in Laval)",
        "The driver takes the wheel of your vehicle, you're the passenger",
        "The chase car follows to your destination",
        "At your home, the driver leaves you with your parked car, and leaves with the chase car",
      ],
    },
    {
      type: "callout",
      variant: "info",
      title: "You're the passenger, not the driver",
      text: "The driver drives your car. You're a passenger, so you can sleep, keep drinking, or handle messages safely. At arrival, you have your car at home — no need to pick it up the next day.",
    },
    { type: "h2", text: "Price: 2 × CTQ day rate" },
    {
      type: "p",
      text: "Our drive-home rate is simple and transparent:",
    },
    {
      type: "callout",
      variant: "info",
      title: "Fixed price = 2 × ceil(CTQ day meter)",
      text: "We calculate the CTQ meter at day rate (5am–11pm, regardless of actual time — always day rate for drive-home), round up to the dollar, and multiply by 2. The ×2 covers the outbound (with you) + the return (driver alone in chase car).",
    },
    {
      type: "p",
      text: "Cash payment = 3.4% discount (card terminal fee removed), same as regular taxi.",
    },
    { type: "h2", text: "Example: Downtown Montréal → Sainte-Rose (Laval)" },
    {
      type: "example",
      title: "Detailed calculation",
      rows: [
        { label: "Distance", value: "32 km" },
        { label: "Estimated duration", value: "30 min" },
        { label: "CTQ day meter", value: "$4.10 + $1.05 + (32 × $2.05) = $70.75" },
        { label: "Rounded up", value: "$71" },
        { label: "× 2 (outbound + return)", value: "$142" },
        { label: "Fixed price (card)", value: "$142" },
        { label: "Cash price (−3.4%)", value: "$142 / 1.034 = $137.33" },
      ],
    },
    {
      type: "callout",
      variant: "tip",
      title: "Tip: share the cost",
      text: "If 2 or 3 of you are heading home from the same area (e.g., 3 neighbors returning from a party in Sainte-Rose), drive-home becomes very affordable. $142 divided by 3 = $47 per person, and each recovers their car the next day.",
    },
    { type: "h2", text: "Drive-home vs regular taxi: when to choose?" },
    {
      type: "table",
      headers: ["Criterion", "Drive-home (your car)", "Regular taxi"],
      rows: [
        ["You get your car back next day?", "Yes ✅", "No ❌"],
        ["Ideal if you've been drinking", "Yes ✅", "Yes ✅"],
        ["Typical price Laval→Laval", "$80–140", "$40–70"],
        ["Typical price Montréal→Laval", "$120–180", "$60–90"],
        ["No need to fetch your car", "Yes ✅", "—"],
        ["Suited for SUV/truck (your car)", "Yes ✅", "—"],
      ],
    },
    { type: "h2", text: "When to book?" },
    {
      type: "p",
      text: "For weekend evenings (Friday/Saturday night, especially between 11pm and 3am), call 30 minutes before your desired departure time. We have 50+ vehicles but peak slots fill fast. For party nights (New Year's, Super Bowl, Halloween), book 2–3 days in advance.",
    },
    {
      type: "cta",
      text: "Need a drive-home now or tonight?",
      href: "/en/calculate-fare",
      label: "Calculate my drive-home fare →",
    },
  ],
  faqs: [
    {
      q: "How much does drive-home cost after a night out in Laval?",
      a: "Price = 2 × ceil(CTQ day meter). For Laval→Laval (15–25 km), expect $80–140. For Montréal→Laval (25–35 km), $120–180. Cash payment = 3.4% discount.",
    },
    {
      q: "Why is the price 2× the normal rate?",
      a: "Because the driver has to do the outbound (with you in your car) AND the return (alone in the chase car). The ×2 covers these two trips. A chase car always follows to pick up the driver.",
    },
    {
      q: "Does the driver drive my car or a taxi?",
      a: "Our driver drives YOUR car. You're the passenger. You recover your car at home — no need to pick it up the next day.",
    },
    {
      q: "Is the service available at night?",
      a: "Yes, 24/7. It's actually our peak time for this service (Friday and Saturday nights, 11pm–3am). For party nights (New Year's, etc.), book 2–3 days in advance.",
    },
    {
      q: "Is drive-home cheaper than a taxi?",
      a: "No, it's more expensive (about 2× a regular taxi) because there are 2 trips (outbound + driver return). But the advantage is you recover your car at home — no need to fetch it the next day.",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// EXPORTS
// ─────────────────────────────────────────────────────────────────────────────

export const blogPostsFr: BlogPost[] = [article1Fr, article2Fr, article3Fr];
export const blogPostsEn: BlogPost[] = [article1En, article2En, article3En];

export function getBlogPostFr(slug: string): BlogPost | undefined {
  return blogPostsFr.find((p) => p.slug === slug);
}

export function getBlogPostEn(slug: string): BlogPost | undefined {
  return blogPostsEn.find((p) => p.slug === slug);
}

export const allBlogSlugs: string[] = blogPostsFr.map((p) => p.slug);
