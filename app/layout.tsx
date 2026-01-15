import type { Metadata } from "next";
import { Geist_Mono, Figtree } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "sheffield.rocks",
  description: "Coming this spring.",
  metadataBase: new URL("https://sheffield.rocks"),
  openGraph: {
    title: "sheffield.rocks",
    description: "Coming this spring.",
    url: "https://sheffield.rocks",
    siteName: "sheffield.rocks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "sheffield.rocks",
    description: "Coming this spring.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${figtree.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
