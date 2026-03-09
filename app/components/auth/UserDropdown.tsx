"use client";

import { handleLogout } from "@/lib/auth-utils";
import { useEffect } from "react";
import Link from "next/link";

interface UserDropdownProps {
	user: any;
}

export default function UserDropdown({ user }: UserDropdownProps) {
	// Re-render when user prop changes
	useEffect(() => {
		// User prop changed
	}, [user]);

	const handleSignOut = async () => {
		await handleLogout("/");
	};

	if (!user) {
		return null;
	}

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
