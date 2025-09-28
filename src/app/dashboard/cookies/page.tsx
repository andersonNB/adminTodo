import TabBar from "@/components/TabBar/TabBar";
import React from "react";

export const metadata = {
	title: "Cookies page",
	description: "SEO title",
};

const CookiesPage = () => {
	return (
		<div className="gri grid-cols-1 sm:grid-cols-2 gap-3">
			<div className="flex flex-col">
				<span className="text-3xl">CookiesPage</span>
				<TabBar />
			</div>
		</div>
	);
};

export default CookiesPage;
