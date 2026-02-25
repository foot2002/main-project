-- Notice table for admin-managed notices (Supabase)
-- Run this in Supabase Dashboard > SQL Editor

-- Table: notice
-- 필드 구조:
--   id: UUID (auto generated)
--   category: '전체공지' | '서비스' | '회사소식' | '기타' (required)
--   title: string (required)
--   content: string (required)
--   date: date (nullable)
--   author: string (nullable)
--   created_at: timestamp (auto)

CREATE TABLE IF NOT EXISTS public.notice (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('전체공지', '서비스', '회사소식', '기타')),
  date DATE,
  author TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_notice_created_at ON public.notice (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notice_category ON public.notice (category);
CREATE INDEX IF NOT EXISTS idx_notice_date ON public.notice (date DESC NULLS LAST);

-- Trigger function for auto-updating updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
DROP TRIGGER IF EXISTS notice_updated_at ON public.notice;
CREATE TRIGGER notice_updated_at
  BEFORE UPDATE ON public.notice
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security
ALTER TABLE public.notice ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous access
CREATE POLICY "Allow anon full access to notice"
  ON public.notice
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Table comments
COMMENT ON TABLE public.notice IS 'Admin-managed notices';
COMMENT ON COLUMN public.notice.id IS 'Unique identifier (UUID)';
COMMENT ON COLUMN public.notice.title IS 'Notice title (required)';
COMMENT ON COLUMN public.notice.content IS 'Notice content (required)';
COMMENT ON COLUMN public.notice.category IS 'Notice category: 전체공지, 서비스, 회사소식, or 기타';
COMMENT ON COLUMN public.notice.date IS 'Notice date (optional)';
COMMENT ON COLUMN public.notice.author IS 'Author name (optional)';
COMMENT ON COLUMN public.notice.created_at IS 'Timestamp when the record was created in the database';
COMMENT ON COLUMN public.notice.updated_at IS 'Timestamp when the record was last updated (auto-updated by trigger)';
