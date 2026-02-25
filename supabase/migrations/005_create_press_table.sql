-- Press table for admin-managed press articles (Supabase)
-- Run this in Supabase Dashboard > SQL Editor

-- Table: press
-- 필드 구조:
--   id: UUID (auto generated)
--   title: string (required)
--   source: string (required)
--   link_url: string (required)
--   date: date (nullable)
--   created_at: timestamp (auto)

CREATE TABLE IF NOT EXISTS public.press (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  link_url TEXT NOT NULL,
  date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_press_created_at ON public.press (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_press_date ON public.press (date DESC NULLS LAST);

-- Trigger function for auto-updating updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
DROP TRIGGER IF EXISTS press_updated_at ON public.press;
CREATE TRIGGER press_updated_at
  BEFORE UPDATE ON public.press
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security
ALTER TABLE public.press ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous access
CREATE POLICY "Allow anon full access to press"
  ON public.press
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Table comments
COMMENT ON TABLE public.press IS 'Admin-managed press articles';
COMMENT ON COLUMN public.press.id IS 'Unique identifier (UUID)';
COMMENT ON COLUMN public.press.title IS 'Article title (required)';
COMMENT ON COLUMN public.press.source IS 'Press source/publication name (required)';
COMMENT ON COLUMN public.press.link_url IS 'External article URL (required)';
COMMENT ON COLUMN public.press.date IS 'Article publication date (optional)';
COMMENT ON COLUMN public.press.created_at IS 'Timestamp when the record was created in the database';
COMMENT ON COLUMN public.press.updated_at IS 'Timestamp when the record was last updated (auto-updated by trigger)';
