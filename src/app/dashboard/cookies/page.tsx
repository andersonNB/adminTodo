import TabBar from "@/components/TabBar/TabBar";
import {cookies} from "next/headers";
import React from "react";

export const metadata = {
	title: "Cookies page",
	description: "SEO title",
};

const CookiesPage = async () => {
	const cookieStore = await cookies();

	const cookieTab = cookieStore.get("selectedTab");

	return (
		<div className="gri grid-cols-1 sm:grid-cols-2 gap-3">
			<div className="flex flex-col">
				<span className="text-3xl">CookiesPage</span>
				<TabBar currentTab={Number(cookieTab?.value) ?? +"1"} />
			</div>
		</div>
	);
};

export default CookiesPage;
