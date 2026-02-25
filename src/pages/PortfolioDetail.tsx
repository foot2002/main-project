import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Loader2 } from "lucide-react";
import { fetchPublicPortfolioItemById } from "@/lib/portfolio-api";
import type { PublicPortfolioItem } from "@/lib/portfolio-api";

const categoryLabels: Record<string, string> = {
  PUBLIC: "공공",
  ENTERPRISE: "기업",
  EDUCATION: "교육",
  ETC: "기타",
};

const PortfolioDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState<PublicPortfolioItem | null | "loading">("loading");

  useEffect(() => {
    if (!id) {
      setItem(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await fetchPublicPortfolioItemById(id);
      if (!cancelled) setItem(data ?? null);
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (item === "loading") {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-muted-foreground mb-4">포트폴리오를 찾을 수 없습니다.</p>
          <Link to="/portfolio" className="text-blue-highlight text-sm font-semibold hover:underline">포트폴리오로 돌아가기</Link>
        </div>
      </Layout>
    );
  }

  // 내용을 줄바꿈 기준으로 섹션으로 나누기
  const contentSections = item.content.split("\n\n").filter((s) => s.trim());

  return (
    <Layout>
      <section className="bg-primary py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> 포트폴리오
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/80">
              {categoryLabels[item.category] || item.category}
            </span>
            {item.date && (
              <span className="text-xs text-primary-foreground/40">{item.date}</span>
            )}
            {item.author && (
              <span className="text-xs text-primary-foreground/40 ml-auto">작성자: {item.author}</span>
            )}
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground">{item.title}</h1>
        </div>
      </section>

      {/* Project image */}
      {item.imageUrl && (
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl -mt-8 relative z-10 mb-10">
          <div className="rounded-lg overflow-hidden shadow-lg aspect-[16/9]">
            <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="prose prose-sm max-w-none">
            {contentSections.length > 0 ? (
              contentSections.map((section, i) => (
                <div key={i} className="mb-8">
                  <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{section.trim()}</p>
                </div>
              ))
            ) : (
              <div className="mb-8">
                <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{item.content}</p>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-border">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-5 py-2.5 text-sm font-semibold text-primary hover:bg-muted hover:border-blue-highlight/30 transition-colors"
            >
              <ArrowLeft size={16} /> 목록으로 돌아가기
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PortfolioDetail;
