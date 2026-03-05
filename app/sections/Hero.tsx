import React from "react";
import Image from "next/image";

const Hero = () => {
	return (
		<section
			className="jarallax py-9 hero-agency"
			data-jarallax=""
			data-speed="0.4"
			style={{ minHeight: "100vh" }}
		>	
			<Image
				className="jarallax-img"
				src="/assets/images/hero.jpg"
				alt="agency"
				fill
				priority
				unoptimized
				style={{ objectFit: "cover" }}
			/>
			<div className="position-absolute start-0 end-0">
				<div className="container">
					<div className="row">
						<div className="col-xl-5 col-lg-7 col-12" data-cue="zoomIn">
							<div className="text-center text-lg-start">
								<div className="my-4 text-white-stable">
									<small className="text-uppercase ls-lg">
										Edmonton Digital Agency
									</small>
									<h1 className="mb-1 mt-3 display-3 text-white-stable">
										Digital Solutions That Grow Your Business
									</h1>
									<p className="lead mb-0">
										Based in Edmonton, serving businesses nationwide with custom
										websites that convert.
									</p>
									{/* Alternate Hero Copies:
							   Option 2: "Edmonton Digital Agency" – Your website, built right.
							   Option 3: "Web Design in Edmonton" – Beautiful sites that convert.
							*/}
								</div>
								<a href="#!" className="btn btn-primary">
									Get Started
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
