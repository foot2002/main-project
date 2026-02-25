import { supabase } from "@/lib/supabase";
import type { Notice, NoticeFormPayload } from "@/types/admin-notice";

function rowToNotice(row: {
  id: string;
  title: string;
  content: string;
  category: string;
  date: string | null;
  author: string | null;
  created_at: string;
}): Notice {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    category: row.category as Notice["category"],
    date: row.date ?? undefined,
    author: row.author ?? undefined,
    createdAt: row.created_at,
  };
}

export async function fetchNotices(): Promise<{ data: Notice[]; error: Error | null }> {
  const { data: rows, error } = await supabase
    .from("notice")
    .select("id, title, content, category, date, author, created_at")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: new Error(error.message) };
  return { data: (rows ?? []).map(rowToNotice), error: null };
}

export async function fetchNoticeById(id: string): Promise<{ data: Notice | null; error: Error | null }> {
  const { data: row, error } = await supabase
    .from("notice")
    .select("id, title, content, category, date, author, created_at")
    .eq("id", id)
    .single();
  if (error) return { data: null, error: new Error(error.message) };
  if (!row) return { data: null, error: null };
  return { data: rowToNotice(row), error: null };
}

export async function createNotice(
  payload: NoticeFormPayload
): Promise<{ data: Notice | null; error: Error | null }> {
  const { data: insertRow, error: insertError } = await supabase
    .from("notice")
    .insert({
      title: payload.title,
      content: payload.content,
      category: payload.category,
      date: payload.date || null,
      author: payload.author || null,
    })
    .select("id, title, content, category, date, author, created_at")
    .single();
  if (insertError) return { data: null, error: new Error(insertError.message) };
  return { data: rowToNotice(insertRow), error: null };
}

export async function updateNotice(
  id: string,
  payload: NoticeFormPayload
): Promise<{ data: Notice | null; error: Error | null }> {
  const { data: row, error } = await supabase
    .from("notice")
    .update({
      title: payload.title,
      content: payload.content,
      category: payload.category,
      date: payload.date || null,
      author: payload.author || null,
    })
    .eq("id", id)
    .select("id, title, content, category, date, author, created_at")
    .single();
  if (error) return { data: null, error: new Error(error.message) };
  return { data: rowToNotice(row), error: null };
}

export async function deleteNotice(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.from("notice").delete().eq("id", id);
  return { error: error ? new Error(error.message) : null };
}
