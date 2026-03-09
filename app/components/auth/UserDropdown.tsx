"use client";

import { handleLogout } from "@/lib/auth-utils";
import { useEffect } from "react";
import Link from "next/link";

interface UserDropdownProps {
	user: any;
}

export default function UserDropdown({ user }: UserDropdownProps) {
	console.log("UserDropdown: Received user prop:", user);

	// Re-render when user prop changes
	useEffect(() => {
		console.log("UserDropdown: User prop changed:", user);
	}, [user]);

	const handleSignOut = async () => {
		console.log("UserDropdown: Logout button clicked");
		await handleLogout("/");
	};

	if (!user) {
		console.log("UserDropdown: No user, returning null");
		return null;
	}

	console.log("UserDropdown: Rendering dropdown for admin");
	return (
		<div className="dropdown">
			<button
				className="btn btn-link text-decoration-none text-muted p-0 dropdown-toggle"
				type="button"
				data-bs-toggle="dropdown"
				aria-expanded="false"
			>
				Admin
			</button>

			<ul className="dropdown-menu dropdown-menu-end">
				<li>
					<Link className="dropdown-item" href="/dashboard">
						<i className="bi bi-speedometer2 me-2"></i>
						Dashboard
					</Link>
				</li>
				<li>
					<Link className="dropdown-item" href="/profile/settings">
						<i className="bi bi-gear me-2"></i>
						Settings
					</Link>
				</li>
				<li>
					<hr className="dropdown-divider" />
				</li>
				<li>
					<button
						type="button"
						className="dropdown-item text-danger text-start w-100 border-0 bg-transparent"
						onClick={handleSignOut}
					>
						<i className="bi bi-box-arrow-right me-2"></i>
						Logout
					</button>
				</li>
			</ul>
		</div>
	);
}
