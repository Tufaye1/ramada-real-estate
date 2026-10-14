import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ramada Builders Ltd. — Halal Real Estate in Dhaka",
  description:
    "Ramada Builders partners with landowners, buyers, and investors to create transparent, Shariah-conscious real estate in Dhaka.",
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
