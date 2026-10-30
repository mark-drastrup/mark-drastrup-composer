import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { SanityLive } from "@/sanity/lib/live";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <SanityLive />
    </>
  );
}
