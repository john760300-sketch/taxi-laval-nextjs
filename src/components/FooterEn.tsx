import Link from "next/link";

export default function FooterEn() {
  return (
    <footer className="bg-white pt-16 pb-6">
      <div className="mx-auto max-w-7xl px-5">
        <div className="mb-10 grid gap-10 md:grid-cols-[1fr_1.5fr]">
          <div>
            <div className="mb-4 flex h-12 w-fit items-center rounded bg-[#1e3a5f] px-3">
              <span className="rounded bg-[#e6b422] px-3 py-1.5 text-sm font-black tracking-wide text-[#1e3a5f]">
                TAXI CHOMEDEY
              </span>
            </div>
            <p className="mb-5 text-[13px] leading-relaxed text-[#4a627a]">
              Taxi and roadside assistance 24/7 in Laval, North Shore &
              Laurentians. Local transport, YUL airport, battery boost, door
              unlocking and more.
            </p>
            <a
              href="tel:+15142396512"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#e6b422] to-[#d4a017] px-5 py-2.5 font-semibold text-white"
            >
              📞 514-239-6512
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-bold text-[#1e3a5f]">Navigation</h3>
            <ul className="flex flex-wrap gap-x-10 gap-y-3">
              <li>
                <Link
                  href="/en"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/en/airport-transport"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Airport transport
                </Link>
              </li>
              <li>
                <Link
                  href="/en/battery-boost"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Battery boost
                </Link>
              </li>
              <li>
                <Link
                  href="/en/door-unlocking"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Door unlocking
                </Link>
              </li>
              <li>
                <Link
                  href="/en/contact"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 border-t border-gray-100 pt-6 text-sm text-[#4a627a]">
          <span>© {new Date().getFullYear()} TAXI CHOMEDEY. All rights reserved.</span>
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
