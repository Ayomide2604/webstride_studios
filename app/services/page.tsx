import Image from "next/image";
import { BiPalette, BiCodeAlt, BiCart } from "react-icons/bi";

import webDesignImg from "../../public/assets/images/services/ux.jpg";
import webDevImg from "../../public/assets/images/services/web.jpg";
import ecommerceImg from "../../public/assets/images/services/seo.jpg";

const ServicesPage = () => {
	return (
		<>
			{/* Page Header */}
			<section className="py-5 py-lg-8">
				<div className="container">
					<div className="row">
						<div className="col-xl-8 offset-xl-2 col-md-12 col-12">
							<div className="text-center">
								<small className="text-uppercase ls-md fw-bold text-primary">
									Services
								</small>
								<h1 className="mt-4">We provide client-centric services</h1>
								<p className="mb-0 px-lg-9 lead">
									Maximize your website's capabilities and reach its full
									potential with our services.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Website Design Service */}
			<section className="mb-xl-9 py-5">
				<div className="container">
					<div className="row align-items-lg-center">
						<div className="col-lg-5 col-md-6 order-2">
							<div className="p-3 icon-xl icon-shape rounded bg-primary bg-opacity-10 mb-5 border border-primary-subtle">
								<BiPalette
									className="text-primary"
									style={{ fontSize: "24px" }}
								/>
							</div>
							<div className="mb-5">
								<h2 className="mb-2">UI/UX & Graphics Design</h2>
								<p>
									We design visually stunning and user-friendly interfaces that
									elevate your online presence. We provide client-centric ui/ux
									and graphics that are both aesthetic and functional.
								</p>
							</div>
							<div className="d-flex flex-wrap gap-2">
								<span className="fs-6 badge bg-secondary-subtle border bg-secondary-subtle text-dark-emphasis rounded-pill py-2 px-3">
									Wireframes and Testing
								</span>
								<span className="fs-6 badge bg-secondary-subtle border bg-secondary-subtle text-dark-emphasis rounded-pill py-2 px-3">
									User Flow
								</span>
								<span className="fs-6 badge bg-secondary-subtle border bg-secondary-subtle text-dark-emphasis rounded-pill py-2 px-3">
									Design Systems
								</span>
							</div>
						</div>
						<div className="col-lg-5 offset-lg-2 col-md-6 order-lg-2">
							<figure className="mb-5 mb-md-0">
								<Image
									src={webDesignImg}
									alt="Website Design"
									className="rounded-3 img-fluid"
									width={500}
									height={400}
									style={{ objectFit: "cover" }}
								/>
							</figure>
						</div>
					</div>
				</div>
			</section>

			{/* Web Development Service */}
			<section className="mb-xl-9 py-5">
				<div className="container">
					<div className="row align-items-lg-center">
						<div className="col-lg-5 col-md-6">
							<figure className="mb-5 mb-md-0">
								<Image
									src={webDevImg}
									alt="Web Development"
									className="rounded-3 img-fluid"
									width={500}
									height={400}
									style={{ objectFit: "cover" }}
								/>
							</figure>
						</div>
						<div className="col-lg-5 offset-lg-2 col-md-6 mb-4 mb-md-0">
							<div className="p-3 icon-xl icon-shape rounded bg-success bg-opacity-10 mb-5 border border-success-subtle">
								<BiCodeAlt
									className="text-success"
									style={{ fontSize: "24px" }}
								/>
							</div>
							<div className="mb-5">
								<h2 className="mb-2">Web Development</h2>
								<p className="mb-0">
									We build reliable, scalable solutions that deliver your vision
									and exceed your expectations.
								</p>
							</div>
							<div className="mb-5">
								<ul className="list-unstyled mb-0">
									<li className="d-flex mb-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-check-circle-fill text-success mt-1"
											viewBox="0 0 16 16"
										>
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
										</svg>
										<span className="ms-2">Website Development</span>
									</li>
									<li className="d-flex mb-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-check-circle-fill text-success mt-1"
											viewBox="0 0 16 16"
										>
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
										</svg>
										<span className="ms-2">Front/Back-end Development</span>
									</li>
									<li className="d-flex mb-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-check-circle-fill text-success mt-1"
											viewBox="0 0 16 16"
										>
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
										</svg>
										<span className="ms-2">Full-stack App Development</span>
									</li>
									<li className="d-flex mb-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-check-circle-fill text-success mt-1"
											viewBox="0 0 16 16"
										>
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
										</svg>
										<span className="ms-2">Quality Assurance</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Ecommerce Development Service */}
			<section className="mb-xl-9 py-5">
				<div className="container">
					<div className="row align-items-lg-center">
						<div className="col-md-6 col-lg-5 order-2">
							<div className="p-3 icon-xl icon-shape rounded bg-info bg-opacity-10 mb-5 border border-info-subtle">
								<BiCart className="text-info" style={{ fontSize: "24px" }} />
							</div>
							<div className="mb-5">
								<h2 className="mb-2">E-commerce Web Apps</h2>
								<p className="mb-0">
									We build powerful e-commerce web applications with modern
									features like shopping carts, payment processing, and
									inventory management to drive online sales.
								</p>
							</div>
						</div>
						<div className="col-lg-5 offset-lg-2 col-md-6 order-lg-2">
							<figure className="mb-5 mb-md-0">
								<Image
									src={ecommerceImg}
									alt="Ecommerce Development"
									className="rounded-3 img-fluid"
									width={500}
									height={400}
									style={{ objectFit: "cover" }}
								/>
							</figure>
						</div>
					</div>
				</div>
			</section>

			{/* SEO Service */}
			<section className="mb-xl-9 py-5">
				<div className="container">
					<div className="row align-items-lg-center">
						<div className="col-lg-5 col-md-6">
							<figure className="mb-5 mb-md-0">
								<Image
									src={ecommerceImg}
									alt="SEO Optimization"
									className="rounded-3 img-fluid"
									width={500}
									height={400}
									style={{ objectFit: "cover" }}
								/>
							</figure>
						</div>
						<div className="col-lg-5 offset-lg-2 col-md-6 mb-4 mb-md-0">
							<div className="p-3 icon-xl icon-shape rounded bg-success bg-opacity-10 mb-5 border border-success-subtle">
								<BiCodeAlt
									className="text-success"
									style={{ fontSize: "24px" }}
								/>
							</div>
							<div className="mb-5">
								<h2 className="mb-2">Search Engine Optimization (SEO)</h2>
								<p className="mb-0">
									Dominate search results and attract high-quality organic
									traffic with expert keyword research, on-page optimization,
									technical SEO fixes, and strategic link building.
								</p>
							</div>
							<div className="mb-5">
								<ul className="list-unstyled mb-0">
									<li className="d-flex mb-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-check-circle-fill text-success mt-1"
											viewBox="0 0 16 16"
										>
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
										</svg>
										<span className="ms-2">Keyword Research & Analysis</span>
									</li>
									<li className="d-flex mb-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-check-circle-fill text-success mt-1"
											viewBox="0 0 16 16"
										>
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
										</svg>
										<span className="ms-2">On-Page & Technical SEO</span>
									</li>
									<li className="d-flex mb-2">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-check-circle-fill text-success mt-1"
											viewBox="0 0 16 16"
										>
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
										</svg>
										<span className="ms-2">
											Link Building & Content Strategy
										</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Website Design Process Section */}
			<section className="bg-light py-lg-10 py-5">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<div className="text-center mb-lg-7 mb-5">
								<small className="text-uppercase text-primary ls-md fw-bold">
									our process
								</small>
								<h2 className="mt-2 mb-0">
									Our website design process explained
								</h2>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-10 offset-lg-1 col-md-12">
							<div className="row">
								<div className="col-md-4">
									<div className="text-center mb-6 mb-lg-0 mx-4 mx-md-auto">
										<div className="icon-shape icon-md bg-primary bg-opacity-10 text-primary rounded-circle fs-4 p-2 mb-lg-5 mb-3 fw-bold">
											1
										</div>
										<h4>Discover</h4>
										<p className="mb-0">
											A strategic setup is crucial to success. We research your
											market, competitors, and target audience to create a solid
											foundation.
										</p>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-center mb-6 mb-lg-0 mx-4 mx-md-auto">
										<div className="icon-shape icon-md bg-primary bg-opacity-10 text-primary rounded-circle fs-4 p-2 mb-lg-5 mb-3 fw-bold">
											2
										</div>
										<h4>Build</h4>
										<p className="mb-0 mx-lg-5">
											Each project is tailor-made with cutting-edge technologies
											and best practices to ensure optimal performance.
										</p>
									</div>
								</div>
								<div className="col-md-4">
									<div className="text-center mb-6 mb-lg-0 mx-4 mx-md-auto">
										<div className="icon-shape icon-md bg-primary bg-opacity-10 text-primary rounded-circle fs-4 p-2 mb-lg-5 mb-3 fw-bold">
											3
										</div>
										<h4>Deliver</h4>
										<p className="mb-0">
											We deliver polished, tested solutions that exceed
											expectations and drive measurable results for your
											business.
										</p>
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

export default ServicesPage;
