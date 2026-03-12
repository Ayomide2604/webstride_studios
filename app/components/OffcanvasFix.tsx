"use client";

import { useEffect } from "react";

declare global {
	interface Window {
		themeFixApplied?: boolean;
		theme?: any;
	}
}

const OffcanvasFix = () => {
	useEffect(() => {
		// Simple fix: disable theme.js interference for our elements
		const disableThemeJSForOurElements = () => {
			// Find our theme toggle dropdowns
			const ourThemeToggles = document.querySelectorAll(
				'[data-theme-js-ignore="true"] button[data-bs-toggle="dropdown"]',
			);

			ourThemeToggles.forEach((button) => {
				// Remove existing listeners to avoid duplicates
				const newButton = button.cloneNode(true) as HTMLElement;
				button.parentNode?.replaceChild(newButton, button);

				// Add click handler that only blocks theme.js, not Bootstrap
				newButton.addEventListener(
					"click",
					function (e) {
						console.log(
							"OffcanvasFix: Theme toggle clicked, blocking theme.js",
						);
						// Let Bootstrap handle the dropdown first
						setTimeout(() => {
							// Then prevent theme.js from interfering
							e.stopImmediatePropagation();
						}, 10);
					},
					true,
				);
			});

			// Find our offcanvas buttons
			const ourOffcanvasBtns = document.querySelectorAll(
				'[data-theme-js-ignore="true"].offcanvas-nav-btn',
			);

			ourOffcanvasBtns.forEach((button) => {
				// Remove existing listeners to avoid duplicates
				const newButton = button.cloneNode(true) as HTMLElement;
				button.parentNode?.replaceChild(newButton, button);

				// Add click handler that only blocks theme.js, not Bootstrap
				newButton.addEventListener(
					"click",
					function (e) {
						// Let Bootstrap handle the offcanvas first
						setTimeout(() => {
							// Then prevent theme.js from interfering
							e.stopImmediatePropagation();
						}, 10);
					},
					true,
				);
			});
		};

		// Apply fix immediately and periodically
		disableThemeJSForOurElements();

		// Re-apply periodically in case theme.js re-initializes
		const interval = setInterval(disableThemeJSForOurElements, 500);

		// Also re-apply on DOM changes
		const observer = new MutationObserver(() => {
			setTimeout(disableThemeJSForOurElements, 50);
		});

		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		return () => {
			clearInterval(interval);
			observer.disconnect();
		};
	}, []);

	return null;
};

export default OffcanvasFix;
