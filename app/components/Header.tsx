"use client";
import Image from "next/image";
import logoDark from "../../public/assets/images/logo/logo-dark.svg";
import logo from "../../public/assets/images/logo/logo-black.svg";

const Header = () => {
	return (
		<header>
			<nav className="navbar navbar-expand-lg transparent navbar-transparent navbar-dark">
				<div className="container px-3">
					<a className="navbar-brand" href="index.html">
						<Image
							src={logoDark}
							alt="Logo"
							width={200}
							height={50}
							className="main-logo"
						/>
						<Image
							src={logo}
							alt="Logo"
							width={170}
							height={50}
							className="scroll-logo"
							style={{ display: "none" }}
						/>
					</a>
					<button className="navbar-toggler offcanvas-nav-btn" type="button">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div
						className="offcanvas offcanvas-start offcanvas-nav"
						style={{ width: "20rem" }}
					>
						<div className="offcanvas-header">
							<a href="index.html" className="text-inverse">
								<Image src={logo} alt="Logo" width={150} height={40} />
							</a>
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
									<a className="nav-link" href="/">
										Home
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/about">
										About
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/services">
										Services
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/projects">
										Projects
									</a>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="/contact">
										Contact
									</a>
								</li>
							</ul>
							<div className="mt-3 mt-lg-0 d-flex align-items-center">
								<a href="/contact" className="btn btn-light mx-2">
									Contact Us
								</a>
								<a href="/quote" className="btn btn-primary">
									Get a Quote
								</a>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
