import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { ArrowLeft, Loader2 } from "lucide-react";
import { fetchPublicBlogPostById } from "@/lib/blog-api";
import type { PublicBlogPost } from "@/lib/blog-api";

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<PublicBlogPost | null | "loading">("loading");

  useEffect(() => {
    if (!id) {
      setPost(null);
      return;
    }
    let cancelled = false;
    (async () => {
      const { data } = await fetchPublicBlogPostById(id);
      if (!cancelled) setPost(data ?? null);
    })();
    return () => { cancelled = true; };
  }, [id]);

  if (post === "loading") {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-muted-foreground mb-4">게시글을 찾을 수 없습니다.</p>
          <Link to="/blog" className="text-blue-highlight text-sm font-semibold hover:underline">블로그로 돌아가기</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-primary py-20 lg:py-28">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> 블로그
          </Link>
          <span className="text-xs px-2.5 py-1 rounded-full bg-primary-foreground/10 text-primary-foreground/80">{post.category}</span>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mt-4 mb-4">{post.title}</h1>
          <p className="text-primary-foreground/60 text-sm">{post.date}</p>
        </div>
      </section>

      {post.imageUrl && (
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl -mt-8 relative z-10 mb-10">
          <div className="rounded-lg overflow-hidden shadow-lg aspect-[16/9]">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        </div>
      )}

      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="bg-section-bg rounded-lg p-6 mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-highlight mb-2 font-display">Executive Summary</p>
            <p className="text-sm text-foreground leading-relaxed">{post.summary}</p>
          </div>

          <div className="prose prose-sm max-w-none mb-12">
            {post.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-4">{para}</p>
            ))}
          </div>

          <div className="pt-8 border-t border-border">
            <Link
              to="/blog"
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

export default BlogDetail;
