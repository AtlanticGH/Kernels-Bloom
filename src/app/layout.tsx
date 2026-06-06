import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import { KBNavigation } from "@/components/kb-navigation";
import { KBFooter } from "@/components/kb-footer";
import { OrganizationJsonLd } from "@/components/json-ld";
import { SITE } from "@/lib/site";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-display",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-body",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic"],
  display: "swap",
  variable: "--font-accent",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Luxury African Botanicals`,
    template: `%s — ${SITE.name} | Luxury African Botanicals`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} | Luxury African Botanicals`,
    description: SITE.description,
    url: SITE.url,
    images: [{ url: "/og/default.svg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Luxury African Botanicals`,
    description: SITE.description,
    images: ["/og/default.svg"],
  },
  alternates: { canonical: SITE.url },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jost.variable} ${playfair.variable}`}
    >
      <body className="min-h-dvh bg-kb-parchment text-kb-dusk antialiased">
        <a href="#main" className="kb-skip-link">
          Skip to content
        </a>
        <OrganizationJsonLd />
        <KBNavigation />
        <main id="main">{children}</main>
        <KBFooter />
      </body>
    </html>
  );
}
