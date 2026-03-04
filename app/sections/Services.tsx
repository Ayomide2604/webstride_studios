import Image from "next/image";
import { CodeSlashIcon, PaletteIcon, MegaphoneIcon } from "../components/Icons";

import web from "../../public/assets/images/services/web.jpg";
import seo from "../../public/assets/images/services/seo.jpg";
import ux from "../../public/assets/images/services/ux.jpg";

const Services = () => {
	return (
		<section className="my-xl-9 my-5">
			<div className="container" data-cue="fadeIn">
				<div className="row">
					<div className="col-xl-8 offset-xl-2">
						<div className="text-center mb-xl-7 mb-5">
							<h2 className="mb-3">
								Complete web solutions for
								<span className="text-primary"> your business.</span>
							</h2>
							<p className="mb-0">
								From concept to deployment, we build powerful digital
								experiences that drive growth and engage your audience with
								modern technologies.
							</p>
						</div>
					</div>
				</div>
				<div className="table-responsive-lg">
					<div className="row flex-nowrap pb-4 pb-lg-0 me-5 me-lg-0">
						<div className="col-lg-4 col-md-6" data-cue="zoomIn">
							<div className="card border-0 card-primary">
								<div className="card-body p-5">
									<div className="position-relative d-inline-block mb-5">
										<Image
											className="avatar avatar-xl rounded-circle border-2 border border-white shadow-sm"
											src={web}
											alt="web"
											width={100}
											height={100}
											style={{ objectFit: "cover" }}
										/>

										<div className="position-absolute bottom-0 end-0">
											<div className="icon-md icon-shape rounded-circle bg-white me-n2 mb-n2 shadow-sm">
												<CodeSlashIcon
													width={18}
													height={18}
													className="text-primary"
												/>
											</div>
										</div>
									</div>
									<div className="mb-5">
										<h4 className="card-title">Web Development</h4>
										<p className="mb-0 card-text">
											Custom websites and web applications built with modern
											frameworks and best practices for optimal performance and
											user experience.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-cue="zoomIn">
							<div className="card border-0 card-primary">
								<div className="card-body p-5">
									<div className="position-relative d-inline-block mb-5">
										<Image
											className="avatar avatar-xl rounded-circle border-2 border border-white shadow-sm"
											src={ux}
											alt="web"
											width={100}
											height={100}
											style={{ objectFit: "cover" }}
										/>
										<div className="position-absolute bottom-0 end-0">
											<div className="icon-md icon-shape rounded-circle bg-white me-n2 mb-n2 shadow-sm">
												<PaletteIcon
													width={18}
													height={18}
													className="text-primary"
												/>
											</div>
										</div>
									</div>
									<div className="mb-5">
										<h4 className="card-title">UI/UX Design</h4>
										<p className="mb-0 card-text">
											Beautiful, intuitive interfaces that delight users and
											drive conversions with user-centered design principles.
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 col-md-6" data-cue="zoomIn">
							<div className="card border-0 card-primary">
								<div className="card-body p-5">
									<div className="position-relative d-inline-block mb-5">
										<Image
											className="avatar avatar-xl rounded-circle border-2 border border-white shadow-sm"
											src={seo}
											alt="web"
											width={100}
											height={100}
											style={{ objectFit: "cover" }}
										/>
										<div className="position-absolute bottom-0 end-0">
											<div className="icon-md icon-shape rounded-circle bg-white me-n2 mb-n2 shadow-sm">
												<MegaphoneIcon
													width={18}
													height={18}
													className="text-primary"
												/>
											</div>
										</div>
									</div>
									<div className="mb-5">
										<h4 className="card-title">SEO Optimization</h4>
										<p className="mb-0 card-text">
											Dominate search results and attract high-quality organic
											traffic with expert keyword research, on-page tweaks,
											technical fixes, and strategic link building—turning
											Google into your best salesperson.
										</p>
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

export default Services;
