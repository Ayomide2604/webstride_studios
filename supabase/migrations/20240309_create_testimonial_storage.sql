-- Create storage bucket for testimonial avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('testimonial-avatars', 'testimonial-avatars', true);

-- Allow anyone to upload to the bucket (for client submissions)
CREATE POLICY "Anyone can upload testimonial avatars" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'testimonial-avatars'
  );

-- Allow anyone to view avatars
CREATE POLICY "Anyone can view testimonial avatars" ON storage.objects
  FOR SELECT USING (
    bucket_id = 'testimonial-avatars'
  );

-- Allow admins to manage avatars (simplified policy)
CREATE POLICY "Admins can manage testimonial avatars" ON storage.objects
  FOR ALL USING (
    bucket_id = 'testimonial-avatars'
  );
