-- Inquiry table for customer inquiries (Supabase)
-- Run this in Supabase Dashboard > SQL Editor

-- Table: inquiry
-- 필드 구조:
--   이름: 필수(Not Null)
--   이메일: 필수(Not Null)
--   소속: 선택(Null 허용)
--   직급: 선택(Null 허용)
--   전화번호: 필수(Not Null)
--   문의유형: 필수(Not Null) (의뢰문의, 제휴문의, 교육문의, 구축문의, 기타)
--   문의내용: 필수(Not Null)
--   답변: 선택(Null 허용)
--   상태: 접수/답변완료

CREATE TABLE IF NOT EXISTS public.inquiry (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT,
  position TEXT,
  phone TEXT NOT NULL,
  inquiry_type TEXT NOT NULL CHECK (inquiry_type IN ('의뢰문의', '제휴문의', '교육문의', '구축문의', '기타')),
  content TEXT NOT NULL,
  reply TEXT,
  status TEXT NOT NULL DEFAULT '접수' CHECK (status IN ('접수', '답변완료')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  replied_at TIMESTAMPTZ
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_inquiry_created_at ON public.inquiry (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiry_status ON public.inquiry (status);
CREATE INDEX IF NOT EXISTS idx_inquiry_inquiry_type ON public.inquiry (inquiry_type);

-- Trigger function for auto-updating updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger
DROP TRIGGER IF EXISTS inquiry_updated_at ON public.inquiry;
CREATE TRIGGER inquiry_updated_at
  BEFORE UPDATE ON public.inquiry
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security
ALTER TABLE public.inquiry ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anonymous access for creating inquiries
CREATE POLICY "Allow anon to create inquiry"
  ON public.inquiry
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy: Allow anonymous to read their own inquiries (optional, if needed)
-- CREATE POLICY "Allow anon to read inquiry"
--   ON public.inquiry
--   FOR SELECT
--   TO anon
--   USING (true);

-- Policy: Allow anonymous to update (for admin operations via anon key)
CREATE POLICY "Allow anon full access to inquiry"
  ON public.inquiry
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true);

-- Table comments
COMMENT ON TABLE public.inquiry IS 'Customer inquiries from contact form';
COMMENT ON COLUMN public.inquiry.id IS 'Unique identifier (UUID)';
COMMENT ON COLUMN public.inquiry.name IS 'Customer name (required)';
COMMENT ON COLUMN public.inquiry.email IS 'Customer email (required)';
COMMENT ON COLUMN public.inquiry.organization IS 'Organization/company name (optional)';
COMMENT ON COLUMN public.inquiry.position IS 'Position/title (optional)';
COMMENT ON COLUMN public.inquiry.phone IS 'Phone number (required)';
COMMENT ON COLUMN public.inquiry.inquiry_type IS 'Inquiry type: 의뢰문의, 제휴문의, 교육문의, 구축문의, or 기타';
COMMENT ON COLUMN public.inquiry.content IS 'Inquiry content (required)';
COMMENT ON COLUMN public.inquiry.reply IS 'Admin reply (optional)';
COMMENT ON COLUMN public.inquiry.status IS 'Status: 접수 or 답변완료';
COMMENT ON COLUMN public.inquiry.created_at IS 'Timestamp when the inquiry was created';
COMMENT ON COLUMN public.inquiry.updated_at IS 'Timestamp when the record was last updated (auto-updated by trigger)';
COMMENT ON COLUMN public.inquiry.replied_at IS 'Timestamp when the inquiry was replied';
