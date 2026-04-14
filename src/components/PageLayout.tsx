import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingElements from "@/components/FloatingElements";
import BottomNav from "@/components/BottomNav";
import { motion, useScroll, useSpring } from "framer-motion";

interface PageLayoutProps {
  children: React.ReactNode;
  /** If false, hides top info bar (default: true) */
  showTopBar?: boolean;
}

const PageLayout = ({ children, showTopBar = true }: PageLayoutProps) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen flex flex-col pb-14 lg:pb-0 relative overflow-x-hidden w-full"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 origin-left bg-primary z-[100]"
        style={{ scaleX }}
      />
      {showTopBar && <TopBar />}
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingElements />
      <BottomNav />
    </motion.div>
  );
};

export default PageLayout;
