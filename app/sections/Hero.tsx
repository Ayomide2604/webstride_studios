const Hero = () => {
	return (
		<section
			className="jarallax py-9 hero-agency"
			data-jarallax=""
			data-speed="0.4"
			style={{ position: "relative", zIndex: 0 }}
		>
			<div className="position-absolute start-0 end-0">
				<div className="container">
					<div className="row">
						<div
							className="col-xl-5 col-lg-7 col-12"
							data-cue="zoomIn"
							data-show="true"
							style={{
								animationName: "zoomIn",
								animationDuration: "600ms",
								animationTimingFunction: "ease",
								animationDelay: "0ms",
								animationDirection: "normal",
								animationFillMode: "both",
							}}
						>
							<div className="text-center text-lg-start">
								<div className="mb-4 text-white-stable">
									<small className="text-uppercase ls-lg">
										Web Development Agency
									</small>
									<h1 className="mb-3 mt-3 display-3 text-white-stable">
										Digital Solutions That Grow Your Businesss
									</h1>
									<p className="lead mb-0">
										Based in Edmonton, serving businesses nationwide with custom
										websites that convert.
									</p>
								</div>
								<a href="#!" className="btn btn-primary">
									Start project
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div
				id="jarallax-container-0"
				className="jarallax-container"
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: "100%",
					height: "100%",
					overflow: "hidden",
					zIndex: -100,
					clipPath: "polygon(0px 0px, 100% 0px, 100% 100%, 0px 100%)",
				}}
			>
				<img
					className="jarallax-img"
					src="/assets/images/hero.jpg"
					alt="agency"
					style={{
						objectFit: "cover",
						objectPosition: "50% 50%",
						maxWidth: "none",
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "878.4px",
						overflow: "hidden",
						pointerEvents: "none",
						transformStyle: "preserve-3d",
						backfaceVisibility: "hidden",
						marginTop: "13.8px",
						transform: "translate3d(0px, -13.8px, 0px)",
					}}
				/>
			</div>
		</section>
	);
};

export default Hero;
