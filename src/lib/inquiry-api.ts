import { supabase } from "@/lib/supabase";
import type { Inquiry, InquiryFormPayload, InquiryReplyPayload } from "@/types/admin-inquiry";

function rowToInquiry(row: {
  id: string;
  name: string;
  email: string;
  organization: string | null;
  position: string | null;
  phone: string;
  inquiry_type: string;
  content: string;
  reply: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  replied_at: string | null;
}): Inquiry {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    organization: row.organization ?? undefined,
    position: row.position ?? undefined,
    phone: row.phone,
    inquiryType: row.inquiry_type as Inquiry["inquiryType"],
    content: row.content,
    reply: row.reply ?? undefined,
    status: row.status as Inquiry["status"],
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    repliedAt: row.replied_at ?? undefined,
  };
}

export async function fetchInquiries(): Promise<{ data: Inquiry[]; error: Error | null }> {
  const { data: rows, error } = await supabase
    .from("inquiry")
    .select("id, name, email, organization, position, phone, inquiry_type, content, reply, status, created_at, updated_at, replied_at")
    .order("created_at", { ascending: false });
  if (error) return { data: [], error: new Error(error.message) };
  return { data: (rows ?? []).map(rowToInquiry), error: null };
}

export async function fetchInquiryById(id: string): Promise<{ data: Inquiry | null; error: Error | null }> {
  const { data: row, error } = await supabase
    .from("inquiry")
    .select("id, name, email, organization, position, phone, inquiry_type, content, reply, status, created_at, updated_at, replied_at")
    .eq("id", id)
    .single();
  if (error) return { data: null, error: new Error(error.message) };
  if (!row) return { data: null, error: null };
  return { data: rowToInquiry(row), error: null };
}

export async function createInquiry(
  payload: InquiryFormPayload
): Promise<{ data: Inquiry | null; error: Error | null }> {
  const { data: insertRow, error: insertError } = await supabase
    .from("inquiry")
    .insert({
      name: payload.name,
      email: payload.email,
      organization: payload.organization || null,
      position: payload.position || null,
      phone: payload.phone,
      inquiry_type: payload.inquiryType,
      content: payload.content,
      status: "접수",
    })
    .select("id, name, email, organization, position, phone, inquiry_type, content, reply, status, created_at, updated_at, replied_at")
    .single();
  if (insertError) return { data: null, error: new Error(insertError.message) };
  return { data: rowToInquiry(insertRow), error: null };
}

export async function updateInquiryReply(
  id: string,
  payload: InquiryReplyPayload
): Promise<{ data: Inquiry | null; error: Error | null }> {
  const updateData: any = {
    reply: payload.reply || null,
    status: payload.status,
  };
  
  // 답변완료로 변경 시 replied_at 설정
  if (payload.status === "답변완료" && payload.reply) {
    updateData.replied_at = new Date().toISOString();
  }

  const { data: row, error } = await supabase
    .from("inquiry")
    .update(updateData)
    .eq("id", id)
    .select("id, name, email, organization, position, phone, inquiry_type, content, reply, status, created_at, updated_at, replied_at")
    .single();
  if (error) return { data: null, error: new Error(error.message) };
  return { data: rowToInquiry(row), error: null };
}

export async function deleteInquiry(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.from("inquiry").delete().eq("id", id);
  return { error: error ? new Error(error.message) : null };
}
