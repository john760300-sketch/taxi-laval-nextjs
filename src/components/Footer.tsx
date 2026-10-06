import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-6">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 grid gap-10 md:grid-cols-[1fr_1.5fr]">
          {/* Brand */}
          <div>
            <div className="mb-4 flex h-12 items-center rounded bg-[#1e3a5f] px-3 w-fit">
              <span className="rounded bg-[#e6b422] px-3 py-1.5 text-sm font-black tracking-wide text-[#1e3a5f]">
                TAXI CHOMEDEY
              </span>
            </div>
            <p className="mb-5 text-[13px] leading-relaxed text-[#4a627a]">
              Service de taxi et d&apos;assistance routière 24h/24 7j/7 à Laval,
              Rive-Nord & Laurentides. Transport local, aéroport YUL, survoltage
              batterie, déverrouillage de portière et plus.
            </p>
            <a
              href="tel:+15142396512"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-5 py-2.5 font-semibold text-white"
            >
              📞 514-239-6512
            </a>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold text-[#1e3a5f]">Navigation</h3>
            <ul className="flex flex-wrap gap-x-10 gap-y-3">
              <li>
                <Link
                  href="/fr"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Accueil
                </Link>
              </li>
              <li>
                <Link
                  href="/fr/transport-aeroport"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Transport aéroport
                </Link>
              </li>
              <li>
                <Link
                  href="/fr/survoltage-batterie"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Survoltage batterie
                </Link>
              </li>
              <li>
                <Link
                  href="/fr/deverrouillage-portiere"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Déverrouillage portière
                </Link>
              </li>
              <li>
                <Link
                  href="/fr/contact"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 border-t border-gray-100 pt-6 text-sm text-[#4a627a]">
          <span>© {new Date().getFullYear()} TAXI CHOMEDEY. Tous droits réservés.</span>
          <Link href="/fr" className="hover:text-[#e6b422]">
            FR
          </Link>
          <Link href="/en" className="hover:text-[#e6b422]">
            EN
          </Link>
        </div>
      </div>
    </footer>
  );
}
