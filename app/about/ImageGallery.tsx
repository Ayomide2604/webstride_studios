import Image from "next/image";

const ImageGallery = () => {
	return (
		<section>
			<div className="container">
				<div className="row gy-4">
					<div className="col-lg-4 col-md-4 col-12">
						<a
							href="/assets/images/about/inspire.jpg"
							className="glightbox rounded-3 d-block"
							style={{ position: "relative", height: "300px" }}
						>
							<Image
								src="/assets/images/about/inspire.jpg"
								alt="Inspiration"
								fill
								className="rounded-3 card-lift"
								style={{ objectFit: "cover" }}
							/>
						</a>
					</div>
					<div className="col-lg-4 col-md-4 col-12">
						<a
							href="/assets/images/about/creative.jpg"
							className="glightbox rounded-3 d-block"
							style={{ position: "relative", height: "300px" }}
						>
							<Image
								src="/assets/images/about/creative.jpg"
								alt="Creative"
								fill
								className="rounded-3 card-lift"
								style={{ objectFit: "cover" }}
							/>
						</a>
					</div>
					<div className="col-lg-4 col-md-4 col-12">
						<a
							href="/assets/images/about/idea.jpg"
							className="glightbox rounded-3 d-block"
							style={{ position: "relative", height: "300px" }}
						>
							<Image
								src="/assets/images/about/idea.jpg"
								alt="Idea"
								fill
								className="rounded-3 card-lift"
								style={{ objectFit: "cover" }}
							/>
						</a>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ImageGallery;
