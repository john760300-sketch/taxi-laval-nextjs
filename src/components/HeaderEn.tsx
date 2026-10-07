"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cities } from "@/data/cities";

const services = [
  { href: "/en/local-transport", label: "Local transport" },
  { href: "/en/airport-transport", label: "Airport transport (YUL)" },
  { href: "/en/battery-boost", label: "Battery boost" },
  { href: "/en/door-unlocking", label: "Door unlocking" },
  { href: "/en/express-delivery", label: "Express delivery" },
  { href: "/en/medical-transport", label: "Medical transport" },
  { href: "/en/drive-home-service", label: "🚗 Drive-home service" },
];

export default function HeaderEn() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [villesOpen, setVillesOpen] = useState(false);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5">
        <Link href="/en" className="flex items-center">
          <div className="flex h-12 items-center rounded bg-[#1e3a5f] px-3">
            <span className="rounded bg-[#e6b422] px-3 py-1.5 text-sm font-black tracking-wide text-[#1e3a5f]">
              TAXI CHOMEDEY
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          <Link href="/en" className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]">HOME</Link>
          <div className="group relative">
            <button type="button" className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]">SERVICES ▼</button>
            <ul className="invisible absolute left-0 top-full z-50 min-w-[240px] rounded-lg bg-white py-3 opacity-0 shadow-md transition group-hover:visible group-hover:opacity-100">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="block px-5 py-2 text-sm text-[#1e3a5f] transition hover:bg-[#f9f9f8] hover:pl-6 hover:text-[#e6b422]">{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="group relative">
            <button type="button" className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]">CITIES ▼</button>
            <ul className="invisible absolute left-0 top-full z-50 max-h-[70vh] min-w-[220px] overflow-y-auto rounded-lg bg-white py-3 opacity-0 shadow-md transition group-hover:visible group-hover:opacity-100">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/en/taxi-${c.slug}`} className="block px-5 py-2 text-sm text-[#1e3a5f] transition hover:bg-[#f9f9f8] hover:pl-6 hover:text-[#e6b422]">Taxi {c.nameEn}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link href="/en/emergency" className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]">EMERGENCY</Link>
          <Link href="/en/contact" className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]">CONTACT</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="tel:+15142396512" className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-5 py-2.5 font-semibold text-white sm:flex">📞 514-239-6512</a>
          <div className="flex items-center gap-1 text-sm">
            <Link href="/fr" className="rounded px-2 py-1 font-medium text-[#1e3a5f] hover:bg-[#f9f9f8]">FR</Link>
            <Link href="/en" className="rounded bg-[#e6b422] px-2 py-1 font-medium text-white">EN</Link>
          </div>

          <button
            type="button"
            className="relative z-[70] flex h-11 w-11 items-center justify-center rounded-lg border border-gray-200 bg-white lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <span className="text-2xl leading-none text-[#1e3a5f]">×</span>
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="block h-0.5 w-5 bg-[#1e3a5f]" />
                <span className="block h-0.5 w-5 bg-[#1e3a5f]" />
                <span className="block h-0.5 w-5 bg-[#1e3a5f]" />
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/50" aria-label="Close menu" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-xl" role="dialog" aria-modal="true">
            <div className="flex h-20 items-center justify-between border-b px-5">
              <span className="font-bold text-[#1e3a5f]">Menu</span>
              <button type="button" className="flex h-11 w-11 items-center justify-center rounded-lg text-2xl text-[#1e3a5f]" onClick={() => setMobileOpen(false)} aria-label="Close">×</button>
            </div>
            <nav className="flex-1 overflow-y-auto px-5 pb-8">
              <Link href="/en" className="block border-b border-gray-100 py-3.5 text-lg font-medium text-[#1e3a5f]" onClick={() => setMobileOpen(false)}>HOME</Link>
              <button type="button" className="flex w-full items-center justify-between border-b border-gray-100 py-3.5 text-left text-lg font-medium text-[#1e3a5f]" onClick={() => setServicesOpen((v) => !v)}>
                SERVICES<span className={`text-sm transition ${servicesOpen ? "rotate-180" : ""}`}>▼</span>
              </button>
              {servicesOpen && (
                <div className="mb-1 rounded bg-[#f9f9f8]">
                  {services.map((s) => (
                    <Link key={s.href} href={s.href} className="block border-b border-gray-100 px-4 py-3 text-[15px] text-[#4a627a]" onClick={() => setMobileOpen(false)}>{s.label}</Link>
                  ))}
                </div>
              )}
              <button type="button" className="flex w-full items-center justify-between border-b border-gray-100 py-3.5 text-left text-lg font-medium text-[#1e3a5f]" onClick={() => setVillesOpen((v) => !v)}>
                CITIES<span className={`text-sm transition ${villesOpen ? "rotate-180" : ""}`}>▼</span>
              </button>
              {villesOpen && (
                <div className="mb-1 max-h-56 overflow-y-auto rounded bg-[#f9f9f8]">
                  {cities.map((c) => (
                    <Link key={c.slug} href={`/en/taxi-${c.slug}`} className="block border-b border-gray-100 px-4 py-3 text-[15px] text-[#4a627a]" onClick={() => setMobileOpen(false)}>Taxi {c.nameEn}</Link>
                  ))}
                </div>
              )}
              <Link href="/en/emergency" className="block border-b border-gray-100 py-3.5 text-lg font-medium text-[#1e3a5f]" onClick={() => setMobileOpen(false)}>EMERGENCY</Link>
              <Link href="/en/contact" className="block border-b border-gray-100 py-3.5 text-lg font-medium text-[#1e3a5f]" onClick={() => setMobileOpen(false)}>CONTACT</Link>
              <a href="tel:+15142396512" className="mt-6 flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-6 py-3.5 font-semibold text-white">📞 514-239-6512</a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
