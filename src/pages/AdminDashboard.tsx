import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { isAdminAuthenticated, clearAdminAuth } from "@/lib/admin-auth";
import {
  FileText,
  Briefcase,
  Megaphone,
  Newspaper,
  MessageSquare,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import BlogAdminPage from "./admin/BlogAdminPage";
import PortfolioAdminPage from "./admin/PortfolioAdminPage";
import NoticeAdminPage from "./admin/NoticeAdminPage";
import PressAdminPage from "./admin/PressAdminPage";
import InquiryAdminPage from "./admin/InquiryAdminPage";

type SectionKey = "blog" | "portfolio" | "notice" | "press" | "inquiry";

const sections: { key: SectionKey; label: string; icon: React.ElementType; description: string }[] = [
  { key: "blog", label: "블로그", icon: FileText, description: "블로그 글 작성·수정·삭제 후 Supabase에 등록, 웹에 노출" },
  { key: "portfolio", label: "포트폴리오", icon: Briefcase, description: "포트폴리오 항목 작성·수정·삭제 후 Supabase에 등록, 웹에 노출" },
  { key: "notice", label: "공지사항", icon: Megaphone, description: "공지사항 작성·수정·삭제 후 Supabase에 등록, 웹에 노출" },
  { key: "press", label: "언론보도", icon: Newspaper, description: "언론보도 작성·수정·삭제 후 Supabase에 등록, 웹에 노출" },
  { key: "inquiry", label: "문의사항", icon: MessageSquare, description: "방문자 문의 목록 조회, 답변 여부 수정, DB 반영" },
];

const AdminDashboard = () => {
  const [current, setCurrent] = useState<SectionKey>("blog");

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogout = () => {
    clearAdminAuth();
    window.location.href = "/admin";
  };

  const currentSection = sections.find((s) => s.key === current);

  return (
    <div className="min-h-screen flex bg-muted">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <Link to="/" className="text-sm font-semibold text-primary hover:text-blue-highlight">
            WiseIN 관리자
          </Link>
        </div>
        <nav className="flex-1 p-2 space-y-0.5">
          {sections.map((s) => (
            <button
              key={s.key}
              type="button"
              onClick={() => setCurrent(s.key)}
              className={`w-full flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                current === s.key
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/80 hover:bg-muted hover:text-foreground"
              }`}
            >
              <s.icon className="w-4 h-4 shrink-0" />
              {s.label}
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-border">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            로그아웃
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 lg:p-8 overflow-auto">
        <div className="max-w-4xl">
          {current !== "blog" && current !== "portfolio" && current !== "notice" && current !== "press" && currentSection && (
            <>
              <div className="flex items-center gap-2 mb-2">
                <currentSection.icon className="w-6 h-6 text-blue-highlight" />
                <h1 className="text-2xl font-bold text-primary">{currentSection.label} 관리</h1>
              </div>
              <p className="text-sm text-muted-foreground mb-8">
                {currentSection.description}
              </p>
            </>
          )}

          {current === "blog" ? (
            <BlogAdminPage />
          ) : current === "portfolio" ? (
            <PortfolioAdminPage />
          ) : current === "notice" ? (
            <NoticeAdminPage />
          ) : current === "press" ? (
            <PressAdminPage />
          ) : current === "inquiry" ? (
            <InquiryAdminPage />
          ) : (
            <div className="rounded-xl border border-border bg-card p-8">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <LayoutDashboard className="w-12 h-12 text-muted-foreground/50 mb-4" />
                <p className="text-sm font-medium text-foreground mb-1">
                  {currentSection?.label} 대시보드
                </p>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Supabase 테이블·컬럼 확정 후 목록 조회, 작성, 수정, 삭제 기능을 연동할 예정입니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
