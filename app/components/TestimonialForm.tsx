"use client";

import { useState } from "react";
import { submitTestimonial } from "@/app/actions/testimonials";
import { TestimonialFormData } from "@/types/testimonial";

interface TestimonialFormProps {
	onSuccess?: () => void;
	onCancel?: () => void;
}

export default function TestimonialForm({
	onSuccess,
	onCancel,
}: TestimonialFormProps) {
	const [formData, setFormData] = useState<TestimonialFormData>({
		name: "",
		role: "",
		company: "",
		quote: "",
		email: "",
		avatar: undefined,
	});
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const { name, value } = e.target;
		setFormData((prev: TestimonialFormData) => ({ ...prev, [name]: value }));
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			// Validate file type and size
			const validTypes = ["image/jpeg", "image/png", "image/webp"];
			const maxSize = 5 * 1024 * 1024; // 5MB

			if (!validTypes.includes(file.type)) {
				setError("Please upload a valid image file (JPG, PNG, or WebP)");
				return;
			}

			if (file.size > maxSize) {
				setError("Image size must be less than 5MB");
				return;
			}

			setFormData((prev: TestimonialFormData) => ({ ...prev, avatar: file }));

			// Create preview
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatarPreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveAvatar = () => {
		setFormData((prev: TestimonialFormData) => ({
			...prev,
			avatar: undefined,
		}));
		setAvatarPreview(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		try {
			const result = await submitTestimonial(formData);

			if (!result.success) {
				setError(
					result.error || "Failed to submit testimonial. Please try again.",
				);
				return;
			}

			setSuccess("Thank you! Your testimonial has been submitted for review.");
			console.log("✅ Testimonial submitted successfully!");

			// Reset form immediately
			setFormData({
				name: "",
				role: "",
				company: "",
				quote: "",
				email: "",
				avatar: undefined,
			});
			setAvatarPreview(null);

			if (onSuccess) {
				onSuccess();
			}
		} catch (error: any) {
			setError(
				error.message || "Failed to submit testimonial. Please try again.",
			);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="card shadow-sm">
			<div className="card-body p-4 p-lg-5">
				<h4 className="mb-4">Share Your Experience</h4>
				<div className="alert alert-info">
					<i className="bi bi-info-circle me-2"></i>
					This is a private submission form for clients we've worked with. Your
					testimonial will be reviewed before appearing on our website.
				</div>

				{error && (
					<div className="alert alert-danger" role="alert">
						{error}
					</div>
				)}

				{success && (
					<div className="alert alert-success" role="alert">
						{success}
					</div>
				)}

				<form onSubmit={handleSubmit}>
					<div className="row">
						<div className="col-md-6 mb-3">
							<label htmlFor="name" className="form-label">
								Name *
							</label>
							<input
								type="text"
								className="form-control"
								id="name"
								name="name"
								value={formData.name}
								onChange={handleInputChange}
								required
								disabled={loading}
							/>
						</div>

						<div className="col-md-6 mb-3">
							<label htmlFor="role" className="form-label">
								Role/Position *
							</label>
							<input
								type="text"
								className="form-control"
								id="role"
								name="role"
								value={formData.role}
								onChange={handleInputChange}
								required
								disabled={loading}
								placeholder="e.g., CEO, Marketing Director"
							/>
						</div>
					</div>

					{/* Avatar Upload Section */}
					<div className="mb-4">
						<label className="form-label">Profile Photo (Optional)</label>
						<div className="d-flex align-items-start gap-4">
							<div className="flex-shrink-0">
								{avatarPreview ? (
									<div className="position-relative">
										<img
											src={avatarPreview}
											alt="Avatar preview"
											className="rounded-circle"
											style={{
												width: "80px",
												height: "80px",
												objectFit: "cover",
											}}
										/>
										<button
											type="button"
											className="btn btn-sm btn-danger position-absolute top-0 start-100 translate-middle rounded-circle"
											onClick={handleRemoveAvatar}
											disabled={loading}
											style={{ width: "24px", height: "24px", padding: "0" }}
										>
											×
										</button>
									</div>
								) : (
									<div
										className="rounded-circle bg-light d-flex align-items-center justify-content-center"
										style={{ width: "80px", height: "80px" }}
									>
										<i
											className="bi bi-person text-muted"
											style={{ fontSize: "2rem" }}
										></i>
									</div>
								)}
							</div>
							<div className="flex-grow-1">
								<input
									type="file"
									className="form-control"
									id="avatar"
									accept="image/jpeg,image/png,image/webp"
									onChange={handleFileChange}
									disabled={loading}
								/>
								<small className="form-text text-muted">
									Upload a profile photo (JPG, PNG, or WebP, max 5MB). If not
									provided, a default avatar will be used.
								</small>
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-md-6 mb-3">
							<label htmlFor="company" className="form-label">
								Company
							</label>
							<input
								type="text"
								className="form-control"
								id="company"
								name="company"
								value={formData.company}
								onChange={handleInputChange}
								disabled={loading}
							/>
						</div>

						<div className="col-md-6 mb-3">
							<label htmlFor="email" className="form-label">
								Email
							</label>
							<input
								type="email"
								className="form-control"
								id="email"
								name="email"
								value={formData.email}
								onChange={handleInputChange}
								disabled={loading}
							/>
						</div>
					</div>

					<div className="mb-4">
						<label htmlFor="quote" className="form-label">
							Your Testimonial *
						</label>
						<textarea
							className="form-control"
							id="quote"
							name="quote"
							rows={4}
							value={formData.quote}
							onChange={handleInputChange}
							required
							disabled={loading}
							placeholder="Share your experience working with us..."
						/>
						<small className="form-text text-muted">
							Please be specific about results, improvements, or experiences
							you'd like to share.
						</small>
					</div>

					<div className="d-flex gap-2">
						<button
							type="submit"
							className="btn btn-primary"
							disabled={loading}
						>
							{loading ? "Submitting..." : "Submit Testimonial"}
						</button>

						{onCancel && (
							<button
								type="button"
								className="btn btn-outline-secondary"
								onClick={onCancel}
								disabled={loading}
							>
								Cancel
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
