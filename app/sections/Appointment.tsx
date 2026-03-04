import Image from "next/image"; // Optional now — can be removed if not using avatar

const Appointment = () => {
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

									{/* Optional: add your contact info here if you want it visible again */}
									{/* <div className="small mt-4">
                    <a
                      href="mailto:theolowuayo@gmail.com"
                      className="text-primary text-decoration-none"
                    >
                      theolowuayo@gmail.com
                    </a>
                  </div> */}
								</div>
							</div>

							{/* Form column – SECOND on mobile, RIGHT on desktop */}
							<div
								className="col-lg-6 col-12 order-2 order-lg-2"
								data-cue="slideInRight"
							>
								<div className="card shadow-sm">
									<div className="card-body">
										<form className="row needs-validation g-3" noValidate>
											<div className="col-lg-12">
												<div className="mb-4">
													<h3 className="mb-0">
														Schedule your free consultation call
													</h3>
												</div>
											</div>
											<div className="col-md-6 col-12">
												<label
													htmlFor="ScheduleFirstnameInput"
													className="form-label"
												>
													First Name <span className="text-danger">*</span>
												</label>
												<input
													type="text"
													className="form-control"
													id="ScheduleFirstnameInput"
													required
												/>
												<div className="invalid-feedback">
													Please enter your first name.
												</div>
											</div>
											<div className="col-md-6 col-12">
												<label
													htmlFor="scheduleLastnameInput"
													className="form-label"
												>
													Last Name <span className="text-danger">*</span>
												</label>
												<input
													type="text"
													className="form-control"
													id="scheduleLastnameInput"
													required
												/>
												<div className="invalid-feedback">
													Please enter your last name.
												</div>
											</div>
											<div className="col-md-6 col-12">
												<label
													htmlFor="scheduleEmailInput"
													className="form-label"
												>
													Email <span className="text-danger">*</span>
												</label>
												<input
													type="email"
													className="form-control"
													id="scheduleEmailInput"
													required
												/>
												<div className="invalid-feedback">
													Please enter a valid email.
												</div>
											</div>
											<div className="col-md-6 col-12">
												<label
													htmlFor="schedulePhoneInput"
													className="form-label"
												>
													Phone Number <span className="text-danger">*</span>
												</label>
												<input
													type="tel"
													className="form-control"
													id="schedulePhoneInput"
													required
												/>
												<div className="invalid-feedback">
													Please enter your phone number.
												</div>
											</div>
											<div className="col-md-12">
												<label
													htmlFor="scheduleTextarea"
													className="form-label"
												>
													Message / Project Details
												</label>
												<textarea
													className="form-control"
													id="scheduleTextarea"
													placeholder="Tell us about your project, timeline, or questions..."
													rows={4}
													required
													defaultValue={""}
												/>
												<div className="invalid-feedback">
													Please share some details about your project.
												</div>
											</div>
											<div className="d-grid">
												<button
													className="btn btn-primary btn-lg"
													type="submit"
												>
													Send Message
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
