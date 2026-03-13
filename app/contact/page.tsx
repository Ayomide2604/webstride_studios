"use client";

import React, { useState } from "react";
import { createClient } from "@/lib/supabase/client";

const page = () => {
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
		<>
			<div className="pattern-square" />
			{/*Pageheader start*/}
			<section className="py-5 py-lg-8">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 offset-lg-1 col-md-12 col-12">
							<h1 className="mb-3">Contact us</h1>
							<p className="mb-0 lead">
								Please reach out to us if you have questions about our
								enterprise offerings, or anything else.
							</p>
						</div>
					</div>
				</div>
			</section>
			{/*Pageheader end*/}
			{/*Contact us start*/}
			<section className="mb-xl-9 my-5">
				<div className="container">
					<div className="row">
						<div className="col-lg-10 offset-lg-1 col-md-12 col-12">
							<div className="row g-xl-7 gy-5">
								<div className="col-md-7 col-12">
									<div className="card shadow-sm">
										<div className="card-body">
											{submitStatus === "success" && (
												<div className="alert alert-success mb-4">
													Thank you for your message! We'll get back to you
													soon.
												</div>
											)}
											{submitStatus === "error" && (
												<div className="alert alert-danger mb-4">
													Something went wrong. Please try again later.
												</div>
											)}
											<form
												className="row g-3 needs-validation"
												onSubmit={handleSubmit}
											>
												<div className="col-lg-6 col-md-12">
													<label htmlFor="firstName" className="form-label">
														First Name
														<span className="text-danger">*</span>
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
														Please enter firstname.
													</div>
												</div>
												<div className="col-lg-6 col-md-12">
													<label htmlFor="lastName" className="form-label">
														Last Name
														<span className="text-danger">*</span>
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
														Please enter lastname.
													</div>
												</div>
												<div className="col-md-12">
													<label htmlFor="email" className="form-label">
														Email
														<span className="text-danger">*</span>
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
														Please enter email.
													</div>
												</div>
												<div className="col-md-12">
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
												<div className="col-md-12">
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
														Message
														<span className="text-danger">*</span>
													</label>
													<textarea
														className="form-control"
														id="message"
														name="message"
														placeholder="Write to us"
														rows={4}
														value={formData.message}
														onChange={handleChange}
														required
													/>
													<div className="invalid-feedback">
														Please enter a message.
													</div>
												</div>
												<div className="d-grid">
													<button
														className="btn btn-primary"
														type="submit"
														disabled={isSubmitting}
													>
														{isSubmitting ? "Sending..." : "Send"}
													</button>
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="col-md-5 col-12">
									<div className="mb-7">
										<div className="icon-shape bg-primary bg-opacity-10 rounded icon-md mb-5">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-headset text-primary"
												viewBox="0 0 16 16"
											>
												<path d="M8 1a5 5 0 0 0-5 5v1h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a6 6 0 1 1 12 0v6a2.5 2.5 0 0 1-2.5 2.5H9.366a1 1 0 0 1-.866.5h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 .866.5H11.5A1.5 1.5 0 0 0 13 12h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1V6a5 5 0 0 0-5-5z" />
											</svg>
										</div>
										<div>
											<h4>Technical support</h4>
											<p className="mb-0">
												Found a persistent bug, or need help setting a new team
												member up? Can’t crack a feature?
												<a href="#" className="text-primary">
													Let us know!
												</a>
											</p>
										</div>
									</div>
									<div className="mb-7">
										<div className="icon-shape bg-primary bg-opacity-10 rounded icon-md mb-5">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-chat-dots text-primary"
												viewBox="0 0 16 16"
											>
												<path d="M5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
												<path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
											</svg>
										</div>
										<div>
											<h4>General chat</h4>
											<p className="mb-0">
												Billing issues, customizations, plan changes--anything
												that doesn’t fit in the other two brackets, goes here.
												<a href="#" className="text-primary">
													Start Chat
												</a>
											</p>
										</div>
									</div>
									<div className="mb-7">
										<div className="icon-shape bg-primary bg-opacity-10 rounded icon-md mb-5">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width={16}
												height={16}
												fill="currentColor"
												className="bi bi-newspaper text-primary"
												viewBox="0 0 16 16"
											>
												<path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5v-11zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5H12z" />
												<path d="M2 3h10v2H2V3zm0 3h4v3H2V6zm0 4h4v1H2v-1zm0 2h4v1H2v-1zm5-6h2v1H7V6zm3 0h2v1h-2V6zM7 8h2v1H7V8zm3 0h2v1h-2V8zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1zm-3 2h2v1H7v-1zm3 0h2v1h-2v-1z" />
											</svg>
										</div>
										<div>
											<h4>Help Center</h4>
											<p className="mb-0">
												Want to share feedback on an existing feature or suggest
												a new one? Talk to us!
												<a href="#" className="text-primary">
													Visit Help Center
												</a>
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default page;
