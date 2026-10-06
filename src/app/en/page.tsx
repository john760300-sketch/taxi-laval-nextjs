import HeaderEn from "@/components/HeaderEn";
import FooterEn from "@/components/FooterEn";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "TAXI CHOMEDEY | 🚖 #1 Taxi Service in Laval, North Shore & Laurentians 24/7",
  description:
    "TAXI CHOMEDEY in Laval, North Shore & Laurentians – Available 24/7. Local transport, YUL airport, battery boost, door unlocking and drive-home service. Book now! ☎️ 514-239-6512",
  alternates: {
    canonical: "https://besttaxilaval.ca/en",
    languages: {
      fr: "https://besttaxilaval.ca/fr",
      en: "https://besttaxilaval.ca/en",
    },
  },
};

const services = [
  {
    title: "Battery Boost in Laval, North Shore & Laurentians",
    description:
      "Safe, modern method to jump-start a dead battery with no risk to your vehicle’s electronic modules.",
    href: "/en/battery-boost",
  },
  {
    title: "Professional Door Unlocking in Laval, North Shore & Laurentians",
    description:
      "Fast, clean door opening guaranteed without damage to glass, linkages or paint.",
    href: "/en/door-unlocking",
  },
  {
    title: "Express Delivery in Laval, North Shore & Laurentians",
    description:
      "Fast pickup and delivery of packages or grocery orders (Walmart, Maxi, Super C) throughout Laval.",
    href: "/en/express-delivery",
  },
  {
    title: "Safe Local Transport in Laval, North Shore & Laurentians",
    description:
      "Smooth trips to hospitals (Cité-de-la-Santé), shopping centres and local institutions.",
    href: "/en/local-transport",
  },
  {
    title: "🚗 Drive-Home Service in Laval, North Shore & Laurentians",
    description:
      "Get home safely after your evening. Our driver takes you back in your own vehicle or in one of our taxis.",
    href: "/en/drive-home-service",
  },
];

const features = [
  {
    title: "🏆 Serving you since 2020 in Laval, North Shore & Laurentians",
    description:
      "Established in 2020, TAXI CHOMEDEY has become a reliable private transport alternative in Laval and the Laurentians through rigorous, transparent management.",
  },
  {
    title: "🚖 Greater availability in Laval, North Shore & Laurentians",
    description:
      "Our network of independent drivers ensures optimal coverage of key areas to minimize wait times, any time of day.",
  },
  {
    title: "🤝 Transparent pricing in Laval, North Shore & Laurentians",
    description:
      "No hidden fees or surprises. Our dispatchers and drivers apply clear, fair rates for all transport and assistance services.",
  },
  {
    title: "24/7 Service in Laval, North Shore & Laurentians",
    description:
      "A dispatch centre operating day and night, 365 days a year to handle your road or professional emergencies.",
  },
  {
    title: "Local Experts in Laval, North Shore & Laurentians",
    description:
      "In-depth knowledge of side streets and shortcuts in Chomedey, Fabreville, Vimont and Sainte-Dorothée to avoid recurring congestion.",
  },
  {
    title: "Professional Equipment for Taxi in Laval, North Shore & Laurentians",
    description:
      "Use of calibrated professional tools to work on recent and high-end vehicles without causing voltage anomalies.",
  },
];

export default function EnglishHomePage() {
  return (
    <>
      <HeaderEn />

      <main>
        <section className="relative flex min-h-[600px] items-center overflow-hidden bg-[#1e3a5f]">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
          <div className="relative z-10 mx-auto max-w-7xl px-5 py-16">
            <div className="max-w-xl text-white">
              <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl">
                🚖 #1 TAXI CHOMEDEY | Taxi & Roadside Assistance 24/7 in Laval,
                North Shore & Laurentians
              </h1>
              <p className="mb-6 text-base leading-relaxed text-white/95">
                TAXI CHOMEDEY meets your local transport or emergency roadside
                needs. Your driver provides fast, reliable service in Laval,
                Boisbriand, Saint-Eustache, Blainville, Terrebonne, Mascouche,
                Repentigny, Saint-Jérôme, Mirabel, Sainte-Agathe-des-Monts,
                Mont-Tremblant and across the North Shore. Available 24/7.
              </p>
              <h3 className="mb-5 text-xl font-semibold text-[#e6b422]">
                24/7 Service – Contact us now!
              </h3>
              <div className="mb-6 flex flex-wrap gap-3 text-sm">
                <span className="rounded-full bg-white/10 px-3 py-1">
                  ✅ Founded in 2020
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  🚖 50+ Partner vehicles
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  ⏱️ Express response
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">
                  🔒 Experienced drivers
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="tel:+15142396512"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
                >
                  📞 Call now
                </a>
                <Link
                  href="/en/contact"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-[#e6b422] bg-white px-8 py-4 text-lg font-semibold text-[#1e3a5f] transition hover:bg-[#e6b422] hover:text-white"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">
              Our Taxi & Roadside Assistance Services in Laval, North Shore &
              Laurentians
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="group rounded-xl border-l-4 border-transparent bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#e6b422] hover:shadow-md"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#1e3a5f] text-2xl text-white">
                    🚖
                  </div>
                  <h3 className="mb-3 text-center text-lg font-semibold text-[#e6b422]">
                    {service.title}
                  </h3>
                  <p className="text-center text-sm leading-relaxed text-[#4a627a]">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f9f9f8] py-20">
          <div className="mx-auto max-w-7xl px-5">
            <h2 className="mb-12 text-center text-3xl font-bold text-[#1e3a5f] md:text-4xl">
              Why choose TAXI CHOMEDEY in Laval, North Shore & Laurentians?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-xl border-l-4 border-[#e6b422] bg-white p-7 transition hover:-translate-y-1"
                >
                  <h3 className="mb-3 text-lg font-semibold text-[#e6b422]">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4a627a]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#1e3a5f] py-20">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-5 text-center md:flex-row md:text-left">
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Get a free estimate by phone or email!
            </h2>
            <a
              href="tel:+15142396512"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-0.5"
            >
              📞 514-239-6512
            </a>
          </div>
        </section>
      </main>

      <FooterEn />
    </>
  );
}
