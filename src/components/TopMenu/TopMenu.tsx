import {cookies} from "next/headers"; // se pueden utilizar en server componentes
import React from "react";
import {CiChat1, CiMenuBurger, CiSearch, CiShoppingCart} from "react-icons/ci";

const TopMenu = async () => {
	const cookieStore = await cookies();
	const cart = JSON.parse(cookieStore.get("cart")?.value ?? "{}");

	//si es un server componente la función solo se ejecuta una vez
	const getTotalCount = () => {
		let items = 0;

		Object.values(cart).forEach((value) => {
			items += value as number;
		});
		return items;
	};

	return (
		<div className="sticky z-10 top-0 h-16 border-b bg-white text-black lg:py-2.5">
			<div className="px-6 flex items-center justify-between space-x-4">
				<h5 className="text-2xl text-gray-600  font-medium">Dashboard</h5>
				{/*<button className="w-12 h-16 -mr-2 border-r">
					<CiMenuBurger size={25} />
				</button>*/}
				<div className="flex space-x-2">
					<div className="md:block">
						<div className="relative flex items-center text-gray-400 focus-within:text-cyan-400">
							<span className="absolute left-4 h-6 flex items-center pr-3 border-r border-gray-300">
								<CiSearch />
							</span>
							<input
								type="search"
								name="leadingIcon"
								id="leadingIcon"
								placeholder="Search here"
								className="w-full pl-14 pr-4 py-2.5 rounded-xl text-sm text-gray-600 outline-none border border-gray-300 focus:border-cyan-300 transition"
							/>
						</div>
					</div>

					{/*<button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
						<CiSearch />
					</button>*/}
					<button className="flex items-center justify-center w-10 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
						<CiChat1 size={25} />
					</button>
					<button className="flex items-center justify-center p-2 h-10 rounded-xl border bg-gray-100 focus:bg-gray-100 active:bg-gray-200">
						<span className="text-sm mr-2 text-blue-800  font-bold">
							{/*getCookie("cart")?.toString() mi solucion*/}
							{getTotalCount()}
						</span>
						<CiShoppingCart size={25} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default TopMenu;
