import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Loader2 } from "lucide-react";
import { fetchPublicPortfolioItems } from "@/lib/portfolio-api";
import type { PublicPortfolioListItem } from "@/lib/portfolio-api";

const categoryLabels: Record<string, string> = {
  PUBLIC: "공공",
  ENTERPRISE: "기업",
  EDUCATION: "교육",
  ETC: "기타",
};

const Portfolio = () => {
  const [items, setItems] = useState<PublicPortfolioListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("전체");

  useEffect(() => {
    let cancelled = false;
    fetchPublicPortfolioItems().then(({ data, error }) => {
      if (!cancelled && !error) setItems(data ?? []);
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  const categories = ["전체", ...Array.from(new Set(items.map((item) => categoryLabels[item.category] || item.category)))];
  const filtered = category === "전체" ? items : items.filter((item) => categoryLabels[item.category] === category || item.category === category);

  return (
    <Layout>
      <section className="bg-primary py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-blue-highlight text-sm font-medium tracking-widest uppercase mb-4 font-display">Portfolio</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">포트폴리오</h1>
          <p className="text-primary-foreground/60 max-w-2xl leading-relaxed">2,000건 이상의 프로젝트에서 축적된 전문성과 성과를 확인하세요.</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  category === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-border"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-16">등록된 포트폴리오가 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((item) => (
                <Link
                  key={item.id}
                  to={`/portfolio/${item.id}`}
                  className="group border border-border rounded-lg overflow-hidden hover:border-blue-highlight/30 hover:shadow-lg hover:shadow-blue-highlight/5 transition-all"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-muted">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                        {categoryLabels[item.category] || item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{item.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-blue-highlight transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.summary}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
