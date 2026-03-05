"use client";
import Image from "next/image";
import Link from "next/link";
import logoDark from "../../public/assets/images/logo/logo-dark.svg";
import logo from "../../public/assets/images/logo/logo-black.svg";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
	return (
		<header>
			<nav className="navbar navbar-expand-lg transparent navbar-transparent navbar-dark">
				<div className="container px-3">
					<Link className="navbar-brand" href="/">
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
					</Link>
					<button className="navbar-toggler offcanvas-nav-btn" type="button">
						<span className="navbar-toggler-icon"></span>
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
								<Link href="/quote" className="btn btn-primary">
									Get a Quote
								</Link>
								<div className="ms-3 d-flex align-items-center justify-content-lg-end">
									<ThemeToggle />
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
