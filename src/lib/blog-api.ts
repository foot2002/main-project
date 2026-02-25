import { supabase } from "@/lib/supabase";
import type { BlogPost, BlogFormPayload } from "@/types/admin-blog";

const BUCKET = "blog-images";

function rowToPost(row: {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url: string | null;
  author: string | null;
  published_date: string | null;
  created_at: string;
  status: string;
}): BlogPost {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
    imageDisplay: row.image_url ?? "",
    author: row.author ?? undefined,
    publishedDate: row.published_date ?? undefined,
    createdAt: row.created_at,
    status: row.status as BlogPost["status"],
  };
}

/** Upload image to Storage and return public URL. Returns null if upload fails (e.g. bucket missing). */
export async function uploadBlogImage(file: File, postId: string): Promise<string | null> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${postId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) {
    console.warn("Blog image upload failed:", error.message);
    return null;
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const publicUrl = data.publicUrl;
  console.log("Blog image uploaded, public URL:", publicUrl);
  return publicUrl;
}

export async function fetchBlogPosts(): Promise<{ data: BlogPost[]; error: Error | null }> {
  const { data: rows, error } = await supabase
    .from("blog")
    .select("id, title, content, category, image_url, author, published_date, created_at, status")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: new Error(error.message) };
  return { data: (rows ?? []).map(rowToPost), error: null };
}

export async function createBlogPost(
  payload: BlogFormPayload
): Promise<{ data: BlogPost | null; error: Error | null }> {
  const { data: insertRow, error: insertError } = await supabase
    .from("blog")
    .insert({
      title: payload.title,
      content: payload.content,
      category: payload.category,
      image_url: null,
      author: payload.author || null,
      published_date: payload.publishedDate || null,
      status: payload.status,
    })
    .select("id, title, content, category, image_url, author, published_date, created_at, status")
    .single();
  if (insertError) return { data: null, error: new Error(insertError.message) };
  let imageUrl: string | null = null;
  if (payload.imageFile && insertRow) {
    imageUrl = await uploadBlogImage(payload.imageFile, insertRow.id);
    if (imageUrl) {
      await supabase.from("blog").update({ image_url: imageUrl }).eq("id", insertRow.id);
    }
  }
  const post = rowToPost({ ...insertRow, image_url: imageUrl ?? insertRow.image_url });
  return { data: post, error: null };
}

export async function updateBlogPost(
  id: string,
  payload: BlogFormPayload,
  currentImageUrl: string
): Promise<{ data: BlogPost | null; error: Error | null }> {
  let imageUrl: string | null = currentImageUrl || null;
  if (payload.imageFile) {
    const uploaded = await uploadBlogImage(payload.imageFile, id);
    if (uploaded) imageUrl = uploaded;
  }
  const { data: row, error } = await supabase
    .from("blog")
    .update({
      title: payload.title,
      content: payload.content,
      category: payload.category,
      image_url: imageUrl,
      author: payload.author || null,
      published_date: payload.publishedDate || null,
      status: payload.status,
    })
    .eq("id", id)
    .select("id, title, content, category, image_url, author, published_date, created_at, status")
    .single();
  if (error) return { data: null, error: new Error(error.message) };
  return { data: rowToPost(row), error: null };
}

export async function deleteBlogPost(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.from("blog").delete().eq("id", id);
  return { error: error ? new Error(error.message) : null };
}

/** Public: published posts only for /blog list */
export interface PublicBlogListItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  imageUrl: string | null;
}

export async function fetchPublicBlogPosts(): Promise<{
  data: PublicBlogListItem[];
  error: Error | null;
}> {
  const { data: rows, error } = await supabase
    .from("blog")
    .select("id, title, content, category, image_url, published_date, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: new Error(error.message) };
  const items: PublicBlogListItem[] = (rows ?? []).map((row) => {
    const dateStr = row.published_date ?? row.created_at;
    const date = dateStr ? new Date(dateStr).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\s/g, "").replace(/\.$/, "") : "";
    const summary = row.content?.replace(/\n/g, " ").slice(0, 120) + (row.content?.length > 120 ? "…" : "") ?? "";
    return {
      id: row.id,
      title: row.title,
      category: row.category,
      date: date.trim(),
      summary,
      imageUrl: row.image_url ?? null,
    };
  });
  return { data: items, error: null };
}

/** Public: single published post for /blog/:id */
export interface PublicBlogPost {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
  summary: string;
  imageUrl: string | null;
  author?: string;
}

export async function fetchPublicBlogPostById(id: string): Promise<{
  data: PublicBlogPost | null;
  error: Error | null;
}> {
  const { data: row, error } = await supabase
    .from("blog")
    .select("id, title, content, category, image_url, author, published_date, created_at")
    .eq("id", id)
    .eq("status", "published")
    .single();
  if (error || !row) return { data: null, error: error ? new Error(error.message) : null };
  const dateStr = row.published_date ?? row.created_at;
  const date = dateStr ? new Date(dateStr).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\s/g, "").replace(/\.$/, "") : "";
  const content = row.content ?? "";
  const summary = content.replace(/\n/g, " ").slice(0, 200) + (content.length > 200 ? "…" : "");
  return {
    data: {
      id: row.id,
      title: row.title,
      category: row.category,
      date: date.trim(),
      content,
      summary,
      imageUrl: row.image_url ?? null,
      author: row.author ?? undefined,
    },
    error: null,
  };
}
