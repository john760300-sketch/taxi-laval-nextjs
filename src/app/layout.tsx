import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TAXI CHOMEDEY | 🚖 #1 Service de Taxi Laval, Rive-Nord & Laurentides 24h/24 7j/7",
  description:
    "TAXI CHOMEDEY à Laval, Rive-Nord & Laurentides – Disponible 24h/24 7j/7. Transport local, aéroport YUL, survoltage batterie, déverrouillage de portière et service de raccompagnement 24/7. Réservez maintenant ! ☎️ 514-239-6512",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
