"use client";

import { useState, useRef, useEffect } from "react";
import { FareTable, type FareData } from "@/components/FareTable";

type Message =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string; fare?: FareData; loading?: boolean };

const FARE_REQUEST_RE = /===FARE_REQUEST===([\s\S]*?)===END_FARE_REQUEST===/;

const DEFAULT_INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Bonjour ! Je suis l'agent virtuel de Taxi Chomedey. Je peux vous donner un prix fixe et garanti pour votre trajet. D'où partez-vous ?",
};

/**
 * Self-contained chat agent — plain Tailwind, no UI library dependency.
 * Used on:
 *   - /fr/calculatrice-taxi (standalone page)
 *   - /en/taxi-calculator (standalone page)
 *   - ServicePage template when showAgent={true}
 */
export function ChatAgent({
  compact = false,
  welcomeMessage,
  serviceContext,
}: {
  compact?: boolean;
  welcomeMessage?: string;
  serviceContext?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: welcomeMessage || DEFAULT_INITIAL_MESSAGE.content,
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isThinking]);

  async function sendMessage(text: string) {
    if (!text.trim() || isThinking) return;

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: text },
    ];
    setMessages(nextMessages);
    setInput("");
    setIsThinking(true);

    const placeholderIndex = nextMessages.length;
    setMessages((m) => [
      ...m,
      { role: "assistant", content: "", loading: true },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
          serviceContext,
        }),
      });

      if (!res.ok) {
        throw new Error(`Chat API ${res.status}`);
      }

      const data = (await res.json()) as { response?: string; error?: string };
      let assistantText = data.response || data.error || "Désolé, une erreur est survenue.";

      let fareData: FareData | undefined;
      const fareMatch = assistantText.match(FARE_REQUEST_RE);
      // SERVICE GUARD: survoltage and deverrouillage services don't use the
      // fare calculator (no trip distance to compute). Their system prompts
      // forbid emitting a FARE_REQUEST block. But if the LLM hallucinates
      // one anyway, ignore it — don't call /api/fare for these services.
      if (fareMatch && serviceContext !== "survoltage" && serviceContext !== "deverrouillage") {
        try {
          const payload = JSON.parse(fareMatch[1].trim()) as {
            origin: string;
            destination: string;
            datetime?: string;
            service?: string;
          };
          // DETERMINISTIC SERVICE ROUTING — do NOT trust the LLM to emit the
          // "service" field reliably. Llama 3.1 8B often drops it because the
          // system prompt's example JSON template omits the field. If the
          // user is on the raccompagnement page, force service=raccompagnement
          // here so /api/fare calls calculateRaccompagnementFare (2× ceil
          // CTQ day or night meter based on current time) instead of
          // calculateFare (regular taxi = max(UberX peak, ceil CTQ meter)).
          //
          // Day/night detection: DON'T clear payload.datetime — let the
          // actual datetime (from user input or "now" default) flow through
          // so calculateRaccompagnementFare can detect day vs night.
          if (serviceContext === "raccompagnement") {
            payload.service = "raccompagnement";

            // NIGHT-TIME FALLBACK: the LLM often acknowledges "vers minuit" or
            // "la nuit" in its text response but still emits empty datetime
            // (because it doesn't know how to convert "vers minuit" to ISO
            // 8601). Empty datetime → /api/fare defaults to current time →
            // if it's daytime now, the fare gets incorrectly calculated as
            // day rate even though the user explicitly mentioned night.
            //
            // Fix: scan the user's last message for night keywords. If found
            // AND datetime is empty, force datetime to today at 23:30 so
            // /api/fare's isNightTime() returns true → night rate applied.
            if (!payload.datetime) {
              const lastUserMsg = nextMessages
                .filter((m) => m.role === "user")
                .pop();
              const userText = lastUserMsg?.content?.toLowerCase() ?? "";
              const nightKeywords = [
                "minuit",
                "nuit",
                "nocturne",
                "23h",
                "00h",
                "0h",
                "1h du matin",
                "2h du matin",
                "3h du matin",
                "4h du matin",
                "11pm",
                "12am",
                "midnight",
                "night",
                "late",
                "ce soir tard",
                "tard",
              ];
              const mentionsNight = nightKeywords.some((kw) =>
                userText.includes(kw)
              );
              if (mentionsNight) {
                // Build ISO 8601 for today at 23:30 local time
                const now = new Date();
                const tonight = new Date(now);
                tonight.setHours(23, 30, 0, 0);
                // If it's already past midnight, use tomorrow's 00:30
                if (now.getHours() >= 0 && now.getHours() < 5) {
                  tonight.setDate(tonight.getDate() + 1);
                  tonight.setHours(0, 30, 0, 0);
                }
                payload.datetime = tonight.toISOString();
              }
            }
          }
          const fareRes = await fetch("/api/fare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (fareRes.ok) {
            fareData = (await fareRes.json()) as FareData;
          } else {
            const errBody = await fareRes.json().catch(() => ({}));
            console.error(
              "Fare API error:",
              (errBody as { error?: string }).error || "erreur inconnue"
            );
          }
        } catch (err) {
          console.error("Failed to parse FARE_REQUEST block:", err);
        }

        // Strip the machine block from the visible message
        assistantText = assistantText.replace(FARE_REQUEST_RE, "").trim();
        if (!assistantText) {
          assistantText = "Voici votre tarif fixe calculé :";
        }
      }

      setMessages((m) => {
        const copy = [...m];
        copy[placeholderIndex] = {
          role: "assistant",
          content: assistantText,
          ...(fareData ? { fare: fareData } : {}),
        };
        return copy;
      });
    } catch (err) {
      console.error("sendMessage error:", err);
      setMessages((m) => {
        const copy = [...m];
        copy[placeholderIndex] = {
          role: "assistant",
          content:
            "Désolé, le service est temporairement indisponible. Appelez-nous au 514-239-6512.",
        };
        return copy;
      });
    } finally {
      setIsThinking(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  function handleReset() {
    setMessages([
      {
        role: "assistant",
        content: welcomeMessage || DEFAULT_INITIAL_MESSAGE.content,
      },
    ]);
    setInput("");
    setIsThinking(false);
  }

  return (
    <div
      className={`flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm ${
        compact ? "h-[480px]" : "h-[min(70vh,640px)]"
      }`}
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-[#1e3a5f]">Agent Taxi Chomedey</div>
          <div className="text-xs text-slate-500">Prix fixe · 24/7 · 514-239-6512</div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {messages.map((message, i) => (
          <MessageBubble key={i} message={message} />
        ))}
      </div>

      <div className="border-t border-slate-100 p-3">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message…"
            disabled={isThinking}
            className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#e6b422] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isThinking || !input.trim()}
            className="rounded-lg bg-[#e6b422] px-4 py-2 text-sm font-semibold text-[#1e3a5f] transition hover:bg-[#d4a017] disabled:opacity-50"
          >
            Envoyer
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={isThinking}
            title="Recommencer"
            className="rounded-lg border border-[#1e3a5f]/30 px-3 py-2 text-sm font-medium text-[#1e3a5f] transition hover:bg-[#1e3a5f]/5 disabled:opacity-50"
          >
            ↺
          </button>
        </form>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  if (message.role === "assistant" && message.loading) {
    return (
      <div className="flex justify-start">
        <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm text-slate-400">
          …
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[85%] space-y-3">
        <div
          className={`px-4 py-2.5 rounded-2xl text-sm whitespace-pre-wrap break-words ${
            isUser
              ? "bg-[#1e3a5f] text-white rounded-br-sm"
              : "bg-slate-50 border border-slate-200 text-slate-900 rounded-bl-sm"
          }`}
        >
          {message.content}
        </div>
        {message.role === "assistant" && message.fare ? (
          <FareTable data={message.fare} />
        ) : null}
      </div>
    </div>
  );
}
