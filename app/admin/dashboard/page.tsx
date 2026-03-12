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
			<div className="d-flex justify-content-center align-items-center min-vh-100">
				<div className="spinner-border text-primary" role="status">
					<span className="visually-hidden">Loading...</span>
				</div>
			</div>
		);
	}

	return (
		<>
			{/* Welcome Section */}
			<div className="mb-5">
				<h2 className="mb-3">Welcome back, {getDisplayName()}!</h2>
				<p className="text-muted">
					This is your admin dashboard. Monitor your site performance and manage
					content from here.
				</p>
			</div>

			{/* Stats Cards */}
			<div className="row mb-5">
				<div className="col-lg-3 col-md-6 mb-4">
					<div className="stat-card">
						<div className="d-flex justify-content-between align-items-start">
							<div>
								<h3 className="mb-1">24</h3>
								<p className="mb-0 opacity-75">Total Projects</p>
							</div>
							<div className="fs-2 opacity-50">
								<i className="bi bi-folder"></i>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-md-6 mb-4">
					<div
						className="stat-card"
						style={{
							background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
						}}
					>
						<div className="d-flex justify-content-between align-items-start">
							<div>
								<h3 className="mb-1">156</h3>
								<p className="mb-0 opacity-75">Testimonials</p>
							</div>
							<div className="fs-2 opacity-50">
								<i className="bi bi-chat-quote"></i>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-md-6 mb-4">
					<div
						className="stat-card"
						style={{
							background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
						}}
					>
						<div className="d-flex justify-content-between align-items-start">
							<div>
								<h3 className="mb-1">89</h3>
								<p className="mb-0 opacity-75">Contact Messages</p>
							</div>
							<div className="fs-2 opacity-50">
								<i className="bi bi-envelope"></i>
							</div>
						</div>
					</div>
				</div>
				<div className="col-lg-3 col-md-6 mb-4">
					<div
						className="stat-card"
						style={{
							background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
						}}
					>
						<div className="d-flex justify-content-between align-items-start">
							<div>
								<h3 className="mb-1">12</h3>
								<p className="mb-0 opacity-75">Services</p>
							</div>
							<div className="fs-2 opacity-50">
								<i className="bi bi-briefcase"></i>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
