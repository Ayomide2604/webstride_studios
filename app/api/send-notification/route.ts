import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		console.log("🚀 API route called: /api/send-notification");

		const { to, subject, html } = await request.json();

		console.log("🚀 Request data:", { to, subject, htmlLength: html?.length });

		if (!to || !subject || !html) {
			console.error("❌ Missing required fields");
			return NextResponse.json(
				{ error: "Missing required fields: to, subject, html" },
				{ status: 400 },
			);
		}

		// Check environment variables
		console.log("🔧 Environment check:");
		console.log("🔧 RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
		console.log("🔧 ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
		console.log("🔧 NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);

		// Print email details to terminal
		console.log("\n" + "=".repeat(80));
		console.log("🎉 NEW TESTIMONIAL SUBMISSION NOTIFICATION 🎉");
		console.log("=".repeat(80));
		console.log("📧 TO:", to);
		console.log("📧 SUBJECT:", subject);
		console.log("📧 TIMESTAMP:", new Date().toLocaleString());
		console.log("📧 EMAIL CONTENT:");
		console.log("-".repeat(40));

		// Extract and print key info from HTML
		const nameMatch = html.match(/<h3>(.*?)<\/h3>/);
		const roleMatch = html.match(/<strong>Role:<\/strong> (.*?)<\/p>/);
		const companyMatch = html.match(/<strong>Company:<\/strong> (.*?)<\/p>/);
		const quoteMatch = html.match(
			/<blockquote[^>]*>.*?"(.*?)".*?<\/blockquote>/,
		);

		if (nameMatch) console.log("� NAME:", nameMatch[1]);
		if (roleMatch) console.log("💼 ROLE:", roleMatch[1]);
		if (companyMatch) console.log("🏢 COMPANY:", companyMatch[1]);
		if (quoteMatch) console.log("💬 QUOTE:", quoteMatch[1]);

		console.log("-".repeat(40));
		console.log(
			"🔗 ADMIN URL: Login to your website to approve this testimonial",
		);
		console.log("=".repeat(80) + "\n");

		// Option 1: Use Resend (recommended)
		if (process.env.RESEND_API_KEY) {
			const resendResponse = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					from: "noreply@yourcompany.com",
					to: [to],
					subject: subject,
					html: html,
				}),
			});

			if (!resendResponse.ok) {
				const error = await resendResponse.text();
				console.error("Resend API error:", error);
				throw new Error("Failed to send email via Resend");
			}

			console.log("✅ Email sent successfully via Resend");
			return NextResponse.json({ success: true, method: "resend" });
		}

		// Option 2: Use Nodemailer with SMTP (fallback)
		if (
			process.env.SMTP_HOST &&
			process.env.SMTP_USER &&
			process.env.SMTP_PASS
		) {
			// You would need to install nodemailer: npm install nodemailer
			console.log(
				"📧 SMTP configuration available but nodemailer not implemented",
			);
			// const nodemailer = require('nodemailer')
			// ... implement SMTP sending
		}

		// Option 3: Just log for development (current behavior)
		console.log("📧 Email logged (no email service configured)");
		console.log("📧 To set up email:");
		console.log("📧 1. Add RESEND_API_KEY to .env.local");
		console.log("📧 2. Or configure SMTP settings");

		return NextResponse.json({
			success: true,
			method: "logged",
			message: "Email logged (configure email service to send actual emails)",
			details: { to, subject },
		});
	} catch (error: any) {
		console.error("❌ Error sending notification:", error);
		return NextResponse.json(
			{ error: error.message || "Failed to send notification" },
			{ status: 500 },
		);
	}
}
