import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});
import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Mark Drastrup - Composer",
  description:
    "I’m a composer creating music for video games and film, with a focus on cinematic orchestral scores and immersive electronic soundscapes. My goal is to support gameplay and storytelling through music that feels emotional, memorable, and alive.",
  icons: {
    icon: "/drastrup-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
