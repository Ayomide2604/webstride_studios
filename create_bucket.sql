-- Create storage bucket for testimonial avatars
INSERT INTO storage.buckets (id, name, public) 
VALUES ('testimonial-avatars', 'testimonial-avatars', true)
ON CONFLICT (id) DO NOTHING;
