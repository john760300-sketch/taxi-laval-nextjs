/**
 * Reusable schema.org JSON-LD component.
 * Renders one or more JSON-LD <script> tags for structured data.
 *
 * Usage:
 *   <SchemaOrg schemas={[localBusinessSchema, serviceSchema]} />
 *
 * Each schema object should be a valid schema.org entity (LocalBusiness,
 * Service, FAQPage, WebSite, BreadcrumbList, WebApplication, etc.)
 */

type Schema = Record<string, unknown>;

export function SchemaOrg({ schemas }: { schemas: Schema[] }) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
