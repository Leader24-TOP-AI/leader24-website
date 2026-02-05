import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Script from "next/script";
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
  description: "Automatizza il supporto clienti e qualifica i lead con il tuo agente AI su WhatsApp. Attivo 24/7, setup in 5 minuti.",
  metadataBase: new URL("https://leader24.ai"),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "it_IT",
    url: "https://leader24.ai",
    siteName: "Leader24",
    title: "Leader24 - AI per WhatsApp Business",
    description: "Automatizza il supporto clienti e qualifica i lead con il tuo agente AI su WhatsApp. Attivo 24/7, setup in 5 minuti.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Leader24 - AI per WhatsApp Business",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Leader24 - AI per WhatsApp Business",
    description: "Automatizza il supporto clienti e qualifica i lead con il tuo agente AI su WhatsApp.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Script id="leader24-widget-config" strategy="afterInteractive">
          {`window.Leader24WidgetConfig = {
            agentId: '5ba57b54-4e50-4823-812d-bf812ad668ad',
            apiUrl: 'https://api.leader24.ai'
          };`}
        </Script>
        <Script
          src="https://api.leader24.ai/widget-public/5ba57b54-4e50-4823-812d-bf812ad668ad/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
