"use client";

import { useEffect } from "react";

const ThemeToggleScript = () => {
	useEffect(() => {
		// Theme switching functionality
		const getStoredTheme = () => {
			if (typeof window !== "undefined") {
				return localStorage.getItem("theme");
			}
			return null;
		};

		const setStoredTheme = (theme: string) => {
			if (typeof window !== "undefined") {
				localStorage.setItem("theme", theme);
			}
		};

		const getPreferredTheme = () => {
			const storedTheme = getStoredTheme();
			if (storedTheme) {
				return storedTheme;
			}
			if (typeof window !== "undefined") {
				return window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light";
			}
			return "light";
		};

		const setTheme = (theme: string) => {
			if (typeof document !== "undefined") {
				const htmlElement = document.documentElement;
				if (theme === "auto") {
					const prefersDark = window.matchMedia(
						"(prefers-color-scheme: dark)",
					).matches;
					htmlElement.setAttribute(
						"data-bs-theme",
						prefersDark ? "dark" : "light",
					);
				} else {
					htmlElement.setAttribute("data-bs-theme", theme);
				}
			}
		};

		const showActiveTheme = (theme: string) => {
			if (typeof document === "undefined") return;

			// Update all theme toggle instances (both original and cloned)
			const activeThemeIcons = document.querySelectorAll(
				".theme-icon-active i",
			);
			const btnToActive = document.querySelector(
				`[data-bs-theme-value="${theme}"]`,
			);
			const svgOfActiveBtn = btnToActive
				?.querySelector("i")
				?.getAttribute("class");

			if (svgOfActiveBtn) {
				// Update all theme buttons
				document
					.querySelectorAll("[data-bs-theme-value]")
					.forEach((element) => {
						element.classList.remove("active");
						element.setAttribute("aria-pressed", "false");
					});

				// Activate current theme buttons
				document
					.querySelectorAll(`[data-bs-theme-value="${theme}"]`)
					.forEach((element) => {
						element.classList.add("active");
						element.setAttribute("aria-pressed", "true");
					});

				// Update all theme icons
				activeThemeIcons.forEach((icon) => {
					icon.setAttribute("class", svgOfActiveBtn);
				});
			}
		};

		// Initialize theme
		const initialTheme = getPreferredTheme();
		setTheme(initialTheme);
		showActiveTheme(initialTheme);

		// Handle theme toggle clicks with better event handling
		const handleThemeClick = (event: Event) => {
			const target = event.target as HTMLElement;
			const element = target.closest("[data-bs-theme-value]");
			if (element) {
				const theme = element.getAttribute("data-bs-theme-value");
				if (theme) {
					setStoredTheme(theme);
					setTheme(theme);
					showActiveTheme(theme);
				}
			}
		};

		// Add event listeners to document
		if (typeof document !== "undefined") {
			document.addEventListener("click", handleThemeClick, true); // Use capture mode
		}

		// Handle system theme changes for auto mode
		const handleSystemThemeChange = () => {
			const storedTheme = getStoredTheme();
			if (storedTheme === "auto") {
				setTheme("auto");
				showActiveTheme("auto");
			}
		};

		if (typeof window !== "undefined") {
			const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			mediaQuery.addEventListener("change", handleSystemThemeChange);
		}

		// Poll for navbar clone creation (more reliable than MutationObserver)
		const checkForNavbarClone = () => {
			const navbarClone = document.querySelector(".navbar-clone");
			if (navbarClone) {
				const currentTheme = getStoredTheme() || getPreferredTheme();
				showActiveTheme(currentTheme);
			}
		};

		// Check immediately and then periodically
		checkForNavbarClone();
		const intervalId = setInterval(checkForNavbarClone, 500);

		// Also use MutationObserver as backup
		const observer = new MutationObserver(() => {
			checkForNavbarClone();
		});

		if (typeof document !== "undefined") {
			observer.observe(document.body, {
				childList: true,
				subtree: true,
			});
		}

		// Cleanup
		return () => {
			if (typeof document !== "undefined") {
				document.removeEventListener("click", handleThemeClick, true);
				observer.disconnect();
				clearInterval(intervalId);
			}
			if (typeof window !== "undefined") {
				const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
				mediaQuery.removeEventListener("change", handleSystemThemeChange);
			}
		};
	}, []);

	return null;
};

export default ThemeToggleScript;
