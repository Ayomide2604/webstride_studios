import Image from "next/image";

const OurValues = () => {
	return (
		<section className="my-xl-9 my-5">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 col-md-12 col-12">
						<div className="mb-xl-6 mb-5">
							<h2 className="mb-0">Our values</h2>
						</div>
					</div>
				</div>
				<div className="row d-flex align-items-center mb-md-9 mb-6">
					<div className="col-lg-6 col-md-6 col-12">
						<figure className="mb-4 mb-md-0">
							<Image
								src="/assets/images/about/digital_excellence.jpg"
								alt="Digital Excellence"
								width={600}
								height={400}
								className="img-fluid rounded-3"
							/>
						</figure>
					</div>
					<div className="col-lg-5 offset-lg-1 col-md-6 col-12">
						<span className="text-primary fw-semibold">01</span>
						<div className="mb-4">
							<h3 className="mt-4 mb-3">Build Digital Excellence</h3>
							<p className="mb-0">
								We create powerful digital solutions that transform businesses.
								From custom websites to web applications, we combine
								cutting-edge technology with creative design to deliver
								platforms that not only look stunning but drive real business
								results across Canada.
							</p>
						</div>

						<a href="/services" className="icon-link icon-link-hover">
							Explore our services
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								fill="currentColor"
								className="bi bi-arrow-right"
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
								/>
							</svg>
						</a>
					</div>
				</div>
				<div className="row d-flex align-items-center mb-md-9 mb-6">
					<div className="col-lg-5 col-md-6 col-12 order-2">
						<span className="text-primary fw-semibold">02</span>
						<div className="mb-4">
							<h3 className="mt-4 mb-3">Client-First Approach</h3>
							<p className="mb-0">
								Your success is our success. We dive deep into understanding
								your business goals, target audience, and unique challenges.
								From our Edmonton base, we serve clients nationwide with the
								same dedication, ensuring every project delivers measurable
								value and exceeds expectations.
							</p>
						</div>

						<a href="/contact" className="icon-link icon-link-hover">
							View our work
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								fill="currentColor"
								className="bi bi-arrow-right"
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
								/>
							</svg>
						</a>
					</div>

					<div className="col-lg-6 offset-lg-1 col-md-6 col-12 order-md-2">
						<figure className="mb-4">
							<Image
								src="/assets/images/about/client_first.jpg"
								alt="Client First Approach"
								width={600}
								height={400}
								className="img-fluid rounded-3"
							/>
						</figure>
					</div>
				</div>

				<div className="row d-flex align-items-center mb-md-9 mb-6">
					<div className="col-lg-6 col-md-6 col-12">
						<figure className="mb-4 mb-md-0">
							<Image
								src="/assets/images/about/innovation.jpg"
								alt="Innovation and Growth"
								width={600}
								height={400}
								className="img-fluid rounded-3"
							/>
						</figure>
					</div>
					<div className="col-lg-5 offset-lg-1 col-md-6 col-12">
						<span className="text-primary fw-semibold">03</span>
						<div className="mb-4">
							<h3 className="mt-4 mb-3">Innovation & Growth</h3>
							<p className="mb-0">
								We stay ahead of digital trends and continuously evolve our
								skills. While we're proud of our Edmonton roots, our vision
								spans across Canada. We're committed to growing alongside our
								clients, embracing new technologies and methodologies to keep
								your business at the forefront of digital innovation.
							</p>
						</div>

						<a href="/contact" className="icon-link icon-link-hover">
							Start your project
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="14"
								height="14"
								fill="currentColor"
								className="bi bi-arrow-right"
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default OurValues;
