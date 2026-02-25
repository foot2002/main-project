import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/wisein_logo.png";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Business", href: "/business",
    children: [
      { label: "데이터 분석", href: "/business/data-analytics" },
      { label: "AI 솔루션", href: "/business/ai-solutions" },
      { label: "플랫폼 서비스", href: "/business/platform" },
      { label: "데이터+AI교육", href: "/business/education" },
    ],
  },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  {
    label: "About Us", href: "/about/overview",
    children: [
      { label: "회사 소개", href: "/about/overview" },
      { label: "미션 & 비전", href: "/about/mission" },
      { label: "연혁", href: "/about/history" },
      { label: "언론 보도", href: "/about/press" },
      { label: "오시는 길", href: "/about/location" },
    ],
  },
  {
    label: "Support", href: "/support/contact",
    children: [
      { label: "문의하기", href: "/support/contact" },
      { label: "FAQ", href: "/support/faq" },
      { label: "공지사항", href: "/support/notice" },
    ],
  },
];

const isActive = (pathname: string, item: NavItem) => {
  if (item.href === "/") return pathname === "/";
  if (item.href === "/about/overview") return pathname.startsWith("/about");
  if (item.href === "/support/contact") return pathname.startsWith("/support");
  return pathname.startsWith(item.href);
};

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="WiseIN Company" className="h-9 w-auto" />
          <span className="ml-1.5 text-[10px] font-medium tracking-widest uppercase text-muted-foreground hidden sm:inline-block">
            Company
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.href} className="relative group">
              <Link
                to={item.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium transition-colors rounded-md inline-flex items-center gap-1",
                  isActive(location.pathname, item)
                    ? "text-blue-highlight"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {item.label}
                {item.children && <ChevronDown size={12} className="opacity-50" />}
              </Link>

              {/* Dropdown */}
              {item.children && (
                <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="bg-card border border-border rounded-lg shadow-lg py-2 min-w-[180px]">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        className={cn(
                          "block px-4 py-2.5 text-sm transition-colors",
                          location.pathname === child.href
                            ? "text-blue-highlight bg-section-bg"
                            : "text-foreground/70 hover:text-foreground hover:bg-section-bg"
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <Link
            to="/support/contact"
            className="ml-4 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-navy-light transition-colors"
          >
            문의하기
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="메뉴 열기"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <div key={item.href}>
                {item.children ? (
                  <>
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.href ? null : item.href)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-md transition-colors",
                        isActive(location.pathname, item)
                          ? "text-blue-highlight bg-secondary"
                          : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      {item.label}
                      <ChevronDown size={14} className={cn("transition-transform", mobileExpanded === item.href && "rotate-180")} />
                    </button>
                    {mobileExpanded === item.href && (
                      <div className="ml-4 mt-1 flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                              "px-4 py-2.5 text-sm rounded-md transition-colors",
                              location.pathname === child.href
                                ? "text-blue-highlight bg-secondary"
                                : "text-foreground/60 hover:text-foreground hover:bg-secondary"
                            )}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    to={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3 text-sm font-medium rounded-md transition-colors block",
                      isActive(location.pathname, item)
                        ? "text-blue-highlight bg-secondary"
                        : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              to="/support/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
            >
              문의하기
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
