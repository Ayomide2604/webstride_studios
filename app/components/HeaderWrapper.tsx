"use client";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Header from "./Header";
import PageHeader from "./PageHeader";

interface HeaderWrapperProps {
	user?: any;
}

const HeaderWrapper = ({ user: serverUser }: HeaderWrapperProps) => {
	const pathname = usePathname();
	const [user, setUser] = useState<any>(serverUser || null);
	const supabase = createClient();

	console.log("HeaderWrapper: Initializing with pathname:", pathname);
	console.log("HeaderWrapper: Server user:", serverUser);

	// Initialize user from localStorage if no server user
	useEffect(() => {
		if (!serverUser) {
			// Safe localStorage access
			if (typeof window !== "undefined") {
				const storedUser = localStorage.getItem("user");
				if (storedUser) {
					try {
						const parsedUser = JSON.parse(storedUser);
						console.log(
							"HeaderWrapper: Using stored user from localStorage:",
							parsedUser,
						);
						setUser(parsedUser);
					} catch (error) {
						console.error("HeaderWrapper: Error parsing stored user:", error);
						localStorage.removeItem("user");
					}
				}
			}
		} else {
			// Store server user in localStorage
			if (typeof window !== "undefined") {
				localStorage.setItem("user", JSON.stringify(serverUser));
			}
			setUser(serverUser);
		}
	}, [serverUser]);

	useEffect(() => {
		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			console.log("HeaderWrapper: Auth state changed:", session);
			console.log("HeaderWrapper: Setting user to:", session?.user);
			const newUser = session?.user ?? null;
			setUser(newUser);

			// Update localStorage
			if (newUser) {
				if (typeof window !== "undefined") {
					localStorage.setItem("user", JSON.stringify(newUser));
				}
			} else {
				if (typeof window !== "undefined") {
					localStorage.removeItem("user");
				}
			}
		});

		return () => subscription.unsubscribe();
	}, [supabase.auth]);

	// Use Header (with UserDropdown) if user is logged in, otherwise use PageHeader
	// Always use Header with UserDropdown when user is logged in
	const shouldUseHeaderWithAuth = user;

	console.log(
		"HeaderWrapper: shouldUseHeaderWithAuth:",
		shouldUseHeaderWithAuth,
	);
	console.log("HeaderWrapper: user state:", user);

	return shouldUseHeaderWithAuth ? (
		<Header user={user} />
	) : (
		<PageHeader user={user} />
	);
};

export default HeaderWrapper;
