import React from "react";

const Newsletter = () => {
	return (
		<>
			<section className="mb-7">
				<div className="container">
					<div className="row">
						<div className="col-lg-8 offset-lg-2">
							<div className="bg-primary bg-opacity-10 px-5 pt-5 pb-7 mb-2 rounded-3 text-center">
								<div className="icon-shape bg-primary bg-opacity-10 icon-xl rounded-circle mb-4">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										fill="currentColor"
										className="bi bi-envelope-check text-primary"
										viewBox="0 0 16 16"
									>
										<path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2H2Zm3.708 6.208L1 11.105V5.383l4.708 2.825ZM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2-7-4.2Z" />
										<path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
									</svg>
								</div>
								<div className="mb-4">
									<h3>Stay in the Loop with Our Newsletter</h3>
									<p className="mb-0 mx-md-7 px-md-4">
										Get exclusive updates on new projects, company milestones,
										client success stories, and all our special offers.
									</p>
								</div>
								<form className="row g-3 needs-validation d-flex mx-md-7 px-md-4">
									<div className="col-md-7 col-xl-8 col-12">
										<label
											htmlFor="subscribeEmail"
											className="form-label visually-hidden"
										>
											Email
										</label>
										<input
											type="email"
											className="form-control"
											id="subscribeEmail"
											placeholder="Your email address"
											aria-label="Enter your email"
											required
										/>
									</div>
									<div className="col-md-5 col-xl-4 col-12">
										<div className="d-grid">
											<button
												className="btn btn-primary shadow-sm"
												type="submit"
											>
												Subscribe
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Newsletter;
