"use client";

import { createClient } from "./supabase/client";

export const handleLogout = async (redirectUrl: string = "/") => {
	console.log("AuthUtils: handleLogout called with redirectUrl:", redirectUrl);
	try {
		console.log("AuthUtils: Signing out...");

		const supabase = createClient();
		console.log("AuthUtils: Supabase client created");

		const { error } = await supabase.auth.signOut();
		console.log("AuthUtils: signOut completed, error:", error);

		if (error) {
			console.error("AuthUtils: Error signing out:", error.message);
			return;
		}

		console.log("AuthUtils: Successfully signed out");

		// Clear localStorage safely
		if (typeof window !== "undefined") {
			console.log("AuthUtils: Clearing localStorage");
			localStorage.removeItem("user");
		}

		console.log("AuthUtils: Redirecting to:", redirectUrl);
		// Force a hard redirect to ensure all components re-render with new auth state
		window.location.href = redirectUrl;
	} catch (error) {
		console.error("AuthUtils: Unexpected error during sign out:", error);
	}
};

export const handleSignIn = async (
	email: string,
	password: string,
	redirectUrl: string = "/dashboard",
) => {
	try {
		console.log("AuthUtils: Attempting sign in with:", email);

		const supabase = createClient();
		const { error, data } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

		console.log("AuthUtils: Sign in result:", { error, data });

		if (error) throw error;

		console.log("AuthUtils: Sign in successful, redirecting");

		// Store user in localStorage for immediate navbar update
		if (typeof window !== "undefined" && data.user) {
			localStorage.setItem("user", JSON.stringify(data.user));
		}

		// Force a hard redirect to ensure all components re-render with new auth state
		window.location.href = redirectUrl;

		return { success: true, data };
	} catch (error: any) {
		console.error("AuthUtils: Sign in error:", error);
		return { success: false, error: error.message };
	}
};
