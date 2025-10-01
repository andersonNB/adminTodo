import WidgetItem from "@/components/WidgetItem/WidgetItem";
import React from "react";
import {IoHammerOutline} from "react-icons/io5";

const DashboardPages = () => {
	return (
		<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			<WidgetItem title="Desde dashboard">
				<IoHammerOutline />
			</WidgetItem>
		</div>
	);
};

export default DashboardPages;
