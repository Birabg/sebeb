import type { Metadata } from "next";

import "./globals.css";
import { LangProvider } from "@/lib/i18n/use-lang";

export const metadata: Metadata = {
  title: {
    default: "SEBEB — A Digital Craft Workshop",
    template: "%s | SEBEB",
  },

  description:
    "SEBEB is a digital craft workshop where people learn practical skills, practice with purpose, and make real things.",

  keywords: [
    "SEBEB",
    "craft learning",
    "Ethiopian crafts",
    "online learning",
    "leather craft",
    "woodworking",
    "pottery",
    "weaving",
    "Amharic learning",
  ],

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="--font-serif --font-sans --font-amharic-serif"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-paper text-ink antialiased">
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}