import Link from "next/link";

const About = () => {
	return (
		<section className="my-xl-9 my-5">
			<div className="container">
				<div className="row g-4">
					<div className="col-xl-5 col-lg-6 col-12" data-cue="slideInLeft">
						<div className="mb-4">
							<small className="text-uppercase ls-md fw-semibold">
								who we are
							</small>
							<h2 className="h1 mt-4 mb-3">
								Providing Digital Solutions to Businesses
							</h2>
							<p className="mb-3">
								We are a premier web development company proudly based in
								Edmonton, Canada, serving businesses across the entire country.
								We combine technical expertise with creative vision to deliver
								websites that not only look stunning but drive measurable
								results for clients nationwide.
							</p>
							<p className="mb-0">
								While we call Edmonton home, our digital expertise knows no
								geographical boundaries. We work seamlessly with businesses from
								coast to coast, bringing the same personalized approach and
								commitment to excellence to every project, regardless of
								location. Your digital presence will stand out and effectively
								connect with your target audience, wherever they may be.
							</p>
						</div>
						<Link href="/about" className="icon-link icon-link-hover">
							More about us
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={14}
								height={14}
								fill="currentColor"
								className="bi bi-arrow-right"
								viewBox="0 0 16 16"
							>
								<path
									fillRule="evenodd"
									d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
								/>
							</svg>
						</Link>
					</div>
					<div className="col-xl-6 offset-xl-1 col-lg-6 col-12">
						<div className="row g-4" data-cues="slideInUp" data-delay={1000}>
							<div className="col-lg-6 col-md-6 col-12">
								<a href="#!">
									<div
										className="rounded-3 card-lift"
										style={{
											backgroundImage: "url(assets/images/about/inspire.jpg)",
											backgroundRepeat: "no-repeat",
											height: 386,
											backgroundSize: "cover",
										}}
									/>
								</a>
							</div>
							<div className="col-lg-6 col-md-6 col-12">
								<a href="#!">
									<div
										className="mb-4 rounded-3 card-lift"
										style={{
											backgroundImage: "url(assets/images/about/creative.jpg)",
											backgroundRepeat: "no-repeat",
											height: 180,
											backgroundSize: "cover",
										}}
									/>
								</a>
								<a href="#!">
									<div
										className="mb-2 rounded-3 card-lift"
										style={{
											backgroundImage: "url(assets/images/about/idea.jpg)",
											backgroundRepeat: "no-repeat",
											height: 180,
											backgroundSize: "cover",
										}}
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default About;
