import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { ChevronLeft, ChevronRight, Loader2, ExternalLink } from "lucide-react";
import { fetchPressList } from "@/lib/press-api";
import type { Press, PressSortType } from "@/types/admin-press";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ITEMS_PER_PAGE = 5;

const formatDate = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const sortOptions: { value: PressSortType; label: string }[] = [
  { value: "default", label: "관리자지정순" },
  { value: "latest", label: "최신순" },
  { value: "created", label: "등록순" },
  { value: "manual", label: "고정글 우선" },
];

const AboutPress = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pressList, setPressList] = useState<Press[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const sortType = (searchParams.get("sort") as PressSortType) || "default";

  useEffect(() => {
    const loadPressList = async () => {
      setLoading(true);
      const { data, error } = await fetchPressList(sortType);
      if (error) {
        console.error("Failed to load press list:", error);
        setPressList([]);
      } else {
        setPressList(data ?? []);
      }
      setLoading(false);
    };
    loadPressList();
  }, [sortType]);

  const handleSortChange = (value: PressSortType) => {
    setSearchParams({ sort: value });
    setPage(1); // Reset to first page when sorting changes
  };

  const totalPages = Math.ceil(pressList.length / ITEMS_PER_PAGE);
  const paginated = pressList.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <p className="text-xs font-medium tracking-widest uppercase text-blue-highlight mb-4 font-display">Press & Media</p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary">언론 보도</h1>
            <Select value={sortType} onValueChange={handleSortChange}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="정렬 선택" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[1fr_120px_100px] gap-4 px-4 py-3 border-b-2 border-primary text-xs font-semibold text-foreground uppercase tracking-wider">
            <span>제목</span>
            <span>출처</span>
            <span>날짜</span>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : paginated.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              등록된 언론보도가 없습니다.
            </div>
          ) : (
            <div className="divide-y divide-border">
              {paginated.map((item) => {
                const displayDate = item.date ? formatDate(item.date) : formatDate(item.createdAt);
                return (
                  <a
                    key={item.id}
                    href={item.linkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block sm:grid sm:grid-cols-[1fr_120px_100px] gap-4 px-4 py-5 hover:bg-section-bg transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          {item.isPinned && (
                            <span className="inline-flex items-center rounded-full bg-orange-100 text-orange-800 px-2 py-0.5 text-xs font-medium">
                              TOP
                            </span>
                          )}
                          <h3 className="text-sm font-semibold text-primary group-hover:text-blue-highlight transition-colors">
                            {item.title}
                          </h3>
                        </div>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-blue-highlight shrink-0 mt-0.5" />
                    </div>
                    <span className="text-sm text-muted-foreground hidden sm:block">{item.source}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground hidden sm:block">{displayDate}</span>
                      <ExternalLink className="h-3 w-3 text-muted-foreground sm:hidden" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 sm:hidden col-span-full">
                      {item.source} · {displayDate}
                    </p>
                  </a>
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

export default AboutPress;
