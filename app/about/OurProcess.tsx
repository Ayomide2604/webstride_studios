import React from "react";

const OurProcess = () => {
	return (
		<>
			<section className="my-lg-9 my-5">
				<div className="container">
					<div className="row justify-content-between">
						<div className="col-lg-4 col-md-12 col-12">
							<div className="mb-5 mb-lg-0 text-center text-lg-start px-md-5">
								<h2 className="mb-3">Our Process</h2>
								<p className="mb-4 lead">
									We keep things simple, transparent, and focused on delivering
									your website.
								</p>
								<p className="mb-0">
									We work closely with every client to build modern, fast, and
									effective websites that help businesses grow and succeed
									online.
								</p>
							</div>
						</div>

						<div className="col-lg-8">
							<div className="row">
								<div className="col-md-6 col-12">
									<div className="mb-lg-8 mb-5 text-center text-lg-start px-3 px-lg-0">
										<div className="mb-3">
											<img
												src="../assets/images/about/LightbulbFilament.svg"
												alt="Discovery icon"
											/>
										</div>
										<h3 className="h4">1. Discovery & Proposal</h3>
										<p className="mb-0 pe-lg-4">
											We begin with a quick call or short questionnaire to
											understand your goals, audience, and key needs. Then we
											prepare a clear proposal outlining the scope and timeline
											of the project.
										</p>
									</div>
								</div>

								<div className="col-md-6 col-12">
									<div className="mb-lg-8 mb-5 text-center text-lg-start px-3 px-lg-0">
										<div className="mb-3">
											<img
												src="../assets/images/about/PencilCircle.svg"
												alt="Planning and design icon"
											/>
										</div>
										<h3 className="h4">2. Planning & Design</h3>
										<p className="mb-0">
											We start by mapping out the project together: page
											structure (sitemap), key user flows, and overall look &
											feel direction. We present this plan for your review and
											approval.
										</p>
									</div>
								</div>

								<div className="col-md-6 col-12">
									<div className="mb-lg-8 mb-5 text-center text-lg-start px-3 px-lg-0">
										<div className="mb-3">
											<img
												src="../assets/images/about/BracketsCurly.svg"
												alt="Development icon"
											/>
										</div>
										<h3 className="h4">3. Development</h3>
										<p className="mb-0 pe-lg-4">
											We build the site using clean, modern code, fully
											mobile-friendly, fast-loading, and optimized. We progress
											in clear stages with regular updates and check-ins, so
											you're always in the loop.
										</p>
									</div>
								</div>

								<div className="col-md-6 col-12">
									<div className="mb-lg-8 mb-5 text-center text-lg-start px-3 px-lg-0">
										<div className="mb-3">
											<img
												src="../assets/images/about/Rocket.svg"
												alt="Launch icon"
											/>
										</div>
										<h3 className="h4">4. Launch & Support</h3>
										<p className="mb-0 pe-lg-4">
											After thorough testing and your final approval, we launch
											the site live. We include one full month of complimentary
											support for bug fixes and small tweaks. Ongoing
											maintenance is available if you'd like continued help.
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

export default OurProcess;
