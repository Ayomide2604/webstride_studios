"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import PageHeader from "./PageHeader";

const HeaderWrapper = () => {
	const pathname = usePathname();
	
	// Use transparent header only for home page
	const isHomePage = pathname === "/";
	
	return isHomePage ? <Header /> : <PageHeader />;
};

export default HeaderWrapper;
