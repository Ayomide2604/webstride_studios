import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { messageData } = await req.json()
    
    // Get environment variables
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const YOUR_EMAIL = Deno.env.get('YOUR_EMAIL')
    
    if (!RESEND_API_KEY || !YOUR_EMAIL) {
      throw new Error('Missing environment variables')
    }

    // Send email using Resend API
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@yourdomain.com',
        to: YOUR_EMAIL,
        subject: `New Contact Message from ${messageData.name}`,
        html: `
          <h2>New Contact Message</h2>
          <p><strong>Name:</strong> ${messageData.name}</p>
          <p><strong>Email:</strong> ${messageData.email}</p>
          <p><strong>Phone:</strong> ${messageData.phone || 'Not provided'}</p>
          <p><strong>Company:</strong> ${messageData.company || 'Not provided'}</p>
          <hr>
          <h3>Message:</h3>
          <p>${messageData.message}</p>
          <hr>
          <p><small>Received on: ${new Date().toLocaleString()}</small></p>
        `,
      }),
    })

    if (!emailResponse.ok) {
      throw new Error('Failed to send email')
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
