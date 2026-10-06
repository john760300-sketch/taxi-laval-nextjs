"use client";

import Link from "next/link";
import { useState } from "react";

const services = [
  { href: "/fr/transport-local", label: "Transport local" },
  { href: "/fr/transport-aeroport", label: "Transport aéroport (YUL)" },
  { href: "/fr/survoltage-batterie", label: "Survoltage batterie" },
  { href: "/fr/deverrouillage-portiere", label: "Déverrouillage portière" },
  { href: "/fr/livraison-express", label: "Livraison de colis" },
  { href: "/fr/transport-medical", label: "Transport médical" },
  { href: "/fr/raccompagnement", label: "🚗 Service de raccompagnement" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Link href="/fr" className="flex items-center">
          <div className="flex h-12 items-center rounded bg-[#1e3a5f] px-3">
            <span className="rounded bg-[#e6b422] px-3 py-1.5 text-sm font-black tracking-wide text-[#1e3a5f]">
              TAXI CHOMEDEY
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/fr"
            className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]"
          >
            ACCUEIL
          </Link>

          <div className="group relative">
            <button className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]">
              SERVICES ▼
            </button>
            <ul className="invisible absolute left-0 top-full z-50 min-w-[240px] rounded-lg bg-white py-3 opacity-0 shadow-md transition group-hover:visible group-hover:opacity-100">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="block px-5 py-2 text-sm text-[#1e3a5f] transition hover:bg-[#f9f9f8] hover:pl-6 hover:text-[#e6b422]"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/fr/urgence"
            className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]"
          >
            URGENCE
          </Link>

          <Link
            href="/fr/contact"
            className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]"
          >
            CONTACT
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+15142396512"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-5 py-2.5 font-semibold text-white sm:flex"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            514-239-6512
          </a>

          <div className="flex items-center gap-1 text-sm">
            <Link
              href="/fr"
              className="rounded bg-[#e6b422] px-2 py-1 font-medium text-white"
            >
              FR
            </Link>
            <Link
              href="/en"
              className="rounded px-2 py-1 font-medium text-[#1e3a5f] hover:bg-[#f9f9f8]"
            >
              EN
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="flex flex-col gap-1.5 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className="h-0.5 w-6 bg-[#1e3a5f]" />
            <span className="h-0.5 w-6 bg-[#1e3a5f]" />
            <span className="h-0.5 w-6 bg-[#1e3a5f]" />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 h-full w-[85%] max-w-xs overflow-y-auto bg-white p-6 pt-24 lg:hidden">
            <nav className="flex flex-col gap-1">
              <Link
                href="/fr"
                className="border-b border-gray-100 py-3 text-lg font-medium text-[#1e3a5f]"
                onClick={() => setMobileOpen(false)}
              >
                ACCUEIL
              </Link>

              <button
                className="flex w-full items-center justify-between border-b border-gray-100 py-3 text-lg font-medium text-[#1e3a5f]"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                SERVICES
                <span className={`transition ${servicesOpen ? "rotate-180" : ""}`}>
                  ▼
                </span>
              </button>
              {servicesOpen && (
                <div className="mb-2 ml-4 rounded bg-[#f9f9f8]">
                  {services.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block border-b border-gray-100 px-4 py-2.5 text-[15px] text-[#4a627a]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/fr/urgence"
                className="border-b border-gray-100 py-3 text-lg font-medium text-[#1e3a5f]"
                onClick={() => setMobileOpen(false)}
              >
                URGENCE
              </Link>
              <Link
                href="/fr/contact"
                className="border-b border-gray-100 py-3 text-lg font-medium text-[#1e3a5f]"
                onClick={() => setMobileOpen(false)}
              >
                CONTACT
              </Link>

              <div className="mt-8 space-y-3 border-t pt-6">
                <a
                  href="tel:+15142396512"
                  className="flex items-center gap-2 text-[#1e3a5f]"
                >
                  📞 514-239-6512
                </a>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}
