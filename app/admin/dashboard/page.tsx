"use client";

import { createClient } from "@/lib/supabase/client";
import { handleLogout } from "@/lib/auth-utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TestimonialManager from "@/app/components/admin/TestimonialManager";

export default function Dashboard() {
	const [user, setUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	const [activeTab, setActiveTab] = useState<"overview" | "testimonials">(
		"overview",
	);
	const router = useRouter();
	const supabase = createClient();

	useEffect(() => {
		const getUser = async () => {
			console.log("Dashboard: Getting user...");
			const {
				data: { user },
			} = await supabase.auth.getUser();
			console.log("Dashboard: User data:", user);
			if (!user) {
				console.log("Dashboard: No user found, redirecting to login");
				router.push("/login/v1");
				return;
			}
			setUser(user);
			setLoading(false);
		};

		getUser();

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			console.log("Dashboard: Auth state changed:", session);
			if (!session?.user) {
				console.log("Dashboard: No session, redirecting to login");
				router.push("/login/v1");
			} else {
				console.log("Dashboard: Session found, setting user:", session.user);
				setUser(session.user);
			}
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, [router, supabase]);

	const getDisplayName = () => {
		if (!user) return "Admin";

		if (user.user_metadata?.display_name) {
			return user.user_metadata.display_name;
		}

		if (user.user_metadata?.full_name) {
			return user.user_metadata.full_name;
		}

		if (user.email) {
			return user.email.split("@")[0];
		}

		return "Admin";
	};

	if (loading) {
		return (
			<div className="container mt-5">
				<div className="text-center">
					<div className="spinner-border" role="status">
						<span className="visually-hidden">Loading...</span>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-12">
					<div className="d-flex justify-content-between align-items-center mb-4">
						<h1>Dashboard</h1>
						<Link href="/" className="btn btn-outline-secondary">
							← Back to Home
						</Link>
					</div>

					{/* Navigation Tabs */}
					<ul className="nav nav-tabs mb-4">
						<li className="nav-item">
							<button
								className={`nav-link ${activeTab === "overview" ? "active" : ""}`}
								onClick={() => setActiveTab("overview")}
							>
								<i className="bi bi-speedometer2 me-2"></i>Overview
							</button>
						</li>
						<li className="nav-item">
							<button
								className={`nav-link ${activeTab === "testimonials" ? "active" : ""}`}
								onClick={() => setActiveTab("testimonials")}
							>
								<i className="bi bi-chat-quote me-2"></i>Testimonials
							</button>
						</li>
					</ul>

					{/* Tab Content */}
					{activeTab === "overview" && (
						<div className="row">
							<div className="col-md-6 mb-4">
								<div className="card">
									<div className="card-body">
										<h5 className="card-title">
											<i className="bi bi-person-circle me-2"></i>
											User Information
										</h5>
										<p className="card-text">
											<strong>Email:</strong> {user?.email || "N/A"}
											<br />
											<strong>User ID:</strong> {user?.id || "N/A"}
											<br />
											<strong>Last Sign In:</strong>{" "}
											{user?.last_sign_in_at
												? new Date(user.last_sign_in_at).toLocaleString()
												: "N/A"}
											<br />
											<strong>Created:</strong>{" "}
											{user?.created_at
												? new Date(user.created_at).toLocaleString()
												: "N/A"}
										</p>
									</div>
								</div>
							</div>

							<div className="col-md-6 mb-4">
								<div className="card">
									<div className="card-body">
										<h5 className="card-title">
											<i className="bi bi-gear me-2"></i>
											Quick Actions
										</h5>
										<div className="d-grid gap-2">
											<Link
												href="/profile/settings"
												className="btn btn-outline-primary"
											>
												<i className="bi bi-gear me-2"></i>
												Profile Settings
											</Link>
											<button
												className="btn btn-outline-danger"
												onClick={async () => await handleLogout("/")}
											>
												<i className="bi bi-box-arrow-right me-2"></i>
												Sign Out
											</button>
										</div>
									</div>
								</div>
							</div>

							<div className="col-12">
								<div className="card">
									<div className="card-body">
										<h5 className="card-title">
											<i className="bi bi-info-circle me-2"></i>
											Welcome back, {getDisplayName()}!
										</h5>
										<p className="card-text">
											This is your personal dashboard. From here you can manage
											your profile settings and view your account information.
										</p>
									</div>
								</div>
							</div>
						</div>
					)}

					{activeTab === "testimonials" && (
						<div>
							<div className="d-flex justify-content-between align-items-center mb-4">
								<h3>
									<i className="bi bi-chat-quote me-2"></i>
									Testimonial Management
								</h3>
								<Link
									href="/testimonials/submit"
									className="btn btn-primary"
									target="_blank"
								>
									<i className="bi bi-plus-circle me-2"></i>
									Add Testimonial
								</Link>
							</div>
							<TestimonialManager />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
