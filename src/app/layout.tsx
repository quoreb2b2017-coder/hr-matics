import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Libre_Franklin } from "next/font/google";
import ClientEffects from "@/components/ClientEffects";
import SubscribeModal, { Toast } from "@/components/SubscribeModal";
import JsonLd from "@/components/JsonLd";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const SITE_URL = getSiteUrl();

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const libreFranklin = Libre_Franklin({
  variable: "--font-libre",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "HRmatics | The People Operations Brief",
    template: "%s | HRmatics",
  },
  description:
    "Intelligence, news, and playbooks for the people who run people operations. Compliance, talent, total rewards, HR technology, and culture, decoded for HR leaders.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon", type: "image/png", sizes: "32x32" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/brand/mark.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    type: "website",
    siteName: "HRmatics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${fraunces.variable} ${libreFranklin.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "HRmatics",
            url: SITE_URL,
            logo: `${SITE_URL}/brand/mark.svg`,
          }}
        />
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "HRmatics",
            url: SITE_URL,
            potentialAction: {
              "@type": "SearchAction",
              target: `${SITE_URL}/?q={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          }}
        />
        {children}
        <ClientEffects />
        <SubscribeModal />
        <Toast />
      </body>
    </html>
  );
}
