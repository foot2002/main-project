import { supabase } from "@/lib/supabase";
import type { Press, PressFormPayload, PressSortType } from "@/types/admin-press";

function rowToPress(row: {
  id: string;
  title: string;
  source: string;
  link_url: string;
  date: string | null;
  created_at: string;
  is_pinned?: boolean | null;
  display_order?: number | null;
  is_visible?: boolean | null;
}): Press {
  return {
    id: row.id,
    title: row.title,
    source: row.source,
    linkUrl: row.link_url,
    date: row.date ?? undefined,
    createdAt: row.created_at,
    isPinned: row.is_pinned ?? false,
    displayOrder: row.display_order ?? 0,
    isVisible: row.is_visible ?? true, // 기존 데이터는 기본적으로 노출
  };
}

export async function fetchPressList(sortType: PressSortType = "default"): Promise<{ data: Press[]; error: Error | null }> {
  // 먼저 새 컬럼 포함하여 시도
  let query = supabase
    .from("press")
    .select("id, title, source, link_url, date, created_at, is_pinned, display_order, is_visible");
  
  // Apply sorting based on sortType
  switch (sortType) {
    case "default":
      // Default strategy: is_pinned DESC, display_order ASC, date DESC, created_at DESC
      query = query
        .order("is_pinned", { ascending: false, nullsFirst: false })
        .order("display_order", { ascending: true, nullsFirst: true })
        .order("date", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      break;
    case "latest":
      query = query.order("date", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false });
      break;
    case "created":
      query = query.order("created_at", { ascending: false });
      break;
    case "manual":
      query = query
        .order("is_pinned", { ascending: false, nullsFirst: false })
        .order("display_order", { ascending: true, nullsFirst: true });
      break;
  }

  let { data: rows, error } = await query;
  
  // 새 컬럼이 없어서 에러가 발생하면 기본 컬럼만으로 재시도
  if (error && error.message.includes("does not exist")) {
    query = supabase
      .from("press")
      .select("id, title, source, link_url, date, created_at");
    
    switch (sortType) {
      case "default":
      case "latest":
        query = query.order("date", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false });
        break;
      case "created":
        query = query.order("created_at", { ascending: false });
        break;
      case "manual":
        query = query.order("created_at", { ascending: false });
        break;
    }
    
    const result = await query;
    rows = result.data;
    error = result.error;
  }
  
  if (error) return { data: [], error: new Error(error.message) };
  
  // 클라이언트에서 필터링 및 정렬 보정 (NULL 값 처리)
  // is_visible이 null이거나 true인 경우만 표시 (기존 데이터는 기본적으로 노출)
  let filteredRows = (rows ?? []).filter((row) => {
    // 새 컬럼이 없으면 기본적으로 표시
    if (!("is_visible" in row)) return true;
    return row.is_visible === null || row.is_visible === true;
  });
  
  let sortedRows = filteredRows;
  if (sortType === "default" && filteredRows.length > 0) {
    sortedRows = [...filteredRows].sort((a, b) => {
      // is_pinned: true > false > null (컬럼이 없으면 false로 처리)
      const aPinned = "is_pinned" in a ? (a.is_pinned ?? false) : false;
      const bPinned = "is_pinned" in b ? (b.is_pinned ?? false) : false;
      if (aPinned !== bPinned) return bPinned ? 1 : -1;
      
      // display_order: null/0은 마지막 (컬럼이 없으면 0으로 처리)
      const aOrder = "display_order" in a ? (a.display_order ?? 999999) : 999999;
      const bOrder = "display_order" in b ? (b.display_order ?? 999999) : 999999;
      if (aOrder !== bOrder) return aOrder - bOrder;
      
      // date: null은 마지막
      if (a.date && b.date) {
        const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateCompare !== 0) return dateCompare;
      } else if (a.date) return -1;
      else if (b.date) return 1;
      
      // created_at
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }
  
  return { data: sortedRows.map(rowToPress), error: null };
}

export async function fetchPressById(id: string): Promise<{ data: Press | null; error: Error | null }> {
  // 먼저 새 컬럼 포함하여 시도
  let { data: row, error } = await supabase
    .from("press")
    .select("id, title, source, link_url, date, created_at, is_pinned, display_order, is_visible")
    .eq("id", id)
    .single();
  
  // 새 컬럼이 없어서 에러가 발생하면 기본 컬럼만으로 재시도
  if (error && error.message.includes("does not exist")) {
    const result = await supabase
      .from("press")
      .select("id, title, source, link_url, date, created_at")
      .eq("id", id)
      .single();
    row = result.data;
    error = result.error;
  }
  
  if (error) return { data: null, error: new Error(error.message) };
  if (!row) return { data: null, error: null };
  return { data: rowToPress(row), error: null };
}

export async function createPress(
  payload: PressFormPayload
): Promise<{ data: Press | null; error: Error | null }> {
  // 링크 유효성 검사
  if (!payload.linkUrl.startsWith("http://") && !payload.linkUrl.startsWith("https://")) {
    return { data: null, error: new Error("링크는 http:// 또는 https://로 시작해야 합니다.") };
  }

  // 먼저 새 컬럼 포함하여 시도
  let insertData: any = {
    title: payload.title,
    source: payload.source,
    link_url: payload.linkUrl,
    date: payload.date || null,
  };
  
  // 새 컬럼 추가 시도
  try {
    insertData.is_pinned = payload.isPinned;
    insertData.display_order = payload.displayOrder;
    insertData.is_visible = payload.isVisible;
  } catch (e) {
    // 컬럼이 없으면 기본값만 사용
  }

  let { data: insertRow, error: insertError } = await supabase
    .from("press")
    .insert(insertData)
    .select("id, title, source, link_url, date, created_at, is_pinned, display_order, is_visible")
    .single();
  
  // 새 컬럼이 없어서 에러가 발생하면 기본 컬럼만으로 재시도
  if (insertError && insertError.message.includes("does not exist")) {
    const result = await supabase
      .from("press")
      .insert({
        title: payload.title,
        source: payload.source,
        link_url: payload.linkUrl,
        date: payload.date || null,
      })
      .select("id, title, source, link_url, date, created_at")
      .single();
    insertRow = result.data;
    insertError = result.error;
  }
  
  if (insertError) return { data: null, error: new Error(insertError.message) };
  return { data: rowToPress(insertRow), error: null };
}

export async function updatePress(
  id: string,
  payload: PressFormPayload
): Promise<{ data: Press | null; error: Error | null }> {
  // 링크 유효성 검사
  if (!payload.linkUrl.startsWith("http://") && !payload.linkUrl.startsWith("https://")) {
    return { data: null, error: new Error("링크는 http:// 또는 https://로 시작해야 합니다.") };
  }

  // 먼저 새 컬럼 포함하여 시도
  let updateData: any = {
    title: payload.title,
    source: payload.source,
    link_url: payload.linkUrl,
    date: payload.date || null,
  };
  
  // 새 컬럼 추가 시도
  try {
    updateData.is_pinned = payload.isPinned;
    updateData.display_order = payload.displayOrder;
    updateData.is_visible = payload.isVisible;
  } catch (e) {
    // 컬럼이 없으면 기본값만 사용
  }

  let { data: row, error } = await supabase
    .from("press")
    .update(updateData)
    .eq("id", id)
    .select("id, title, source, link_url, date, created_at, is_pinned, display_order, is_visible")
    .single();
  
  // 새 컬럼이 없어서 에러가 발생하면 기본 컬럼만으로 재시도
  if (error && error.message.includes("does not exist")) {
    const result = await supabase
      .from("press")
      .update({
        title: payload.title,
        source: payload.source,
        link_url: payload.linkUrl,
        date: payload.date || null,
      })
      .eq("id", id)
      .select("id, title, source, link_url, date, created_at")
      .single();
    row = result.data;
    error = result.error;
  }
  
  if (error) return { data: null, error: new Error(error.message) };
  return { data: rowToPress(row), error: null };
}

// Admin: Fetch all press items (including invisible ones)
export async function fetchPressListAdmin(sortType: PressSortType = "default"): Promise<{ data: Press[]; error: Error | null }> {
  // 먼저 새 컬럼 포함하여 시도
  let query = supabase
    .from("press")
    .select("id, title, source, link_url, date, created_at, is_pinned, display_order, is_visible");

  // Apply sorting based on sortType
  switch (sortType) {
    case "default":
      query = query
        .order("is_pinned", { ascending: false, nullsFirst: false })
        .order("display_order", { ascending: true, nullsFirst: true })
        .order("date", { ascending: false, nullsFirst: false })
        .order("created_at", { ascending: false });
      break;
    case "latest":
      query = query.order("date", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false });
      break;
    case "created":
      query = query.order("created_at", { ascending: false });
      break;
    case "manual":
      query = query
        .order("is_pinned", { ascending: false, nullsFirst: false })
        .order("display_order", { ascending: true, nullsFirst: true });
      break;
  }

  let { data: rows, error } = await query;
  
  // 새 컬럼이 없어서 에러가 발생하면 기본 컬럼만으로 재시도
  if (error && error.message.includes("does not exist")) {
    query = supabase
      .from("press")
      .select("id, title, source, link_url, date, created_at");
    
    switch (sortType) {
      case "default":
      case "latest":
        query = query.order("date", { ascending: false, nullsFirst: false }).order("created_at", { ascending: false });
        break;
      case "created":
        query = query.order("created_at", { ascending: false });
        break;
      case "manual":
        query = query.order("created_at", { ascending: false });
        break;
    }
    
    const result = await query;
    rows = result.data;
    error = result.error;
  }
  
  if (error) return { data: [], error: new Error(error.message) };
  
  // 클라이언트에서 정렬 보정 (NULL 값 처리)
  let sortedRows = rows ?? [];
  if (sortType === "default" && rows) {
    sortedRows = [...rows].sort((a, b) => {
      // is_pinned: true > false > null (컬럼이 없으면 false로 처리)
      const aPinned = "is_pinned" in a ? (a.is_pinned ?? false) : false;
      const bPinned = "is_pinned" in b ? (b.is_pinned ?? false) : false;
      if (aPinned !== bPinned) return bPinned ? 1 : -1;
      
      // display_order: null/0은 마지막 (컬럼이 없으면 0으로 처리)
      const aOrder = "display_order" in a ? (a.display_order ?? 999999) : 999999;
      const bOrder = "display_order" in b ? (b.display_order ?? 999999) : 999999;
      if (aOrder !== bOrder) return aOrder - bOrder;
      
      // date: null은 마지막
      if (a.date && b.date) {
        const dateCompare = new Date(b.date).getTime() - new Date(a.date).getTime();
        if (dateCompare !== 0) return dateCompare;
      } else if (a.date) return -1;
      else if (b.date) return 1;
      
      // created_at
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }
  
  return { data: sortedRows.map(rowToPress), error: null };
}

export async function deletePress(id: string): Promise<{ error: Error | null }> {
  const { error } = await supabase.from("press").delete().eq("id", id);
  return { error: error ? new Error(error.message) : null };
}
