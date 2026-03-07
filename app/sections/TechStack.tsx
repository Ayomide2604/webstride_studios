import Image from "next/image";

const TechStack = () => {
	const techStack = [
		{ name: "Python", image: "/assets/images/tech/python.svg" },
		{ name: "JavaScript", image: "/assets/images/tech/javascript.svg" },
		{ name: "Django", image: "/assets/images/tech/django.svg" },
		{ name: "Next.js", image: "/assets/images/tech/nextjs.svg" },
		{ name: "React", image: "/assets/images/tech/react.svg" },
		{ name: "PostgreSQL", image: "/assets/images/tech/postgres.svg" },
		{ name: "Node.js", image: "/assets/images/tech/nodejs.svg" },
		{ name: "GitHub", image: "/assets/images/tech/github.svg" },
		{ name: "Vercel", image: "/assets/images/tech/vercel.svg" },
	];

	return (
		<section className="py-xl-9 py-5 bg-light">
			<div className="container">
				<div className="row">
					<div className="col-xl-6 offset-xl-3 col-md-12 col-12">
						<div className="text-center mb-xl-7 mb-5" data-cue="fadeIn">
							<small className="text-uppercase ls-md fw-semibold">
								modern tech stack
							</small>
							<h2 className="my-3">Building with cutting-edge technologies</h2>
							<p className="mb-0 text-body">
								We work with proven technologies designed to solve your product
								requirements. Focus on finding solutions for your business needs
								while we handle the technical aspect.
							</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="col-lg-10 offset-lg-1 col-md-12 col-12">
						<div className="row row-cols-lg-5 row-cols-md-4 row-cols-2 justify-content-center g-5">
							{techStack.map((tech, index) => (
								<div className="col" data-cue="slideInDown" key={tech.name}>
									<figure className="text-center mb-0">
										<Image
											src={tech.image}
											alt={tech.name}
											width={60}
											height={60}
											className="img-fluid"
											style={{ objectFit: "contain" }}
										/>
										<figcaption className="mt-2">
											<small className="text-muted">{tech.name}</small>
										</figcaption>
									</figure>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TechStack;
