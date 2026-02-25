-- Storage bucket policies for blog-images
-- 
-- ⚠️ IMPORTANT: Storage policies cannot be created via SQL Editor.
-- You must set them up manually in the Supabase Dashboard.
--
-- SETUP INSTRUCTIONS:
-- 1. Go to Supabase Dashboard > Storage > blog-images bucket
-- 2. Click on the "Policies" tab
-- 3. Click "New Policy" and create the following 4 policies:
--
-- ============================================
-- 정책 1: INSERT (업로드 허용)
-- ============================================
-- Policy name: Allow anon upload to blog-images
-- Allowed operation: INSERT
-- Target roles: anon
-- 
-- WITH CHECK 필드에 아래 내용 복사:
(bucket_id = 'blog-images')

-- ============================================
-- 정책 2: SELECT (읽기 허용)
-- ============================================
-- Policy name: Allow anon read from blog-images
-- Allowed operation: SELECT
-- Target roles: anon
--
-- USING 필드에 아래 내용 복사:
(bucket_id = 'blog-images')

-- ============================================
-- 정책 3: UPDATE (수정 허용)
-- ============================================
-- Policy name: Allow anon update blog-images
-- Allowed operation: UPDATE
-- Target roles: anon
--
-- USING 필드에 아래 내용 복사:
(bucket_id = 'blog-images')
--
-- WITH CHECK 필드에 아래 내용 복사:
(bucket_id = 'blog-images')

-- ============================================
-- 정책 4: DELETE (삭제 허용)
-- ============================================
-- Policy name: Allow anon delete from blog-images
-- Allowed operation: DELETE
-- Target roles: anon
--
-- USING 필드에 아래 내용 복사:
(bucket_id = 'blog-images')

-- ============================================
-- 빠른 복사용 (위에서 복사하기 어려울 경우)
-- ============================================

-- 정책 1 - WITH CHECK:
(bucket_id = 'blog-images')

-- 정책 2 - USING:
(bucket_id = 'blog-images')

-- 정책 3 - USING:
(bucket_id = 'blog-images')

-- 정책 3 - WITH CHECK:
(bucket_id = 'blog-images')

-- 정책 4 - USING:
(bucket_id = 'blog-images')
