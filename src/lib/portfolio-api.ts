import { supabase } from "@/lib/supabase";
import type { PortfolioItem, PortfolioFormPayload } from "@/types/admin-portfolio";

const BUCKET = "portfolio-images";

function rowToItem(row: {
  id: string;
  title: string;
  content: string;
  category: string;
  image_url: string | null;
  author: string | null;
  written_date: string | null;
  created_at: string;
  status: string;
}): PortfolioItem {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category,
    imageDisplay: row.image_url ?? "",
    author: row.author ?? undefined,
    writtenDate: row.written_date ?? undefined,
    createdAt: row.created_at,
    status: row.status as PortfolioItem["status"],
  };
}

/** Upload image to Storage and return public URL. Returns null if upload fails (e.g. bucket missing). */
export async function uploadPortfolioImage(file: File, itemId: string): Promise<string | null> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${itemId}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: "3600",
    upsert: true,
  });
  if (error) {
    console.warn("Portfolio image upload failed:", error.message);
    return null;
  }
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const publicUrl = data.publicUrl;
  console.log("Portfolio image uploaded, public URL:", publicUrl);
  return publicUrl;
}

export async function fetchPortfolioItems(): Promise<{ data: PortfolioItem[]; error: Error | null }> {
  const { data: rows, error } = await supabase
    .from("portfolio")
    .select("id, title, content, category, image_url, author, written_date, created_at, status")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: new Error(error.message) };
  return { data: (rows ?? []).map(rowToItem), error: null };
}

export async function createPortfolioItem(
  payload: PortfolioFormPayload
): Promise<{ data: PortfolioItem | null; error: Error | null }> {
  // 이미지가 필수이므로 먼저 확인
  if (!payload.imageFile) {
    return { data: null, error: new Error("이미지는 필수입니다.") };
  }

  // 임시 UUID 생성 (이미지 업로드 경로에 사용)
  const tempId = crypto.randomUUID();
  
  // 이미지 먼저 업로드
  const imageUrl = await uploadPortfolioImage(payload.imageFile, tempId);
  if (!imageUrl) {
    return { data: null, error: new Error("이미지 업로드에 실패했습니다.") };
  }

  // 이미지 URL과 함께 데이터 insert
  const { data: insertRow, error: insertError } = await supabase
    .from("portfolio")
    .insert({
      title: payload.title,
      content: payload.content,
      category: payload.category,
      image_url: imageUrl,
      author: payload.author || null,
      written_date: payload.writtenDate || null,
      status: payload.status,
    })
    .select("id, title, content, category, image_url, author, written_date, created_at, status")
    .single();

  if (insertError) {
    return { data: null, error: new Error(insertError.message) };
  }

  // 실제 ID로 이미지 경로 변경 (깔끔하게 관리하기 위해)
  if (insertRow && tempId !== insertRow.id) {
    const ext = payload.imageFile.name.split(".").pop() || "jpg";
    const timestamp = Date.now();
    
    // 업로드된 파일 찾기
    const { data: listData } = await supabase.storage.from(BUCKET).list(tempId);
    if (listData && listData.length > 0) {
      const fileName = listData[0].name;
      const newPath = `${insertRow.id}/${fileName}`;
      
      // 파일 이동
      const { error: moveError } = await supabase.storage
        .from(BUCKET)
        .move(`${tempId}/${fileName}`, newPath);
      
      if (!moveError) {
        const { data: newUrlData } = supabase.storage.from(BUCKET).getPublicUrl(newPath);
        const newImageUrl = newUrlData.publicUrl;
        await supabase.from("portfolio").update({ image_url: newImageUrl }).eq("id", insertRow.id);
        return { data: rowToItem({ ...insertRow, image_url: newImageUrl }), error: null };
      }
    }
  }

  return { data: rowToItem(insertRow), error: null };
}

export async function updatePortfolioItem(
  id: string,
  payload: PortfolioFormPayload,
  currentImageUrl: string
): Promise<{ data: PortfolioItem | null; error: Error | null }> {
  let imageUrl: string | null = currentImageUrl || null;
  if (payload.imageFile) {
    const uploaded = await uploadPortfolioImage(payload.imageFile, id);
    if (uploaded) imageUrl = uploaded;
  }
  const { data: row, error } = await supabase
    .from("portfolio")
    .update({
      title: payload.title,
      content: payload.content,
      category: payload.category,
      image_url: imageUrl,
      author: payload.author || null,
      written_date: payload.writtenDate || null,
      status: payload.status,
    })
    .eq("id", id)
    .select("id, title, content, category, image_url, author, written_date, created_at, status")
    .single();
  if (error) return { data: null, error: new Error(error.message) };
  return { data: rowToItem(row), error: null };
}

export async function deletePortfolioItem(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.from("portfolio").delete().eq("id", id);
  return { error: error ? new Error(error.message) : null };
}

/** Public: published portfolio items only for /portfolio list */
export interface PublicPortfolioListItem {
  id: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  imageUrl: string | null;
}

export async function fetchPublicPortfolioItems(): Promise<{
  data: PublicPortfolioListItem[];
  error: Error | null;
}> {
  const { data: rows, error } = await supabase
    .from("portfolio")
    .select("id, title, content, category, image_url, written_date, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: new Error(error.message) };
  const items: PublicPortfolioListItem[] = (rows ?? []).map((row) => {
    const dateStr = row.written_date ?? row.created_at;
    const date = dateStr
      ? new Date(dateStr).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\s/g, "").replace(/\.$/, "")
      : "";
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

/** Public: single published portfolio item for /portfolio/:id */
export interface PublicPortfolioItem {
  id: string;
  title: string;
  category: string;
  date: string;
  content: string;
  summary: string;
  imageUrl: string | null;
  author?: string;
}

export async function fetchPublicPortfolioItemById(id: string): Promise<{
  data: PublicPortfolioItem | null;
  error: Error | null;
}> {
  const { data: row, error } = await supabase
    .from("portfolio")
    .select("id, title, content, category, image_url, author, written_date, created_at")
    .eq("id", id)
    .eq("status", "published")
    .single();
  if (error || !row) return { data: null, error: error ? new Error(error.message) : null };
  const dateStr = row.written_date ?? row.created_at;
  const date = dateStr
    ? new Date(dateStr).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit", day: "2-digit" }).replace(/\s/g, "").replace(/\.$/, "")
    : "";
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
