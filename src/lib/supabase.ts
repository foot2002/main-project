import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase: VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is missing. Check your .env file.");
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

/**
 * Supabase 연결 확인 (테이블 없이 auth API로 검사).
 * 브라우저 콘솔에서 window.checkSupabase() 로 호출하거나,
 * 앱 로드 시 한 번 호출해 보세요.
 */
export async function checkSupabaseConnection(): Promise<{ ok: boolean; message: string }> {
  if (!supabaseUrl || !supabaseAnonKey) {
    return { ok: false, message: "env 누락: VITE_SUPABASE_URL 또는 VITE_SUPABASE_ANON_KEY 확인" };
  }
  try {
    const { error } = await supabase.auth.getSession();
    if (error) {
      return { ok: false, message: `연결 실패: ${error.message}` };
    }
    return { ok: true, message: "Supabase 연결 성공" };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, message: `연결 오류: ${msg}` };
  }
}
