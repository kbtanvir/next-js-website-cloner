import { FooterSection } from "../footer/footer";
import MainHeader from "../header";

interface LayoutProps {
  children: React.ReactNode;
}

export function CryptoLayout({ children }: LayoutProps) {
  return (
    <>
      <MainHeader />
      <>{children}</>
      <FooterSection />
    </>
  );
}
