import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import { ArrowLeft, Loader2 } from "lucide-react";
import { fetchNoticeById } from "@/lib/notice-api";
import type { Notice } from "@/types/admin-notice";

const formatDate = (dateString?: string): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
};

const SupportNoticeDetail = () => {
  const { id } = useParams();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNotice = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const { data, error } = await fetchNoticeById(id);
      if (error) {
        console.error("Failed to load notice:", error);
        setNotice(null);
      } else {
        setNotice(data);
      }
      setLoading(false);
    };
    loadNotice();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground mx-auto" />
        </div>
      </Layout>
    );
  }

  if (!notice) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-32 text-center">
          <p className="text-muted-foreground mb-4">공지사항을 찾을 수 없습니다.</p>
          <Link to="/support/notice" className="text-blue-highlight text-sm font-semibold hover:underline">공지사항으로 돌아가기</Link>
        </div>
      </Layout>
    );
  }

  const displayDate = notice.date ? formatDate(notice.date) : formatDate(notice.createdAt);

  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <Link to="/support/notice" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
            <ArrowLeft size={14} /> 공지사항
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{notice.category}</span>
            <span className="text-sm text-muted-foreground">{displayDate}</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary mb-10">{notice.title}</h1>

          <div className="prose prose-sm max-w-none">
            {notice.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-4 whitespace-pre-line">{para}</p>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SupportNoticeDetail;
