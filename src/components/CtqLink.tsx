/**
 * Reusable CTQ link — makes every "CTQ" mention clickable to the official
 * CTQ government page with taxi rates.
 *
 * Usage: <CtqLink /> renders "CTQ" as a clickable link.
 * Or wrap text: <CtqLink>Tarif CTQ officiel</CtqLink>
 */

const CTQ_URL =
  "https://www.ctq.gouv.qc.ca/permis-et-autorisations-de-transport/transport-remunere-de-personnes-par-automobile/tarifs-de-transport-remunere-de-personnes-par-automobile/";

export function CtqLink({ children }: { children?: React.ReactNode }) {
  return (
    <a
      href={CTQ_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#1e3a5f] underline decoration-[#e6b422]/40 underline-offset-2 transition hover:decoration-[#e6b422]"
    >
      {children || "CTQ"}
    </a>
  );
}

/**
 * Renders text with all "CTQ" or "ctq" occurrences as clickable links.
 * Use this for paragraphs that mention CTQ multiple times.
 */
export function CtqText({ text }: { text: string }) {
  const parts = text.split(/(CTQ|ctq)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part === "CTQ" || part === "ctq") {
          return <CtqLink key={i}>{part}</CtqLink>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
