import { createClient } from "./supabase/client";
import { Testimonial, TestimonialFormData } from "@/types/testimonial";

const supabase = createClient();

async function sendNotificationEmail(testimonial: any) {
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
							<a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://yourwebsite.com"}/admin/testimonials" class="button">
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

		// Call API route to send email
		const apiUrl = `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/send-notification`;
		const emailData = {
			to: process.env.ADMIN_EMAIL || "admin@webstudestudios.com",
			subject: emailSubject,
			html: emailHtml,
		};

		console.log("📧 Sending email to API:", apiUrl);
		console.log("📧 Email data:", {
			...emailData,
			html: emailData.html.substring(0, 100) + "...",
		});

		const response = await fetch(apiUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(emailData),
		});

		console.log("📧 API response status:", response.status);

		if (!response.ok) {
			const errorText = await response.text();
			console.error("📧 API error response:", errorText);
			throw new Error(`API responded with ${response.status}: ${errorText}`);
		}

		const responseData = await response.json();
		console.log("📧 API response data:", responseData);
		console.log("✅ Notification email sent successfully!");
	} catch (error) {
		console.error("Error sending notification email:", error);
		throw error;
	}
}

async function uploadAvatar(file: File): Promise<string> {
	try {
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

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
	try {
		const { data, error } = await supabase
			.from("testimonials")
			.select("*")
			.eq("status", "approved")
			.order("created_at", { ascending: false });

		if (error) throw error;
		return data || [];
	} catch (error) {
		console.error("Error fetching approved testimonials:", error);
		return [];
	}
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
	try {
		const { data, error } = await supabase
			.from("testimonials")
			.select("*")
			.order("created_at", { ascending: false });

		if (error) throw error;
		return data || [];
	} catch (error) {
		console.error("Error fetching all testimonials:", error);
		return [];
	}
}

export async function submitTestimonial(
	formData: TestimonialFormData,
): Promise<{ success: boolean; error?: string }> {
	try {
		let avatarUrl = "/assets/images/avatar.jpg"; // Default avatar

		// Upload avatar if provided
		if (formData.avatar) {
			avatarUrl = await uploadAvatar(formData.avatar);
		}

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

		if (error) throw error;

		// Send email notification
		console.log("📧 Attempting to send notification email...");
		console.log("📧 Testimonial data:", data);

		try {
			await sendNotificationEmail(data);
			console.log("✅ Notification email sent successfully!");
		} catch (emailError) {
			console.error("❌ Failed to send notification email:", emailError);
			console.error("❌ Email error details:", emailError.message);
			// Don't fail the submission if email fails
		}

		return { success: true };
	} catch (error: any) {
		console.error("Error submitting testimonial:", error);
		return { success: false, error: error.message };
	}
}

export async function updateTestimonialStatus(
	id: string,
	status: "approved" | "rejected" | "pending",
): Promise<{ success: boolean; error?: string }> {
	try {
		const { error } = await supabase
			.from("testimonials")
			.update({ status, updated_at: new Date().toISOString() })
			.eq("id", id);

		if (error) throw error;
		return { success: true };
	} catch (error: any) {
		console.error("Error updating testimonial status:", error);
		return { success: false, error: error.message };
	}
}

export async function updateTestimonialFeatured(
	id: string,
	featured: boolean,
): Promise<{ success: boolean; error?: string }> {
	try {
		const { error } = await supabase
			.from("testimonials")
			.update({ featured, updated_at: new Date().toISOString() })
			.eq("id", id);

		if (error) throw error;
		return { success: true };
	} catch (error: any) {
		console.error("Error updating testimonial featured status:", error);
		return { success: false, error: error.message };
	}
}

export async function deleteTestimonial(
	id: string,
): Promise<{ success: boolean; error?: string }> {
	try {
		const { error } = await supabase.from("testimonials").delete().eq("id", id);

		if (error) throw error;
		return { success: true };
	} catch (error: any) {
		console.error("Error deleting testimonial:", error);
		return { success: false, error: error.message };
	}
}
