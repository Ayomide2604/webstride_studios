import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		const { messageData } = await request.json();

		// Get environment variables
		const RESEND_API_KEY = process.env.RESEND_API_KEY;
		const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

		if (!RESEND_API_KEY) {
			return NextResponse.json(
				{ error: "RESEND_API_KEY not configured" },
				{ status: 500 },
			);
		}

		if (!ADMIN_EMAIL) {
			return NextResponse.json(
				{ error: "ADMIN_EMAIL not configured" },
				{ status: 500 },
			);
		}

		const emailPayload = {
			from: "onboarding@resend.dev",
			to: ADMIN_EMAIL,
			subject: `New Contact Message from ${messageData.name}`,
			html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${messageData.name}</p>
        <p><strong>Email:</strong> ${messageData.email}</p>
        <p><strong>Phone:</strong> ${messageData.phone || "Not provided"}</p>
        <p><strong>Company:</strong> ${messageData.company || "Not provided"}</p>
        <hr>
        <h3>Message:</h3>
        <p>${messageData.message}</p>
        <hr>
        <p><small>Received on: ${new Date().toLocaleString()}</small></p>
      `,
		};

		// Send email using Resend API
		const emailResponse = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${RESEND_API_KEY}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(emailPayload),
		});

		const responseText = await emailResponse.text();

		if (!emailResponse.ok) {
			return NextResponse.json({
				error: "Failed to send email",
				details: responseText,
			});
		}

		const responseData = JSON.parse(responseText);

		return NextResponse.json({
			success: true,
			message: "Email sent successfully",
			data: responseData,
		});
	} catch (error: any) {
		return NextResponse.json(
			{
				error: "Internal server error",
				details: error?.message || "Unknown error",
			},
			{ status: 500 },
		);
	}
}
