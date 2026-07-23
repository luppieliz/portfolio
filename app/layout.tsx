import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Silkscreen } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-disp",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-mono",
});

const silkscreen = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pix",
});

export const metadata: Metadata = {
  title: "Elizabeth Lee — I notice small things.",
  description:
    "Elizabeth Lee designs interfaces, builds websites, draws creatures, and photographs things smaller than your thumbnail. Singapore.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#FAF6EE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${plexMono.variable} ${silkscreen.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
