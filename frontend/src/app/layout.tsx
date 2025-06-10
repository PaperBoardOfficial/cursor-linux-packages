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
  title: "Cursor Linux Packages",
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
  icons: {
    icon: [
      { url: "/cursor.jpeg", sizes: "any", type: "image/jpeg" },
      { url: "/cursor.jpeg", sizes: "32x32", type: "image/jpeg" },
      { url: "/cursor.jpeg", sizes: "16x16", type: "image/jpeg" },
    ],
    shortcut: "/cursor.jpeg",
    apple: "/cursor.jpeg",
  },
  openGraph: {
    title: "Cursor Linux Packages",
    description: "Native Linux packages for Cursor AI Editor",
    type: "website",
    siteName: "Cursor Linux Packages",
    images: ["/cursor.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cursor Linux Packages",
    description: "Native Linux packages for Cursor AI Editor",
    images: ["/cursor.jpeg"],
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
