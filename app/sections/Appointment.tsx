"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const Appointment = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		company: "",
		phone: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState("");
	const supabase = createClient();

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus("");

		try {
			const fullName = `${formData.firstName} ${formData.lastName}`;

			// Save to Supabase
			const { data, error } = await supabase
				.from("contact_messages")
				.insert([
					{
						name: fullName,
						email: formData.email,
						company: formData.company,
						phone: formData.phone,
						message: formData.message,
						status: "new",
					},
				])
				.select();

			if (error) {
				console.error("Supabase error:", error);
				throw error;
			}

			// Try to send email notification (but don't fail if it doesn't work)
			try {
				const response = await fetch("/api/contact", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						messageData: {
							name: fullName,
							email: formData.email,
							company: formData.company,
							phone: formData.phone,
							message: formData.message,
						},
					}),
				});

				if (!response.ok) {
					const errorData = await response.json();
					// Don't throw error - message was saved successfully
				}
			} catch (emailError) {
				// Continue even if email fails
			}

			// Reset form
			setFormData({
				firstName: "",
				lastName: "",
				email: "",
				company: "",
				phone: "",
				message: "",
			});
			setSubmitStatus("success");
		} catch (error) {
			console.error("Error submitting form:", error);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<section className="pattern-square bg-info bg-opacity-10">
			<div className="container position-relative z-1 py-xl-9 py-6">
				<div className="row">
					<div className="col-lg-10 offset-lg-1 col-md-12">
						<div className="row align-items-center g-5">
							{/* Text column – FIRST on mobile, LEFT on desktop */}
							<div
								className="col-lg-6 col-12 order-1 order-lg-1"
								data-cue="slideInLeft"
							>
								<div className="me-xl-7">
									<div className="mb-5">
										<h2 className="h1 mb-4">
											Book a free consultation with us
										</h2>
										<p className="mb-0">
											Schedule a no-obligation call with an experienced
											freelance web developer. Get expert advice on your
											project, technology choices, timeline, and next steps —
											completely free.
										</p>
									</div>
									<div className="mb-5">
										<ul className="list-unstyled">
											<li className="mb-2 d-flex">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={20}
													height={20}
													fill="currentColor"
													className="bi bi-dot"
													viewBox="0 0 16 16"
												>
													<path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
												</svg>
												<span className="ms-1">
													Not sure which tech stack fits your project best?
												</span>
											</li>
											<li className="mb-2 d-flex">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={20}
													height={20}
													fill="currentColor"
													className="bi bi-dot"
													viewBox="0 0 16 16"
												>
													<path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
												</svg>
												<span className="ms-1">
													Need guidance on planning and scoping your web
													project?
												</span>
											</li>
											<li className="mb-2 d-flex">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width={20}
													height={20}
													fill="currentColor"
													className="bi bi-dot"
													viewBox="0 0 16 16"
												>
													<path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
												</svg>
												<span className="ms-1">
													Want to discuss costs, timeline, or the best approach?
												</span>
											</li>
										</ul>
									</div>
								</div>
							</div>

							{/* Form column – SECOND on mobile, RIGHT on desktop */}
							<div
								className="col-lg-6 col-12 order-2 order-lg-2"
								data-cue="slideInRight"
							>
								<div className="card shadow-sm">
									<div className="card-body">
										{submitStatus === "success" && (
											<div className="alert alert-success mb-4">
												Thank you for your message! We'll get back to you soon.
											</div>
										)}
										{submitStatus === "error" && (
											<div className="alert alert-danger mb-4">
												Something went wrong. Please try again later.
											</div>
										)}
										<form
											className="row needs-validation g-3"
											onSubmit={handleSubmit}
										>
											<div className="col-lg-12">
												<div className="mb-4">
													<h3 className="mb-0">
														Schedule your free consultation call
													</h3>
												</div>
											</div>
											<div className="col-md-6 col-12">
												<label htmlFor="firstName" className="form-label">
													First Name <span className="text-danger">*</span>
												</label>
												<input
													type="text"
													className="form-control"
													id="firstName"
													name="firstName"
													value={formData.firstName}
													onChange={handleChange}
													placeholder="Enter first name only"
													required
												/>
												<div className="invalid-feedback">
													Please enter your first name.
												</div>
											</div>
											<div className="col-md-6 col-12">
												<label htmlFor="lastName" className="form-label">
													Last Name <span className="text-danger">*</span>
												</label>
												<input
													type="text"
													className="form-control"
													id="lastName"
													name="lastName"
													value={formData.lastName}
													onChange={handleChange}
													placeholder="Enter last name only"
													required
												/>
												<div className="invalid-feedback">
													Please enter your last name.
												</div>
											</div>
											<div className="col-md-12">
												<label htmlFor="email" className="form-label">
													Email <span className="text-danger">*</span>
												</label>
												<input
													type="email"
													className="form-control"
													id="email"
													name="email"
													value={formData.email}
													onChange={handleChange}
													required
												/>
												<div className="invalid-feedback">
													Please enter a valid email.
												</div>
											</div>
											<div className="col-md-6 col-12">
												<label htmlFor="company" className="form-label">
													Company Name (Optional)
												</label>
												<input
													type="text"
													className="form-control"
													id="company"
													name="company"
													value={formData.company}
													onChange={handleChange}
												/>
											</div>
											<div className="col-md-6 col-12">
												<label htmlFor="phone" className="form-label">
													Phone
												</label>
												<input
													type="tel"
													className="form-control"
													id="phone"
													name="phone"
													value={formData.phone}
													onChange={handleChange}
												/>
											</div>
											<div className="col-md-12">
												<label htmlFor="message" className="form-label">
													Message / Project Details{" "}
													<span className="text-danger">*</span>
												</label>
												<textarea
													className="form-control"
													id="message"
													name="message"
													placeholder="Tell us about your project, timeline, or questions..."
													rows={4}
													value={formData.message}
													onChange={handleChange}
													required
												/>
												<div className="invalid-feedback">
													Please share some details about your project.
												</div>
											</div>
											<div className="d-grid">
												<button
													className="btn btn-primary btn-lg"
													type="submit"
													disabled={isSubmitting}
												>
													{isSubmitting ? "Sending..." : "Send Message"}
												</button>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Appointment;
