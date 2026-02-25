-- Blog table for admin-created posts (Supabase)
-- Run this in Supabase Dashboard > SQL Editor

-- Table: blog
-- Columns match admin UI: title, content, category, image, author, dates, status
CREATE TABLE IF NOT EXISTS public.blog (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('DATA', 'AI', 'EDU', 'POLICY', 'INDUSTRY', 'ENTERPRISE', 'ETC')),
  image_url TEXT,
  author TEXT,
  published_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published'))
);

-- Index for listing by created_at (newest first) and by status
CREATE INDEX IF NOT EXISTS idx_blog_created_at ON public.blog (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_status ON public.blog (status);
CREATE INDEX IF NOT EXISTS idx_blog_published_date ON public.blog (published_date DESC NULLS LAST);

-- Optional: trigger to auto-update updated_at on row change
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS blog_updated_at ON public.blog;
CREATE TRIGGER blog_updated_at
  BEFORE UPDATE ON public.blog
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security (RLS)
ALTER TABLE public.blog ENABLE ROW LEVEL SECURITY;

-- Policy: allow anon to do all (admin frontend uses anon key).
-- Restrict later (e.g. SELECT only for anon, use service_role for write).
CREATE POLICY "Allow anon full access to blog"
  ON public.blog
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

COMMENT ON TABLE public.blog IS 'Admin-managed blog posts; image_url is Supabase Storage URL after upload.';

-- For blog image uploads: in Supabase Dashboard > Storage create a bucket named "blog-images" and set it to Public.
