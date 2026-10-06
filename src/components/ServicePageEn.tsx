import HeaderEn from "@/components/HeaderEn";
import FooterEn from "@/components/FooterEn";
import Link from "next/link";

type ServicePageEnProps = {
  title: string;
  subtitle?: string;
  description: string;
  features: string[];
  routes?: string[];
  partnerships?: string;
  priceLabel?: string;
  priceNote?: string;
  faqs?: string[];
};

export default function ServicePageEn({
  title,
  subtitle = "24/7 service – Call or email us for a free estimate",
  description,
  features,
  routes = [],
  partnerships,
  priceLabel = "Fixed rate – Call for an estimate",
  priceNote = "Call us for a free estimate",
  faqs = [],
}: ServicePageEnProps) {
  return (
    <>
      <HeaderEn />
      <main>
        <section className="bg-[#1e3a5f] py-16 text-center text-white">
          <div className="mx-auto max-w-7xl px-5">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mb-6 text-lg text-white/90">{subtitle}</p>
            <div className="mb-8 flex flex-wrap justify-center gap-4">
              <a
                href="tel:+15142396512"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
              >
                📞 514-239-6512
              </a>
              <a
                href="mailto:contact@besttaxilaval.ca"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white bg-white px-8 py-4 text-lg font-semibold text-[#1e3a5f] transition hover:bg-transparent hover:text-white"
              >
                ✉️ contact@besttaxilaval.ca
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm">
                ✓ Founded in 2020
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm">
                🚖 50+ vehicles
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm">
                🤝 SAAQ partner
              </span>
              <span className="rounded-full bg-white/15 px-4 py-1.5 text-sm">
                ⭐ 4.9/5 (850+ reviews)
              </span>
            </div>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="rounded-xl bg-[#f9f9f8] p-8">
                <h2 className="mb-5 text-2xl font-bold text-[#e6b422]">
                  {title.split("–")[0].trim()}
                </h2>
                <p className="mb-6 leading-relaxed text-[#4a627a]">
                  {description}
                </p>

                <h3 className="mb-3 text-lg font-semibold text-[#1e3a5f]">
                  Service features
                </h3>
                <ul className="mb-6 list-disc space-y-2 pl-5 text-[#4a627a]">
                  {features.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>

                {routes.length > 0 && (
                  <>
                    <h3 className="mb-3 text-lg font-semibold text-[#1e3a5f]">
                      Areas served
                    </h3>
                    <ul className="mb-6 list-disc space-y-2 pl-5 text-[#4a627a]">
                      {routes.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </>
                )}

                {partnerships && (
                  <>
                    <h3 className="mb-3 text-lg font-semibold text-[#1e3a5f]">
                      Partnerships
                    </h3>
                    <p className="mb-6 text-[#4a627a]">{partnerships}</p>
                  </>
                )}

                {faqs.length > 0 && (
                  <>
                    <h3 className="mb-3 text-lg font-semibold text-[#1e3a5f]">
                      Frequently asked
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {faqs.map((faq) => (
                        <span
                          key={faq}
                          className="rounded-full bg-white px-3 py-1.5 text-xs text-[#4a627a] shadow-sm"
                        >
                          🔍 {faq}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <div className="mb-4 text-2xl font-extrabold text-[#e6b422]">
                  {priceLabel}
                </div>
                <p className="mb-6 text-[#4a627a]">{priceNote}</p>
                <a
                  href="tel:+15142396512"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
                >
                  📞 514-239-6512
                </a>
                <div className="mt-10 space-y-2 border-t border-gray-100 pt-6 text-left text-sm text-[#4a627a]">
                  <p>✓ Over 10 years of experience</p>
                  <p>✓ Fleet of 50+ vehicles</p>
                  <p>✓ 4.9/5 from 850+ reviews</p>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/en"
                className="inline-block rounded-full bg-[#e6b422] px-6 py-3 font-medium text-white transition hover:bg-[#d4a017]"
              >
                ← Back to home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <FooterEn />
    </>
  );
}
