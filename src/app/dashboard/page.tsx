import WidgetItem from "@/components/WidgetItem/WidgetItem";
import {getServerSession} from "next-auth";
import React from "react";
import {IoHammerOutline} from "react-icons/io5";
import {authOptions} from "../api/auth/[...nextauth]/route";

const DashboardPages = async () => {
	const session = await getServerSession(authOptions);

	return (
		<div className="grid gap-6  grid-cols-1 sm:grid-cols-2 ">
			<WidgetItem title="Usuario conectado S-Side">
				<div className="flex flex-col items-center w-2xs">
					<IoHammerOutline />

					<div className="flex flex-col w-full">
						<span>{session?.user?.name ?? "Cargando..."}</span>
						<span>{session?.user?.image ?? "Cargando..."}</span>
						<span>{session?.user?.email ?? "Cargando..."}</span>
					</div>
				</div>
			</WidgetItem>
		</div>
	);
};

export default DashboardPages;
