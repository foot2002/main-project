import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { checkSupabaseConnection } from "@/lib/supabase";
import Index from "./pages/Index";
import Business from "./pages/Business";
import BusinessDataAnalytics from "./pages/BusinessDataAnalytics";
import BusinessAISolutions from "./pages/BusinessAISolutions";
import BusinessPlatform from "./pages/BusinessPlatform";
import BusinessEducation from "./pages/BusinessEducation";
import Portfolio from "./pages/Portfolio";
import PortfolioDetail from "./pages/PortfolioDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import About from "./pages/About";
import AboutOverview from "./pages/AboutOverview";
import AboutMission from "./pages/AboutMission";
import AboutHistory from "./pages/AboutHistory";
import AboutPress from "./pages/AboutPress";
import AboutPressDetail from "./pages/AboutPressDetail";
import AboutLocation from "./pages/AboutLocation";
import Support from "./pages/Support";
import SupportContact from "./pages/SupportContact";
import SupportFAQ from "./pages/SupportFAQ";
import SupportNotice from "./pages/SupportNotice";
import SupportNoticeDetail from "./pages/SupportNoticeDetail";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    checkSupabaseConnection().then(({ ok, message }) => {
      if (ok) {
        console.log("[Supabase]", message);
      } else {
        console.warn("[Supabase]", message);
      }
    });
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/business" element={<Business />} />
          <Route path="/business/data-analytics" element={<BusinessDataAnalytics />} />
          <Route path="/business/ai-solutions" element={<BusinessAISolutions />} />
          <Route path="/business/platform" element={<BusinessPlatform />} />
          <Route path="/business/education" element={<BusinessEducation />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/:id" element={<PortfolioDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/about" element={<Navigate to="/about/overview" replace />} />
          <Route path="/about/overview" element={<AboutOverview />} />
          <Route path="/about/mission" element={<AboutMission />} />
          <Route path="/about/history" element={<AboutHistory />} />
          <Route path="/about/press" element={<AboutPress />} />
          <Route path="/about/press/:id" element={<AboutPressDetail />} />
          <Route path="/about/location" element={<AboutLocation />} />
          <Route path="/support" element={<Navigate to="/support/contact" replace />} />
          <Route path="/support/contact" element={<SupportContact />} />
          <Route path="/support/faq" element={<SupportFAQ />} />
          <Route path="/support/notice" element={<SupportNotice />} />
          <Route path="/support/notice/:id" element={<SupportNoticeDetail />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
