import Header from "./Header";
import Footer from "./Footer";
import { AnimatedPageContent } from "./AnimatedPageContent";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <AnimatedPageContent>{children}</AnimatedPageContent>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
