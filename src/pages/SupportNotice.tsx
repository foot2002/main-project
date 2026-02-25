import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { fetchNotices } from "@/lib/notice-api";
import type { Notice } from "@/types/admin-notice";

const ITEMS_PER_PAGE = 5;

const formatDate = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const SupportNotice = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadNotices = async () => {
      setLoading(true);
      const { data, error } = await fetchNotices();
      if (error) {
        console.error("Failed to load notices:", error);
        setNotices([]);
      } else {
        setNotices(data ?? []);
      }
      setLoading(false);
    };
    loadNotices();
  }, []);

  const totalPages = Math.ceil(notices.length / ITEMS_PER_PAGE);
  const paginated = notices.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Notice</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-10">공지사항</h1>

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[80px_1fr_100px] gap-4 px-4 py-3 border-b-2 border-primary text-xs font-semibold text-foreground uppercase tracking-wider">
            <span>분류</span>
            <span>제목</span>
            <span>날짜</span>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              등록된 공지사항이 없습니다.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {paginated.map((item) => {
                const displayDate = item.date ? formatDate(item.date) : formatDate(item.createdAt);
                return (
                  <Link
                    key={item.id}
                    to={`/support/notice/${item.id}`}
                    className="group block sm:grid sm:grid-cols-[80px_1fr_100px] gap-4 px-4 py-5 hover:bg-section-bg transition-colors"
                  >
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground inline-block w-fit sm:mt-0.5">
                      {item.category}
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold text-primary group-hover:text-blue-highlight transition-colors">{item.title}</h3>
                      <p className="text-xs text-muted-foreground mt-1 sm:hidden">{displayDate}</p>
                    </div>
                    <span className="text-sm text-muted-foreground hidden sm:block">{displayDate}</span>
                  </Link>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`w-9 h-9 rounded-md text-sm font-medium transition-colors ${
                    page === i + 1
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-md border border-border text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SupportNotice;
