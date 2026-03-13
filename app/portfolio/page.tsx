"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
	id: string;
	title: string;
	category: string;
	description: string;
	image: string;
	link: string;
	technologies: string[];
}

const projects: Project[] = [
	{
		id: "1",
		title: "Chat GPT Interface",
		category: "design",
		description:
			"A green square with a white knot on it - modern AI chat interface design.",
		image: "https://picsum.photos/seed/chatgpt/400/300.jpg",
		link: "/portfolio/chatgpt-interface",
		technologies: ["React", "TypeScript", "OpenAI API", "Tailwind CSS"],
	},
	{
		id: "2",
		title: "Electric Car Charging",
		category: "webdevelopment",
		description:
			"Side view man charging electric car - sustainable energy management platform.",
		image: "https://picsum.photos/seed/electriccar/400/300.jpg",
		link: "/portfolio/electric-charging",
		technologies: ["Vue.js", "Node.js", "IoT Integration", "MongoDB"],
	},
	{
		id: "3",
		title: "3D Face Design",
		category: "branding",
		description:
			"3D rendered illustration of a human face design - digital avatar creation.",
		image: "https://picsum.photos/seed/3dface/400/300.jpg",
		link: "/portfolio/3d-face-design",
		technologies: ["Blender", "Three.js", "WebGL", "React"],
	},
	{
		id: "4",
		title: "VR Experience",
		category: "ui-ux",
		description:
			"Woman wearing virtual reality simulator - immersive VR training platform.",
		image: "https://picsum.photos/seed/vrwoman/400/300.jpg",
		link: "/portfolio/vr-experience",
		technologies: ["Unity", "C#", "Oculus SDK", "Firebase"],
	},
	{
		id: "5",
		title: "Robot Human Interaction",
		category: "design",
		description:
			"Robot handshake human, futuristic digital age - AI automation system.",
		image: "https://picsum.photos/seed/robothandshake/400/300.jpg",
		link: "/portfolio/robot-interaction",
		technologies: ["Python", "TensorFlow", "React", "Docker"],
	},
	{
		id: "6",
		title: "Food Delivery System",
		category: "webdevelopment",
		description:
			"Busy deliveryman driving scooter while holding pizza - on-demand delivery platform.",
		image: "https://picsum.photos/seed/fooddelivery/400/300.jpg",
		link: "/portfolio/food-delivery",
		technologies: ["Next.js", "PostgreSQL", "Redis", "Google Maps API"],
	},
];

export default function Portfolio() {
	const [activeFilter, setActiveFilter] = useState("all");
	const [filteredProjects, setFilteredProjects] = useState(projects);

	const filters = [
		{ id: "all", label: "All Projects" },
		{ id: "webdevelopment", label: "Web Development" },
		{ id: "ui-ux", label: "UI/UX Design" },
		{ id: "design", label: "Design" },
		{ id: "branding", label: "Branding" },
	];

	const handleFilterChange = (filter: string) => {
		setActiveFilter(filter);
		if (filter === "all") {
			setFilteredProjects(projects);
		} else {
			setFilteredProjects(
				projects.filter((project) => project.category === filter),
			);
		}
	};

	return (
		<>
			<div className="pattern-square"></div>

			{/* Page Header */}
			<section className="py-5 py-lg-8">
				<div className="container">
					<div className="row">
						<div className="col-lg-6 col-md-12 col-12">
							<h1 className="mb-3">Our Portfolio</h1>
							<p className="mb-0 lead">
								We take digital experiences to the next level. Our dedicated
								services are developed to fulfill the whole product cycle, from
								discovery and branding to development and continuous
								improvements.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Portfolio Filters */}
			<section className="gallery mb-xl-9 my-4">
				<div className="container">
					<div className="row">
						<div className="mb-4">
							<ul className="nav nav-lb-tab gallery-filter">
								{filters.map((filter) => (
									<li key={filter.id} className="nav-item">
										<button
											className={`nav-link ${activeFilter === filter.id ? "active" : ""}`}
											onClick={() => handleFilterChange(filter.id)}
										>
											{filter.label}
										</button>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Portfolio Grid */}
					<div className="row">
						{filteredProjects.map((project) => (
							<div key={project.id} className="col-lg-4 col-md-6 mb-4">
								<figure className="lift position-relative btn-arrow mb-5">
									<Link href={project.link} className="gallery-item-inner">
										<img
											src={project.image}
											alt={project.title}
											className="img-fluid rounded-3"
											style={{
												width: "100%",
												height: "300px",
												objectFit: "cover",
											}}
										/>
										<div className="icon-shape icon-lg bg-white rounded-circle icon-arrow shadow-lg">
											<i className="bi bi-arrow-up-right"></i>
										</div>
									</Link>
								</figure>

								<div className="mb-5">
									<h2 className="lh-base h4">
										<Link href={project.link} className="text-reset">
											{project.title}
										</Link>
									</h2>
									<p className="mb-0">{project.description}</p>
								</div>

								<Link href={project.link} className="btn btn-outline-dark">
									View Project
									<span className="ms-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											className="bi bi-arrow-up-right-circle-fill"
											viewBox="0 0 16 16"
										>
											<path d="M0 8a8 8 0 1 0 16 0A8 8 0 0 0 0 8zm5.904 2.803a.5.5 0 1 1-.707-.707L9.293 6H6.525a.5.5 0 1 1 0-1H10.5a.5.5 0 0 1 .5.5v3.975a.5.5 0 0 1-1 0V6.707l-4.096 4.096z" />
										</svg>
									</span>
								</Link>
							</div>
						))}
					</div>

					{filteredProjects.length === 0 && (
						<div className="text-center py-5">
							<i className="bi bi-folder-x fs-1 text-muted mb-3"></i>
							<h4 className="text-muted">No projects found</h4>
							<p className="text-muted">
								Try selecting a different filter or check back later for new
								projects.
							</p>
						</div>
					)}
				</div>
			</section>

			{/* Call to Action */}
			<section className="py-5 py-lg-7 bg-light">
				<div className="container">
					<div className="row justify-content-center">
						<div className="col-lg-8 text-center">
							<h2 className="mb-3">Have a project in mind?</h2>
							<p className="mb-4 lead text-muted">
								Let's discuss how we can bring your ideas to life with our
								expertise in web development, design, and branding.
							</p>
							<div className="d-flex justify-content-center">
								<Link href="/contact" className="btn btn-primary">
									<i className="bi bi-envelope me-2"></i>
									Get in Touch
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
