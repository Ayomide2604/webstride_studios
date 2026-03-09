"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/assets/images/logo/logo.svg";
import ThemeToggle from "./ThemeToggle";
import QuoteModal from "./QuoteModal";
import { useState } from "react";

const PageHeader = () => {
	const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

	return (
		<>
			<header>
				<nav className="navbar navbar-expand-lg navbar-light w-100">
					<div className="container px-3 my-n3">
						<Link className="navbar-brand" href="/">
							<Image src={logo} alt="Logo" width={200} height={90} />
						</Link>
						<button className="navbar-toggler offcanvas-nav-btn" type="button">
							<i className="bi bi-list"></i>
						</button>
						<div
							className="offcanvas offcanvas-start offcanvas-nav"
							style={{ width: "20rem" }}
						>
							<div className="offcanvas-header">
								<Link href="/" className="text-inverse">
									<Image src={logo} alt="Logo" width={150} height={40} />
								</Link>
								<button
									type="button"
									className="btn-close"
									data-bs-dismiss="offcanvas"
									aria-label="Close"
								/>
							</div>
							<div className="offcanvas-body pt-0 align-items-center">
								<ul className="navbar-nav mx-auto align-items-lg-center">
									<li className="nav-item">
										<Link className="nav-link" href="/">
											Home
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="/about">
											About
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="/services">
											Services
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="/projects">
											Projects
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="/contact">
											Contact
										</Link>
									</li>
								</ul>
								<div className="mt-3 mt-lg-0 d-flex align-items-center">
									<Link href="/contact" className="btn btn-light mx-2">
										Contact Us
									</Link>
									<button
										className="btn btn-primary"
										onClick={() => setIsQuoteModalOpen(true)}
									>
										Get a Quote
									</button>
									<div className="ms-3 d-flex align-items-center justify-content-lg-end">
										<ThemeToggle />
									</div>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
			<QuoteModal
				isOpen={isQuoteModalOpen}
				onClose={() => setIsQuoteModalOpen(false)}
			/>
		</>
	);
};

export default PageHeader;
