// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12

import Sidebar from "@/components/Sidebar/Sidebar";
import TopMenu from "@/components/TopMenu/TopMenu";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import {authOptions} from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/api/auth/signin");
	}
	return (
		<>
			{/* TODO: src/components <Sidebar /> */}
			<Sidebar />
			{/*TODO: Fin del <Sidebar /> */}

			{/* Main Layout content - Contenido principal del Layout */}
			<div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
				{/* TODO: src/components <TopMenu /> */}
				<TopMenu />
				{/* TODO: Fin del <TopMenu /> */}
				{/* TODO: Contenido en el Layout.tsx */}
				<div className="px-6 pt-6 bg-white p-2 m-2 rounded text-black">
					{children}
				</div>
			</div>
		</>
	);
}
