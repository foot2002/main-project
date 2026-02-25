-- Portfolio table for admin-managed portfolio items (Supabase)
-- Run this in Supabase Dashboard > SQL Editor
-- This table stores portfolio items with categories: PUBLIC, ENTERPRISE, EDUCATION, ETC

-- Table: portfolio
-- Columns match admin UI: title, content, category, image, author, written_date, status
-- 필드 구조:
--   제목: 필수(Not Null) / 문자
--   내용: 필수(Not Null) / 문자
--   이미지: 필수(Not Null) / 파일 - 경로 (storage)
--   분류: 필수(Not Null) (공공/기업/교육/기타)
--   작성일: 선택(Null 허용) / 문자(date)
--   작성자: 선택(Null 허용) / 문자
CREATE TABLE IF NOT EXISTS public.portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('PUBLIC', 'ENTERPRISE', 'EDUCATION', 'ETC')),
  image_url TEXT NOT NULL,
  author TEXT,
  written_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published'))
);

-- Indexes for efficient querying
-- Index for listing by created_at (newest first)
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON public.portfolio (created_at DESC);

-- Index for filtering by status
CREATE INDEX IF NOT EXISTS idx_portfolio_status ON public.portfolio (status);

-- Index for filtering by category
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON public.portfolio (category);

-- Index for sorting by written_date
CREATE INDEX IF NOT EXISTS idx_portfolio_written_date ON public.portfolio (written_date DESC NULLS LAST);

-- Composite index for common queries (status + created_at)
CREATE INDEX IF NOT EXISTS idx_portfolio_status_created_at ON public.portfolio (status, created_at DESC);

-- Trigger function to auto-update updated_at on row change
-- (Reuse the existing function if it already exists, otherwise create it)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at automatically
DROP TRIGGER IF EXISTS portfolio_updated_at ON public.portfolio;
CREATE TRIGGER portfolio_updated_at
  BEFORE UPDATE ON public.portfolio
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous access for admin frontend
-- Note: In production, you may want to restrict this to authenticated users only
-- or use service_role key for write operations
CREATE POLICY "Allow anon full access to portfolio"
  ON public.portfolio
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Optional: Policy for authenticated users (if you want to restrict later)
-- CREATE POLICY "Allow authenticated users full access to portfolio"
--   ON public.portfolio
--   FOR ALL
--   TO authenticated
--   USING (true)
--   WITH CHECK (true);

-- Table comments for documentation
COMMENT ON TABLE public.portfolio IS 'Admin-managed portfolio items; image_url is Supabase Storage URL after upload.';
COMMENT ON COLUMN public.portfolio.id IS 'Unique identifier (UUID)';
COMMENT ON COLUMN public.portfolio.title IS 'Portfolio item title (required)';
COMMENT ON COLUMN public.portfolio.content IS 'Portfolio item content/description (required)';
COMMENT ON COLUMN public.portfolio.category IS 'Portfolio category: PUBLIC, ENTERPRISE, EDUCATION, or ETC';
COMMENT ON COLUMN public.portfolio.image_url IS 'URL to the portfolio image stored in Supabase Storage (required)';
COMMENT ON COLUMN public.portfolio.author IS 'Author name (optional)';
COMMENT ON COLUMN public.portfolio.written_date IS 'Date when the portfolio item was written/created (optional)';
COMMENT ON COLUMN public.portfolio.created_at IS 'Timestamp when the record was created in the database';
COMMENT ON COLUMN public.portfolio.updated_at IS 'Timestamp when the record was last updated (auto-updated by trigger)';
COMMENT ON COLUMN public.portfolio.status IS 'Publication status: draft or published';

-- Storage bucket setup instructions:
-- After running this migration, create a Storage bucket in Supabase Dashboard:
-- 1. Go to Storage > Create bucket
-- 2. Name: "portfolio-images"
-- 3. Set to Public (if you want public access to images)
-- 4. Optionally set up policies for the bucket

-- ============================================
-- 기존 테이블이 있는 경우 image_url을 NOT NULL로 변경
-- ============================================
-- 주의: 기존에 image_url이 NULL인 레코드가 있다면 먼저 업데이트해야 합니다.
-- ALTER TABLE public.portfolio ALTER COLUMN image_url SET NOT NULL;
