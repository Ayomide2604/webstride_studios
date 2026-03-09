"use server";

import { createClient } from "@/lib/supabase/server";
import { TestimonialFormData } from "@/types/testimonial";

async function sendNotificationEmail(testimonial: any) {
	const supabase = await createClient();
	try {
		// Create email content
		const emailSubject = "🎉 New Testimonial Submission - Action Required";
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
							<h3>${testimonial.name}</h3>
							<p><strong>Role:</strong> ${testimonial.role}</p>
							${testimonial.company ? `<p><strong>Company:</strong> ${testimonial.company}</p>` : ""}
							${testimonial.email ? `<p><strong>Email:</strong> ${testimonial.email}</p>` : ""}
							<p><strong>Quote:</strong></p>
							<blockquote style="font-style: italic; border-left: 3px solid #ddd; padding-left: 15px;">
								"${testimonial.quote}"
							</blockquote>
							<p><small>Submitted: ${new Date(testimonial.created_at).toLocaleString()}</small></p>
						</div>
						
						<div style="text-align: center;">
							<a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://yourwebsite.com"}/admin/dashboard" class="button">
								👉 Login to Review & Approve
							</a>
						</div>
						
						<p style="color: #666; font-size: 14px;">
							This testimonial is currently set to <strong>"pending"</strong> status and will not appear on the public website until you approve it.
						</p>
					</div>
					
					<div class="footer">
						<p>This is an automated notification from your website's testimonial system.</p>
					</div>
				</div>
			</body>
			</html>
		`;

		// Print email details to terminal
		console.log("\n" + "=".repeat(80));
		console.log("🎉 NEW TESTIMONIAL SUBMISSION NOTIFICATION 🎉");
		console.log("=".repeat(80));
		console.log(
			"📧 TO:",
			process.env.ADMIN_EMAIL || "admin@webstudestudios.com",
		);
		console.log("📧 SUBJECT:", emailSubject);
		console.log("📧 TIMESTAMP:", new Date().toLocaleString());
		console.log("📧 EMAIL CONTENT:");
		console.log("-".repeat(40));

		// Extract and print key info from HTML
		const nameMatch = emailHtml.match(/<h3>(.*?)<\/h3>/);
		const roleMatch = emailHtml.match(/<strong>Role:<\/strong> (.*?)<\/p>/);
		const companyMatch = emailHtml.match(
			/<strong>Company:<\/strong> (.*?)<\/p>/,
		);
		const quoteMatch = emailHtml.match(
			/<blockquote[^>]*>.*?"(.*?)".*?<\/blockquote>/,
		);

		if (nameMatch) console.log("👤 NAME:", nameMatch[1]);
		if (roleMatch) console.log("💼 ROLE:", roleMatch[1]);
		if (companyMatch) console.log("🏢 COMPANY:", companyMatch[1]);
		if (quoteMatch) console.log("💬 QUOTE:", quoteMatch[1]);

		console.log("-".repeat(40));
		console.log(
			"🔗 ADMIN URL: Login to your website to approve this testimonial",
		);
		console.log("=".repeat(80) + "\n");

		// Check environment variables
		console.log("🔧 Environment check:");
		console.log("🔧 RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
		console.log("🔧 ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
		console.log("🔧 NEXT_PUBLIC_SITE_URL:", process.env.NEXT_PUBLIC_SITE_URL);

		// Option 1: Use Resend (recommended)
		if (process.env.RESEND_API_KEY) {
			console.log("📧 Sending email via Resend...");

			const resendResponse = await fetch("https://api.resend.com/emails", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					from: "onboarding@resend.dev", // Use Resend's verified domain
					to: [process.env.ADMIN_EMAIL || "admin@webstudestudios.com"],
					subject: emailSubject,
					html: emailHtml,
				}),
			});

			if (!resendResponse.ok) {
				const error = await resendResponse.text();
				console.error("❌ Resend API error:", error);
				throw new Error("Failed to send email via Resend: " + error);
			}

			console.log("✅ Email sent successfully via Resend");
			return { success: true, method: "resend" };
		}

		// Option 2: Just log for development (current behavior)
		console.log("📧 Email logged (no email service configured)");
		console.log("📧 To set up email:");
		console.log("📧 1. Add RESEND_API_KEY to .env.local");
		console.log("📧 2. Or configure SMTP settings");

		return {
			success: true,
			method: "logged",
			message: "Email logged (configure email service to send actual emails)",
		};
	} catch (error: any) {
		console.error("❌ Error sending notification email:", error);
		throw error;
	}
}

async function uploadAvatar(file: File): Promise<string> {
	try {
		const supabase = await createClient();
		const fileExt = file.name.split(".").pop();
		const fileName = `${Date.now()}.${fileExt}`;
		const filePath = `avatars/${fileName}`;

		const { error: uploadError } = await supabase.storage
			.from("testimonial-avatars")
			.upload(filePath, file);

		if (uploadError) throw uploadError;

		const {
			data: { publicUrl },
		} = supabase.storage.from("testimonial-avatars").getPublicUrl(filePath);

		return publicUrl;
	} catch (error) {
		console.error("Error uploading avatar:", error);
		throw error;
	}
}

export async function submitTestimonial(
	formData: TestimonialFormData,
): Promise<{ success: boolean; error?: string }> {
	try {
		console.log("🚀 Server action: submitTestimonial called");
		console.log("🚀 Form data:", {
			...formData,
			avatar: formData.avatar?.name || "no file",
		});

		const supabase = await createClient();
		let avatarUrl = "/assets/images/avatar.jpg"; // Default avatar

		// Upload avatar if provided
		if (formData.avatar) {
			console.log("📤 Uploading avatar...");
			avatarUrl = await uploadAvatar(formData.avatar);
			console.log("✅ Avatar uploaded:", avatarUrl);
		}

		console.log("💾 Inserting testimonial into database...");
		const { data, error } = await supabase
			.from("testimonials")
			.insert({
				name: formData.name,
				role: formData.role,
				company: formData.company,
				quote: formData.quote,
				email: formData.email,
				avatar: avatarUrl,
				status: "pending",
			})
			.select()
			.single();

		if (error) {
			console.error("❌ Database error:", error);
			throw error;
		}

		console.log("✅ Testimonial saved to database:", data.id);

		// Send email notification
		console.log("📧 Attempting to send notification email...");

		try {
			await sendNotificationEmail(data);
			console.log("✅ Notification email sent successfully!");
		} catch (emailError: any) {
			console.error("❌ Failed to send notification email:", emailError);
			console.error("❌ Email error details:", emailError.message);
			// Don't fail the submission if email fails
		}

		return { success: true };
	} catch (error: any) {
		console.error("❌ Error submitting testimonial:", error);
		return { success: false, error: error.message };
	}
}
