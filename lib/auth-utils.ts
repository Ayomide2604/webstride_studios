"use client";

import { createClient } from "./supabase/client";

export const handleLogout = async (redirectUrl: string = "/") => {
	try {
		const supabase = createClient();
		const { error } = await supabase.auth.signOut();

		if (error) {
			console.error("AuthUtils: Error signing out:", error.message);
			return;
		}

		// Clear localStorage safely
		if (typeof window !== "undefined") {
			localStorage.removeItem("user");
		}

		// Force a hard redirect to ensure all components re-render with new auth state
		window.location.href = redirectUrl;
	} catch (error) {
		console.error("AuthUtils: Unexpected error during sign out:", error);
	}
};

export const handleSignIn = async (
	email: string,
	password: string,
	redirectUrl: string = "/admin/dashboard",
) => {
	try {
		const supabase = createClient();
		const { error, data } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		if (error) throw error;

		// Store user in localStorage for immediate navbar update
		if (typeof window !== "undefined" && data.user) {
			localStorage.setItem("user", JSON.stringify(data.user));
		}

		// Force a hard redirect to ensure all components re-render with new auth state
		window.location.href = redirectUrl;

		return { success: true, data };
	} catch (error: any) {
		return { success: false, error: error.message };
	}
};
