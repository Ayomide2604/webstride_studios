import type { Metadata } from "next";
import Script from "next/script";
import { createClient } from "@/lib/supabase/server";

// import global css file
import "./globals.css";
// import bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";

import BootstrapClient from "./utils/BootstrapClient";

// custom css
import "../public/assets/fonts/css/boxicons.min.css";
import "../public/assets/css/theme.min.css";

// Bootstrap Icons CDN
import "bootstrap-icons/font/bootstrap-icons.min.css";

// Layout components
import HeaderWrapper from "./components/HeaderWrapper";
import Footer from "./components/Footer";
import ThemeToggleScript from "./components/ThemeToggleScript";
import ScrollToTop from "./components/ScrollToTop";

export const metadata: Metadata = {
	title: "Webstride Studios",
	description: "Webstride Studios - Your trusted web development partner",
	icons: {
		icon: "/favicon.svg",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	// Get authentication state on server side
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<html lang="en">
			<body>
				<ThemeToggleScript />
				<BootstrapClient />
				<div className="content-wrapper">
					<HeaderWrapper user={user} />
					<main>{children}</main>
					<Footer />
				</div>
				<ScrollToTop />

				<Script
					src="https://cdnjs.cloudflare.com/ajax/libs/headhesive/1.2.4/headhesive.min.js"
					integrity="sha512-..."
					crossOrigin="anonymous"
				/>
				<Script
					src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
					integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
					crossOrigin="anonymous"
				/>
				<Script src="/assets/js/theme.min.js" strategy="afterInteractive" />
			</body>
		</html>
	);
}
