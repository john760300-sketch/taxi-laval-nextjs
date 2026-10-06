import HeaderEn from "@/components/HeaderEn";
import FooterEn from "@/components/FooterEn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TAXI CHOMEDEY | Contact – Taxi Laval, North Shore & Laurentians 24/7",
  description:
    "Contact TAXI CHOMEDEY 24/7. Phone: 514-239-6512 | Email: contact@besttaxilaval.ca. Taxi and roadside assistance in Laval, North Shore & Laurentians.",
  alternates: {
    canonical: "https://besttaxilaval.ca/en/contact",
    languages: {
      fr: "https://besttaxilaval.ca/fr/contact",
      en: "https://besttaxilaval.ca/en/contact",
    },
  },
};

export default function ContactEnPage() {
  return (
    <>
      <HeaderEn />
      <main>
        <section className="bg-[#1e3a5f] py-16 text-center text-white">
          <div className="mx-auto max-w-7xl px-5">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Contact TAXI CHOMEDEY
            </h1>
            <p className="mb-6 text-lg text-white/90">
              24/7 service – We are here for you
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="rounded-xl bg-[#f9f9f8] p-8">
                <h2 className="mb-6 text-2xl font-bold text-[#e6b422]">
                  Contact details
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-1 font-semibold text-[#1e3a5f]">Phone</h3>
                    <a
                      href="tel:+15142396512"
                      className="text-lg text-[#4a627a] hover:text-[#e6b422]"
                    >
                      📞 514-239-6512
                    </a>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#1e3a5f]">Email</h3>
                    <a
                      href="mailto:contact@besttaxilaval.ca"
                      className="text-lg text-[#4a627a] hover:text-[#e6b422]"
                    >
                      ✉️ contact@besttaxilaval.ca
                    </a>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#1e3a5f]">
                      Availability
                    </h3>
                    <p className="text-[#4a627a]">24 hours a day, 7 days a week</p>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#1e3a5f]">
                      Service area
                    </h3>
                    <p className="text-[#4a627a]">
                      Laval, North Shore & Laurentians
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
                  Call now
                </h2>
                <p className="mb-6 text-[#4a627a]">
                  Our team is available day and night for your transport,
                  battery boost, door unlocking or delivery requests.
                </p>
                <a
                  href="tel:+15142396512"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
                >
                  📞 514-239-6512
                </a>
                <div className="mt-10 space-y-2 border-t border-gray-100 pt-6 text-left text-sm text-[#4a627a]">
                  <p>✓ Fast response</p>
                  <p>✓ Free estimate</p>
                  <p>✓ 24/7 service</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <FooterEn />
    </>
  );
}
