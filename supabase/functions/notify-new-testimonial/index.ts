import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface TestimonialData {
  id: string
  name: string
  role: string
  company?: string
  quote: string
  email?: string
  status: string
  avatar: string
  created_at: string
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { record }: { record: TestimonialData } = await req.json()
    
    if (!record) {
      throw new Error('No testimonial data provided')
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // Get admin email from environment or use default
    const adminEmail = Deno.env.get('ADMIN_EMAIL') || 'admin@webstudestudios.com'
    const websiteUrl = Deno.env.get('WEBSITE_URL') || 'https://yourwebsite.com'

    // Create email content
    const emailSubject = '🎉 New Testimonial Submission - Action Required'
    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Testimonial Submission</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #007bff; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .testimonial { background: white; padding: 15px; border-left: 4px solid #007bff; margin: 15px 0; }
          .button { display: inline-block; background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Testimonial Submission!</h1>
          </div>
          
          <div class="content">
            <p>A new testimonial has been submitted and is awaiting your approval:</p>
            
            <div class="testimonial">
              <h3>${record.name}</h3>
              <p><strong>Role:</strong> ${record.role}</p>
              ${record.company ? `<p><strong>Company:</strong> ${record.company}</p>` : ''}
              ${record.email ? `<p><strong>Email:</strong> ${record.email}</p>` : ''}
              <p><strong>Quote:</strong></p>
              <blockquote style="font-style: italic; border-left: 3px solid #ddd; padding-left: 15px;">
                "${record.quote}"
              </blockquote>
              <p><small>Submitted: ${new Date(record.created_at).toLocaleString()}</small></p>
            </div>
            
            <div style="text-align: center;">
              <a href="${websiteUrl}/admin/testimonials" class="button">
                👉 Login to Review & Approve
              </a>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              This testimonial is currently set to <strong>"pending"</strong> status and will not appear on the public website until you approve it.
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from your website's testimonial system.</p>
            <p>If you don't want to receive these emails, please update your notification settings.</p>
          </div>
        </div>
      </body>
      </html>
    `

    // Send email using Supabase's built-in email service
    // Note: You'll need to configure email settings in your Supabase project
    const { error: emailError } = await supabase.auth.admin.updateUserById(
      '00000000-0000-0000-0000-000000000000', // This would be your admin user ID
      { 
        email: adminEmail,
        data: { 
          notification_subject: emailSubject,
          notification_html: emailHtml
        }
      }
    )

    // Alternative: Use Resend if you have it configured
    // Uncomment and configure if you prefer Resend
    /*
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    if (resendApiKey) {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@yourcompany.com',
          to: [adminEmail],
          subject: emailSubject,
          html: emailHtml,
        }),
      })
      
      if (!resendResponse.ok) {
        throw new Error('Failed to send email via Resend')
      }
    }
    */

    console.log('Testimonial notification sent for:', record.id)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Notification sent successfully',
        testimonialId: record.id 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error sending notification:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
