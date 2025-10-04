import Image from "next/image";
import logo from "../../../assets/Instatus_light.svg";
import SidebarItem from "./SidebarItem";
import {
	IoCalendar,
	IoCheckboxOutline,
	IoListOutline,
	IoPerson,
} from "react-icons/io5";
import {SidebarItemProps} from "@/app/interfaces/Sidebar";
import {LiaCookieSolid} from "react-icons/lia";
import {FaProductHunt} from "react-icons/fa";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./LogoutButton";

const menuItems: SidebarItemProps[] = [
	{
		icon: <IoCalendar />,
		title: "Dashboard",
		path: "/dashboard",
	},
	{
		icon: <IoCheckboxOutline />,
		title: "Rest TODOS",
		path: "/dashboard/rest-todos",
	},
	{
		icon: <IoListOutline />,
		title: "Server Actions",
		path: "/dashboard/server-todos",
	},
	{
		icon: <LiaCookieSolid />,
		title: "Cookies",
		path: "/dashboard/cookies",
	},
	{
		icon: <FaProductHunt />,
		title: "Products",
		path: "/dashboard/products",
	},
	{
		icon: <IoPerson />,
		title: "Profile",
		path: "/dashboard/profile",
	},
];

const Sidebar = async () => {
	const session = await getServerSession(authOptions);
	const {user} = session ?? {};

	return (
		<aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
			<div>
				<div className="-mx-6 px-6 py-4">
					{/* TODO: Next/Link hacia dashboard */}
					<a href="#" title="home">
						{/* Next/Image */}
						<Image
							src={logo}
							alt="tailus logo"
							width={44}
							height={44}
							className="rounded-full"
						/>
					</a>
				</div>

				<div className="mt-8 text-center">
					{/* Next/Image */}
					<Image
						src={user?.image ?? logo}
						alt=""
						width={40}
						height={40}
						className="m-auto rounded-full object-cover lg:w-28 lg:h-28"
					/>
					<h5 className=" mt-4 text-xl font-semibold text-gray-600  ">
						{user?.name ?? "Cargando..."}
					</h5>
					<span className="text-gray-400 lg:block">Admin</span>
				</div>

				<div className=" max-h-[40%]  overflow-hidden overflow-y-auto">
					<ul className="w-full space-y-2 tracking-wide mt-8">
						{menuItems.map((item) => (
							<SidebarItem {...item} key={item.path} />
						))}
					</ul>
				</div>
			</div>

			<div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
				<LogoutButton />
			</div>
		</aside>
	);
};

export default Sidebar;
