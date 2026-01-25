import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Leader24 - AI per WhatsApp Business",
    template: "%s | Leader24",
  },
  description: "Automatizza il supporto clienti, qualifica i lead e aumenta le vendite con il tuo agente AI su WhatsApp. Attivo 24/7, setup in 5 minuti.",
  metadataBase: new URL("https://leader24.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
