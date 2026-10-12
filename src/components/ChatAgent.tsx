"use client";

import { useState, useRef, useEffect } from "react";
import { FareTable, type FareData } from "@/components/FareTable";

type Message =
  | { role: "user"; content: string }
  | { role: "assistant"; content: string; fare?: FareData; loading?: boolean };

const FARE_REQUEST_RE = /===FARE_REQUEST===([\s\S]*?)===END_FARE_REQUEST===/;

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content:
    "Bonjour ! Je suis l'agent virtuel de Taxi Chomedey. Je peux vous donner un prix fixe et garanti pour votre trajet. D'où partez-vous ?",
};

/**
 * Self-contained chat agent — plain Tailwind, no UI library dependency.
 * Used on:
 *   - /fr/calculer-prix (standalone page)
 *   - /en/calculate-fare (standalone page)
 *   - ServicePage template when showAgent={true}
 */
export function ChatAgent({ compact = false }: { compact?: boolean }) {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
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
      const chatRes = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .filter((m) => m.role === "user" || m.role === "assistant")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!chatRes.ok) throw new Error("Chat API failed");
      const chatData = await chatRes.json();
      const rawResponse: string = chatData.response || "";

      const match = rawResponse.match(FARE_REQUEST_RE);
      let visibleText = rawResponse;
      let fareData: FareData | undefined;

      if (match) {
        visibleText = rawResponse.replace(FARE_REQUEST_RE, "").trim();
        try {
          const parsed = JSON.parse(match[1].trim());
          const fareRes = await fetch("/api/fare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              origin: parsed.origin,
              destination: parsed.destination,
              datetime: parsed.datetime || null,
              service: parsed.service || "taxi",
            }),
          });
          if (fareRes.ok) {
            fareData = (await fareRes.json()) as FareData;
          } else {
            const errBody = await fareRes.json().catch(() => ({}));
            visibleText = `Désolé, je n'ai pas pu calculer l'itinéraire : ${
              errBody.error || "erreur inconnue"
            }. Pouvez-vous reformuler les adresses ?`;
          }
        } catch (err) {
          console.error("Failed to parse FARE_REQUEST block:", err);
        }
      }

      setMessages((m) => {
        const copy = [...m];
        copy[placeholderIndex] = {
          role: "assistant",
          content: visibleText,
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
            "Désolé, une erreur est survenue. Réessayez dans un instant.",
        };
        return copy;
      });
    } finally {
      setIsThinking(false);
    }
  }

  function handleReset() {
    setMessages([INITIAL_MESSAGE]);
    setInput("");
    setIsThinking(false);
  }

  return (
    <div className="flex flex-col bg-white">
      {/* Messages scroll area */}
      <div
        ref={scrollRef}
        className={`overflow-y-auto px-3 py-4 space-y-3 ${
          compact ? "h-[420px]" : "flex-1 min-h-[420px]"
        }`}
      >
        {messages.map((m, i) => (
          <MessageBubble key={i} message={m} />
        ))}
        {isThinking && (
          <div className="flex justify-start">
            <div className="bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl rounded-bl-sm text-sm text-slate-400">
              <span className="inline-flex gap-1">
                <span className="animate-bounce [animation-delay:-0.3s]">·</span>
                <span className="animate-bounce [animation-delay:-0.15s]">·</span>
                <span className="animate-bounce">·</span>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input bar */}
      <div className="border-t border-slate-200 bg-white px-3 py-2.5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Écrivez votre message…"
            disabled={isThinking}
            autoComplete="off"
            className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/20"
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className="rounded-lg bg-[#1e3a5f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#152a47] disabled:cursor-not-allowed disabled:bg-slate-400"
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

  if (message.loading) {
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
        {message.fare && <FareTable data={message.fare} />}
      </div>
    </div>
  );
}
