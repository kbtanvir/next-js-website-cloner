import { FooterSection } from "../footer/footer";
import Header from "../header";

interface LayoutProps {
  children: React.ReactNode;
}

export function AgencyLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <>{children}</>
      <FooterSection />
    </>
  );
}
