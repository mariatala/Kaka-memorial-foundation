import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Kaka Memorial Foundation',
	description:
		'Kaka Memorial Foundation is a non‑profit organization dedicated to uplifting rural communities in Nigeria through access to clean water, quality education, human rights advocacy, and sustainable development. Our initiatives focus on bridging the technology gap, creating industries, reducing rural‑urban migration, and fostering cultural preservation for lasting community impact',
	keywords: [
		'Kaka Memorial Foundation',
		'Nigeria NGO',
		'Rural development',
		'Clean water access',
		'Education in Nigeria',
		'Human rights advocacy',
		'Community empowerment',
		'Sustainable development',
	],
  authors: [{ name: 'Kaka Memorial Foundation' }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
