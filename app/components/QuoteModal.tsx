"use client";

import { useState } from "react";

interface QuoteModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const QuoteModal = ({ isOpen, onClose }: QuoteModalProps) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		company: "",
		service: "",
		projectDescription: "",
		budget: "",
		timeline: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: Implement quote submission logic
		console.log("Quote form submitted:", formData);
		alert("Thank you for your quote request! We'll get back to you soon.");
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div 
			className="modal fade show" 
			style={{ display: isOpen ? "block" : "none", backgroundColor: "rgba(0,0,0,0.5)" }}
			tabIndex={-1}
			onClick={onClose}
		>
			<div className="modal-dialog modal-lg modal-dialog-centered">
				<div 
					className="modal-content" 
					onClick={(e) => e.stopPropagation()}
				>
					<div className="modal-header">
						<h5 className="modal-title">
							<i className="bi bi-file-earmark-text me-2"></i>
							Get a Quote
						</h5>
						<button 
							type="button" 
							className="btn-close" 
							onClick={onClose}
							aria-label="Close"
						></button>
					</div>
					<div className="modal-body">
						<form onSubmit={handleSubmit}>
							<div className="row">
								<div className="col-md-6 mb-3">
									<label htmlFor="name" className="form-label">
										Full Name <span className="text-danger">*</span>
									</label>
									<input
										type="text"
										className="form-control"
										id="name"
										name="name"
										value={formData.name}
										onChange={handleChange}
										placeholder="John Doe"
										required
									/>
								</div>
								<div className="col-md-6 mb-3">
									<label htmlFor="email" className="form-label">
										Email Address <span className="text-danger">*</span>
									</label>
									<input
										type="email"
										className="form-control"
										id="email"
										name="email"
										value={formData.email}
										onChange={handleChange}
										placeholder="john@example.com"
										required
									/>
								</div>
							</div>
							<div className="row">
								<div className="col-md-6 mb-3">
									<label htmlFor="phone" className="form-label">
										Phone Number
									</label>
									<input
										type="tel"
										className="form-control"
										id="phone"
										name="phone"
										value={formData.phone}
										onChange={handleChange}
										placeholder="+1 (555) 123-4567"
									/>
								</div>
								<div className="col-md-6 mb-3">
									<label htmlFor="company" className="form-label">
										Company Name
									</label>
									<input
										type="text"
										className="form-control"
										id="company"
										name="company"
										value={formData.company}
										onChange={handleChange}
										placeholder="Acme Corporation"
									/>
								</div>
							</div>
							<div className="mb-3">
								<label htmlFor="service" className="form-label">
									Service Type <span className="text-danger">*</span>
								</label>
								<select
									className="form-select"
									id="service"
									name="service"
									value={formData.service}
									onChange={handleChange}
									required
								>
									<option value="">Select a service...</option>
									<option value="web-design">Web Design</option>
									<option value="web-development">Web Development</option>
									<option value="mobile-app">Mobile App Development</option>
									<option value="seo">SEO Services</option>
									<option value="digital-marketing">Digital Marketing</option>
									<option value="branding">Branding & Logo Design</option>
									<option value="other">Other</option>
								</select>
							</div>
							<div className="mb-3">
								<label htmlFor="projectDescription" className="form-label">
									Project Description <span className="text-danger">*</span>
								</label>
								<textarea
									className="form-control"
									id="projectDescription"
									name="projectDescription"
									value={formData.projectDescription}
									onChange={handleChange}
									rows={4}
									placeholder="Please describe your project in detail..."
									required
								></textarea>
							</div>
							<div className="row">
								<div className="col-md-6 mb-3">
									<label htmlFor="budget" className="form-label">
										Estimated Budget
									</label>
									<select
										className="form-select"
										id="budget"
										name="budget"
										value={formData.budget}
										onChange={handleChange}
									>
										<option value="">Select budget range...</option>
										<option value="under-5k">Under $5,000</option>
										<option value="5k-10k">$5,000 - $10,000</option>
										<option value="10k-25k">$10,000 - $25,000</option>
										<option value="25k-50k">$25,000 - $50,000</option>
										<option value="over-50k">Over $50,000</option>
									</select>
								</div>
								<div className="col-md-6 mb-3">
									<label htmlFor="timeline" className="form-label">
										Project Timeline
									</label>
									<select
										className="form-select"
										id="timeline"
										name="timeline"
										value={formData.timeline}
										onChange={handleChange}
									>
										<option value="">Select timeline...</option>
										<option value="asap">ASAP</option>
										<option value="1-2-months">1-2 months</option>
										<option value="3-6-months">3-6 months</option>
										<option value="6-12-months">6-12 months</option>
										<option value="flexible">Flexible</option>
									</select>
								</div>
							</div>
						</form>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn btn-secondary" onClick={onClose}>
							Cancel
						</button>
						<button type="button" className="btn btn-primary" onClick={handleSubmit}>
							<i className="bi bi-send me-2"></i>
							Submit Quote Request
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuoteModal;
