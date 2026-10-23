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
                  href="/en/drive-home-service"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Drive-home service
                </Link>
              </li>
              <li>
                <Link
                  href="/en/medical-transport"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Medical transport
                </Link>
              </li>
              <li>
                <Link
                  href="/en/taxi-calculator"
                  className="text-sm font-medium text-[#1e3a5f] hover:text-[#e6b422]"
                >
                  Fare calculator
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
          <div className="flex items-center gap-4">
            <a
              href="https://www.facebook.com/p/Taxi-Chomedey-100075684710012/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-[#1e3a5f] hover:text-[#1877F2] transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a
              href="https://www.yelp.ca/biz/taxi-chomedey-laval-2"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm font-medium text-[#1e3a5f] hover:text-[#D32323] transition-colors"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M14.406 15.234c.99.998 2.262 2.825 1.74 4.246-.523 1.421-2.607 2.704-3.838 1.884-.582-.39-.983-1.246-1.338-1.246-.355 0-.628.65-.685 1.055-.06.425-.347 1.348-1.092 1.304-.745-.044-1.459-.81-1.337-1.748.122-.94.74-1.726.74-1.726s1.302-1.452 1.884-2.064c.582-.612 1.07-1.18 1.07-1.18s.854-.926 2.856 1.475zm-6.42-5.035C6.496 9.19 5.628 7.274 6.36 5.918c.732-1.356 3.724-1.94 3.724-1.94l1.84 6.87s-1.806 2.472-2.784 2.472c-.978 0-1.218-.218-1.218-.218s-.922-.327-1.528-.327c-.606 0-.966.38-.966.38s-.778-.122-1.034-.742c-.256-.62.256-1.18.256-1.18s.356-.637.702-.324c.346.313.546.78.546.78z"/></svg>
              Yelp
            </a>
          </div>
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
