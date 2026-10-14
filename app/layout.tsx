import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneArc Residence — Elevated Living in New York",
  description:
    "Explore OneArc Residence, a considered New York home shaped by warm materials, generous light, and thoughtful modern living.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
