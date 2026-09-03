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
      <head>
        <script
          type="text/javascript"
          src="data:text/javascript;base64,LyogQWxsaSBBSSB3aWRnZXQgZm9yIHd3dy5ocm1hdGljcy5uZXQgKi8KKGZ1bmN0aW9uICh3LGQscyxvLGYsanMsZmpzKSB7d1snQWxsaUpTV2lkZ2V0J109bzt3W29dID0gd1tvXSB8fCBmdW5jdGlvbiAoKSB7ICh3W29dLnEgPSB3W29dLnEgfHwgW10pLnB1c2goYXJndW1lbnRzKSB9O2pzID0gZC5jcmVhdGVFbGVtZW50KHMpLCBmanMgPSBkLmdldEVsZW1lbnRzQnlUYWdOYW1lKHMpWzBdO2pzLmlkID0gbzsganMuc3JjID0gZjsganMuYXN5bmMgPSAxOyBmanMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoanMsIGZqcyk7fSh3aW5kb3csIGRvY3VtZW50LCAnc2NyaXB0JywgJ2FsbGknLCAnaHR0cHM6Ly9zdGF0aWMuYWxsaWFpLmNvbS93aWRnZXQvdjEuanMnKSk7YWxsaSgnaW5pdCcsICdzaXRlX3dQbnROMzRnUlhnWVRBclknKTthbGxpKCdvcHRpbWl6ZScsICdhbGwnKTs="
        />
      </head>
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
