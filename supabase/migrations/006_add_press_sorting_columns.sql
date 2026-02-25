-- Add sorting columns to press table
-- Run this in Supabase Dashboard > SQL Editor

-- Add new columns
ALTER TABLE public.press 
ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_visible BOOLEAN NOT NULL DEFAULT true;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_press_is_pinned ON public.press (is_pinned DESC);
CREATE INDEX IF NOT EXISTS idx_press_display_order ON public.press (display_order ASC);
CREATE INDEX IF NOT EXISTS idx_press_is_visible ON public.press (is_visible);

-- Composite index for default sorting strategy
CREATE INDEX IF NOT EXISTS idx_press_default_sort ON public.press (is_pinned DESC, display_order ASC, date DESC NULLS LAST, created_at DESC);

-- Comments
COMMENT ON COLUMN public.press.is_pinned IS 'Whether the article is pinned to the top';
COMMENT ON COLUMN public.press.display_order IS 'Manual display order (lower numbers appear first)';
COMMENT ON COLUMN public.press.is_visible IS 'Whether the article is visible to public';
