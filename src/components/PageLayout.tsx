import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";

interface PageLayoutProps {
  children: React.ReactNode;
  /** If false, hides top info bar (default: true) */
  showTopBar?: boolean;
}

const PageLayout = ({ children, showTopBar = true }: PageLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col pb-14 lg:pb-0">
      {showTopBar && <TopBar />}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingElements />
    </div>
  );
};

export default PageLayout;
