"use client";
import {SidebarItemProps} from "@/app/interfaces/Sidebar";
import Link from "next/link";
import {usePathname} from "next/navigation";

const SidebarItem = ({icon, path, title}: SidebarItemProps) => {
	const pathName = usePathname();

	return (
		<li>
			<Link
				href={path}
				className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white
                                       
                    ${
											path === pathName
												? "bg-gradient-to-r from-sky-600 to-cyan-400"
												: "bg-gradient-to-r from-gray-600 to-gray-400"
										}
                    `}
			>
				{icon}
				<span className="-mr-1 font-medium">{title}</span>
			</Link>
		</li>
	);
};

export default SidebarItem;
