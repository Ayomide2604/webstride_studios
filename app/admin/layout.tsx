"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "../../public/assets/images/logo/logo.svg";

interface AdminLayoutProps {
	children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const pathname = usePathname();

	const menuItems = [
		{
			href: "/admin/dashboard",
			icon: "bx bx-home",
			label: "Dashboard",
		},
		{
			href: "/admin/testimonials",
			icon: "bx bx-chat",
			label: "Testimonials",
		},
		{
			href: "/admin/contact",
			icon: "bx bx-envelope",
			label: "Contact Messages",
		},
		{
			href: "/admin/settings",
			icon: "bx bx-cog",
			label: "Settings",
		},
	];

	return (
		<div>
			{/* Mobile Header */}
			<div className="d-md-none bg-white border-bottom p-3">
				<div className="d-flex align-items-center justify-content-between">
					<Link href="/admin/dashboard" className="text-decoration-none">
						<Image src={logo} alt="Logo" width={120} height={40} />
					</Link>
					<button
						className="btn btn-outline-secondary"
						onClick={() => setSidebarOpen(!sidebarOpen)}
					>
						<i className="bi bi-list"></i>
					</button>
				</div>
			</div>

			{/* Main Content */}
			<main>
				<section className="py-lg-7 py-5 bg-light-subtle">
					<div className="container">
						<div className="row">
							{/* Sidebar */}
							<div className="col-lg-3 col-md-4">
								<div className="d-flex align-items-center mb-4 justify-content-center justify-content-md-start">
									<div className="avatar avatar-lg rounded-circle bg-primary text-white d-flex align-items-center justify-content-center">
										<i className="bi bi-person-fill fs-4"></i>
									</div>
									<div className="ms-3">
										<h5 className="mb-0">Admin User</h5>
										<small>Administrator</small>
									</div>
								</div>

								{/* Mobile Menu Toggle */}
								<div className="d-md-none text-center d-grid">
									<button
										className="btn btn-light mb-3 d-flex align-items-center justify-content-between"
										type="button"
										onClick={() => setSidebarOpen(!sidebarOpen)}
									>
										Account Menu
										<i className="bi bi-chevron-down ms-2"></i>
									</button>
								</div>

								{/* Navigation */}
								<div className={`${sidebarOpen ? "d-block" : "d-md-block"}`}>
									<ul className="nav flex-column nav-account">
										{menuItems.map((item) => (
											<li key={item.href} className="nav-item">
												<Link
													href={item.href}
													className={`nav-link d-flex align-items-center ${
														pathname === item.href ? "active" : ""
													}`}
												>
													<i className={`${item.icon} align-bottom`}></i>
													<span className="ms-2">{item.label}</span>
												</Link>
											</li>
										))}
										<li className="nav-item">
											<Link
												href="/"
												className="nav-link d-flex align-items-center text-danger"
											>
												<i className="bx bx-log-out align-bottom"></i>
												<span className="ms-2">Sign Out</span>
											</Link>
										</li>
									</ul>
								</div>
							</div>

							{/* Main Content Area */}
							<div className="col-lg-9 col-md-8">{children}</div>
						</div>
					</div>
				</section>
			</main>

			{/* Mobile Sidebar Overlay */}
			{sidebarOpen && (
				<div
					className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
					style={{ zIndex: 1040 }}
					onClick={() => setSidebarOpen(false)}
				></div>
			)}
		</div>
	);
};

export default AdminLayout;
