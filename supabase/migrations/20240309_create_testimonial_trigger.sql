-- Create function to call Edge Function when new testimonial is inserted
CREATE OR REPLACE FUNCTION notify_new_testimonial()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the Edge Function with the new testimonial data
  PERFORM net.http_post(
    url := current_setting('app.supabase_url', true) || '/functions/v1/notify-new-testimonial',
    headers := jsonb_build_object(
      'Authorization', 'Bearer ' || current_setting('app.supabase_service_key', true),
      'Content-Type', 'application/json'
    ),
    body := jsonb_build_object('record', NEW)
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the insert
    RAISE WARNING 'Failed to send notification for testimonial %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that fires after INSERT on testimonials table
DROP TRIGGER IF EXISTS new_testimonial_notification_trigger ON testimonials;
CREATE TRIGGER new_testimonial_notification_trigger
AFTER INSERT ON testimonials
FOR EACH ROW
EXECUTE FUNCTION notify_new_testimonial();

-- Set configuration variables (you'll need to set these in your Supabase project settings)
-- These should be set in Supabase Dashboard → Settings → Database → Configuration
-- app.supabase_url = 'https://your-project.supabase.co'
-- app.supabase_service_key = 'your-service-role-key'
