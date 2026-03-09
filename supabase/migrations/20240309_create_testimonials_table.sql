-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  quote TEXT NOT NULL,
  avatar TEXT DEFAULT '/assets/images/avatar.jpg',
  email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_featured ON testimonials(featured);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at);

-- RLS (Row Level Security) policies
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert testimonials (for client submissions)
CREATE POLICY "Anyone can create testimonials" ON testimonials
  FOR INSERT WITH CHECK (status = 'pending');

-- Allow anyone to read approved testimonials
CREATE POLICY "Anyone can view approved testimonials" ON testimonials
  FOR SELECT USING (status = 'approved');

-- Allow admins to manage all testimonials (simplified policy)
CREATE POLICY "Admins can manage all testimonials" ON testimonials
  FOR ALL USING (
    true
  );

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