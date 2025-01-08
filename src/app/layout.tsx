import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/hexta-ui/Navbar";
import Footer from "@/components/Footer";
import { Background } from "@/components/background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BossDaily's Portfolio",
  description: "A portfolio website for BossDaily to showcase his projects and skills.",
  openGraph: {
    images: [
      {
        url: "/api/og",
      }
    ],
  },
  themeColor: "#10002b"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-BlackRussian`}>
        <Background />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
