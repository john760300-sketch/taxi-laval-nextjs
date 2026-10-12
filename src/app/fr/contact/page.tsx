import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TAXI CHOMEDEY | Contact – Taxi Laval, Rive-Nord & Laurentides 24/7",
  description:
    "Contactez TAXI CHOMEDEY 24h/24 7j/7. Téléphone : 514-239-6512 | Courriel : contact@besttaxilaval.ca. Service de taxi et assistance routière à Laval, Rive-Nord & Laurentides.",
  alternates: {
    canonical: "https://besttaxilaval.ca/fr/contact",
    languages: {
      fr: "https://besttaxilaval.ca/fr/contact",
      en: "https://besttaxilaval.ca/en/contact",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-[#1e3a5f] py-16 text-center text-white">
          <div className="mx-auto max-w-7xl px-5">
            <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
              Contactez TAXI CHOMEDEY
            </h1>
            <p className="mb-6 text-lg text-white/90">
              Service 24h/24 7j/7 – Nous sommes là pour vous
            </p>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-5">
            <div className="grid gap-10 md:grid-cols-2">
              <div className="rounded-xl bg-[#f9f9f8] p-8">
                <h2 className="mb-6 text-2xl font-bold text-[#e6b422]">
                  Coordonnées
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-1 font-semibold text-[#1e3a5f]">
                      Téléphone
                    </h3>
                    <a
                      href="tel:+15142396512"
                      className="text-lg text-[#4a627a] hover:text-[#e6b422]"
                    >
                      📞 514-239-6512
                    </a>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#1e3a5f]">
                      Courriel
                    </h3>
                    <a
                      href="mailto:contact@besttaxilaval.ca"
                      className="text-lg text-[#4a627a] hover:text-[#e6b422]"
                    >
                      ✉️ contact@besttaxilaval.ca
                    </a>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#1e3a5f]">
                      Disponibilité
                    </h3>
                    <p className="text-[#4a627a]">24 heures sur 24, 7 jours sur 7</p>
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-[#1e3a5f]">
                      Zone de service
                    </h3>
                    <p className="text-[#4a627a]">
                      Laval, Rive-Nord & Laurentides
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-8 text-center shadow-sm">
                <h2 className="mb-4 text-2xl font-bold text-[#1e3a5f]">
                  Appelez maintenant
                </h2>
                <p className="mb-6 text-[#4a627a]">
                  Notre équipe est disponible jour et nuit pour répondre à vos
                  demandes de transport, de survoltage, de déverrouillage ou de
                  livraison.
                </p>
                <a
                  href="tel:+15142396512"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
                >
                  📞 514-239-6512
                </a>
                <div className="mt-10 space-y-2 border-t border-gray-100 pt-6 text-left text-sm text-[#4a627a]">
                  <p>✓ Réponse rapide</p>
                  <p>✓ Estimé gratuit</p>
                  <p>✓ Service 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
