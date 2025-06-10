import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cursor Linux Packages - Unofficial DEB & RPM packages",
  description:
    "Get Cursor AI Editor on your Linux system with native DEB and RPM packages. Automatically updated daily from the official AppImage releases.",
  keywords: [
    "cursor",
    "linux",
    "deb",
    "rpm",
    "packages",
    "ai",
    "editor",
    "ubuntu",
    "debian",
    "fedora",
    "rhel",
  ],
  authors: [{ name: "Cursor Linux Packages" }],
  creator: "Cursor Linux Packages",
  publisher: "Cursor Linux Packages",
  openGraph: {
    title: "Cursor Linux Packages",
    description: "Native Linux packages for Cursor AI Editor",
    type: "website",
    siteName: "Cursor Linux Packages",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursor Linux Packages",
    description: "Native Linux packages for Cursor AI Editor",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
