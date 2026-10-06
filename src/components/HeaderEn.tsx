"use client";

import Link from "next/link";
import { useState } from "react";

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

        <nav className="hidden items-center gap-8 lg:flex">
          <Link
            href="/en"
            className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]"
          >
            HOME
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
            href="/en/emergency"
            className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]"
          >
            EMERGENCY
          </Link>

          <Link
            href="/en/contact"
            className="font-medium text-[#1e3a5f] transition hover:text-[#e6b422]"
          >
            CONTACT
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:+15142396512"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-5 py-2.5 font-semibold text-white sm:flex"
          >
            📞 514-239-6512
          </a>

          <div className="flex items-center gap-1 text-sm">
            <Link
              href="/fr"
              className="rounded px-2 py-1 font-medium text-[#1e3a5f] hover:bg-[#f9f9f8]"
            >
              FR
            </Link>
            <Link
              href="/en"
              className="rounded bg-[#e6b422] px-2 py-1 font-medium text-white"
            >
              EN
            </Link>
          </div>

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

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed left-0 top-0 z-50 h-full w-[85%] max-w-xs overflow-y-auto bg-white p-6 pt-24 lg:hidden">
            <nav className="flex flex-col gap-1">
              <Link
                href="/en"
                className="border-b border-gray-100 py-3 text-lg font-medium text-[#1e3a5f]"
                onClick={() => setMobileOpen(false)}
              >
                HOME
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
                href="/en/emergency"
                className="border-b border-gray-100 py-3 text-lg font-medium text-[#1e3a5f]"
                onClick={() => setMobileOpen(false)}
              >
                EMERGENCY
              </Link>
              <Link
                href="/en/contact"
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
