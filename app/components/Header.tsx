"use client";
import Image from "next/image";
import Link from "next/link";
import logoDark from "../../public/assets/images/logo/logo.svg";
import logo from "../../public/assets/images/logo/logo.svg";
import ThemeToggle from "./ThemeToggle";
import QuoteModal from "./QuoteModal";
import { useState } from "react";

interface HeaderProps {
	user?: any;
}

const Header = ({ user }: HeaderProps) => {
	const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

	return (
		<>
			<header>
				<nav className="navbar navbar-expand-lg transparent navbar-transparent navbar-dark">
					<div className="container px-3 my-n3">
						<Link className="navbar-brand" href="/">
							<Image
								src={logoDark}
								alt="Logo"
								width={200}
								height={90}
								className="main-logo"
							/>
							<Image
								src={logo}
								alt="Logo"
								width={200}
								height={90}
								className="scroll-logo"
								style={{ display: "none" }}
							/>
						</Link>
						<button
							className="navbar-toggler offcanvas-nav-btn"
							type="button"
							data-bs-toggle="offcanvas"
							data-bs-target="#offcanvasHeader"
							aria-controls="offcanvasHeader"
							data-theme-js-ignore="true"
						>
							<span className="navbar-toggler-icon"></span>
						</button>
						<div
							className="offcanvas offcanvas-start offcanvas-nav"
							id="offcanvasHeader"
							style={{ width: "20rem" }}
						>
							<div className="offcanvas-header">
								<Link href="/" className="text-inverse">
									<Image src={logo} alt="Logo" width={200} height={90} />
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
										<Link className="nav-link" href="/portfolio">
											Portfolio
										</Link>
									</li>
									<li className="nav-item">
										<Link className="nav-link" href="/projects">
											Projects
										</Link>
									</li>
								</ul>

								<div className="mt-3 mt-lg-0 d-flex align-items-center">
									<Link
										href="/contact"
										className="btn btn-light mx-2 d-none d-lg-block"
									>
										Contact Us
									</Link>
									<button
										className="btn btn-primary d-none d-lg-block"
										onClick={() => setIsQuoteModalOpen(true)}
									>
										Get a Quote
									</button>
								</div>

								{/* Mobile-only buttons and controls */}
								<div className="d-lg-none mt-4">
									<div className="d-flex align-items-center gap-2 w-100">
										<Link href="/contact" className="btn btn-light flex-grow-1">
											Contact Us
										</Link>
										<ThemeToggle />
									</div>
									<button
										className="btn btn-primary w-100 mt-2"
										onClick={() => setIsQuoteModalOpen(true)}
									>
										Get a Quote
									</button>
									{user && (
										<div className="mt-4">{/* User dropdown removed */}</div>
									)}
								</div>
							</div>
						</div>
						<div className="ms-3 d-flex align-items-center justify-content-lg-end">
							<div className="d-none d-lg-block">
								<ThemeToggle />
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

export default Header;
