import type { Metadata } from "next";
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
