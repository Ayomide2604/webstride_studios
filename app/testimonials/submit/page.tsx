"use client";

import Link from "next/link";
import TestimonialForm from "@/app/components/TestimonialForm";

export default function SubmitTestimonialPage() {
	const handleSuccess = () => {
		// Redirect to home page after successful submission
		window.location.href = "/?testimonial=success";
	};

	return (
		<div className="container py-5 py-xl-9">
			<div className="row justify-content-center">
				<div className="col-lg-8">
					<div className="text-center mb-5">
						<Link href="/" className="btn btn-outline-secondary mb-4">
							← Back to Home
						</Link>
						<h1>Share Your Experience</h1>
						<p className="lead text-muted">
							Thank you for working with us! We'd love to hear about your
							experience. Your feedback helps us improve and assists others in
							making informed decisions.
						</p>
						<div className="alert alert-info d-inline-block">
							<i className="bi bi-lock me-2"></i>
							This is a private submission form for our clients. Your
							testimonial will be reviewed before appearing on our website.
						</div>
					</div>

					<TestimonialForm onSuccess={handleSuccess} />

					<div className="text-center mt-4">
						<small className="text-muted">
							By submitting a testimonial, you agree that we may display it on
							our website and marketing materials. We reserve the right to edit
							for length and clarity.
						</small>
					</div>
				</div>
			</div>
		</div>
	);
}
