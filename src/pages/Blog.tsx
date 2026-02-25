import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Loader2 } from "lucide-react";
import { fetchPublicBlogPosts } from "@/lib/blog-api";
import type { PublicBlogListItem } from "@/lib/blog-api";

const Blog = () => {
  const [posts, setPosts] = useState<PublicBlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("전체");

  useEffect(() => {
    let cancelled = false;
    fetchPublicBlogPosts().then(({ data, error }) => {
      if (!cancelled && !error) {
        console.log("Blog posts loaded:", data);
        data?.forEach(post => {
          if (post.imageUrl) {
            console.log(`Post ${post.id} image URL:`, post.imageUrl);
          }
        });
        setPosts(data ?? []);
      }
      setLoading(false);
    });
    return () => { cancelled = true; };
  }, []);

  const categories = ["전체", ...Array.from(new Set(posts.map((p) => p.category)))];
  const filtered = category === "전체" ? posts : posts.filter((p) => p.category === category);

  return (
    <Layout>
      <section className="bg-primary py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <p className="text-blue-highlight text-sm font-medium tracking-widest uppercase mb-4 font-display">Blog</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">블로그</h1>
          <p className="text-primary-foreground/60 max-w-2xl leading-relaxed">데이터와 AI에 대한 전문적인 인사이트와 산업 트렌드를 공유합니다.</p>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  category === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-border"
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
            <p className="text-center text-muted-foreground py-16">등록된 글이 없습니다.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group border border-border rounded-lg overflow-hidden hover:border-blue-highlight/30 hover:shadow-lg hover:shadow-blue-highlight/5 transition-all"
                >
                  <div className="aspect-[3/2] overflow-hidden bg-muted">
                    {post.imageUrl ? (
                      <img 
                        src={post.imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          console.error("Image load failed:", post.imageUrl);
                          console.error("Error details:", e);
                          // 이미지 로드 실패 시 placeholder 표시
                          const target = e.currentTarget;
                          target.style.display = "none";
                          const placeholder = target.nextElementSibling as HTMLElement;
                          if (placeholder && placeholder.classList.contains("image-placeholder")) {
                            placeholder.style.display = "flex";
                          }
                        }}
                        onLoad={() => {
                          console.log("Image loaded successfully:", post.imageUrl);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">No image</div>
                    )}
                    {post.imageUrl && (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm image-placeholder" style={{ display: "none" }}>
                        이미지를 불러올 수 없습니다
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">{post.category}</span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-blue-highlight transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{post.summary}</p>
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

export default Blog;
