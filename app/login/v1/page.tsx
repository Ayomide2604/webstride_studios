"use client";

import { createClient } from "@/lib/supabase/client";
import { handleSignIn } from "@/lib/auth-utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [message, setMessage] = useState("");
	const router = useRouter();
	const supabase = createClient();

	useEffect(() => {
		// Check if user is already logged in
		const checkUser = async () => {
			const {
				data: { user },
			} = await supabase.auth.getUser();
			if (user) {
				router.push("/dashboard");
			}
		};
		checkUser();
	}, [router, supabase]);

	const handleLoginSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setMessage("");

		const result = await handleSignIn(email, password, "/dashboard");

		if (!result.success) {
			setError(result.error);
		}
		// If successful, the hard redirect will handle navigation

		setLoading(false);
	};

	const handlePasswordReset = async () => {
		if (!email) {
			setError("Please enter your email address first");
			return;
		}

		setLoading(true);
		setError("");
		setMessage("");

		try {
			const { error } = await supabase.auth.resetPasswordForEmail(email, {
				redirectTo: `${window.location.origin}/auth/reset-password`,
			});

			if (error) throw error;
			setMessage("Check your email for the password reset link!");
		} catch (error: any) {
			setError(error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="container mt-5">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-5">
					<div className="card shadow">
						<div className="card-body p-4 p-md-5">
							<div className="text-center mb-4">
								<h2 className="card-title mb-3">Sign In</h2>
								<p className="text-muted">
									Welcome back! Please sign in to your account
								</p>
							</div>

							{error && (
								<div className="alert alert-danger" role="alert">
									{error}
								</div>
							)}
							{message && (
								<div className="alert alert-success" role="alert">
									{message}
								</div>
							)}

							<form onSubmit={handleLoginSubmit}>
								<div className="mb-3">
									<label htmlFor="email" className="form-label">
										Email address
									</label>
									<input
										type="email"
										className="form-control form-control-lg"
										id="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
										disabled={loading}
										placeholder="Enter your email"
									/>
								</div>
								<div className="mb-4">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<input
										type="password"
										className="form-control form-control-lg"
										id="password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
										disabled={loading}
										minLength={6}
										placeholder="Enter your password"
									/>
								</div>
								<button
									type="submit"
									className="btn btn-primary btn-lg w-100 mb-3"
									disabled={loading}
								>
									{loading ? "Loading..." : "Sign In"}
								</button>
							</form>

							<div className="text-center mb-3">
								<button
									type="button"
									className="btn btn-link p-0 text-decoration-none"
									onClick={handlePasswordReset}
									disabled={loading}
								>
									Forgot your password?
								</button>
							</div>

							<div className="text-center mt-4">
								<Link href="/" className="btn btn-outline-secondary">
									← Back to Home
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
