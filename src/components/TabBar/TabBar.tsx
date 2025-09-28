// https://tailwindcomponents.com/component/radio-buttons-1
"use client";
import {setCookie} from "cookies-next";
import {useState} from "react";

interface Props {
	currentTab?: number;
	tabOptions?: number[];
}

export const TabBar = ({currentTab = 1, tabOptions = [1, 2, 3, 4]}: Props) => {
	const [selected, setSelected] = useState(currentTab);

	const onTabSelected = (tab: number) => {
		setSelected(tab);
		setCookie("selectedTab", tab.toString());
	};

	return (
		<div className="grid w-full grid-cols-4 space-x-2 space-y-2 rounded-xl bg-gray-200 p-2">
			{tabOptions?.map((tab) => {
				return (
					<div key={tab} className="bg-gray-50">
						<input
							type="radio"
							id={`tab-${tab}`}
							className="peer hidden"
							checked={selected === tab}
							onChange={() => onTabSelected(tab)}
						/>
						<label
							//	onClick={() => onTabSelected(tab)}
							htmlFor={`tab-${tab}`}
							className=" transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
						>
							{tab}
						</label>
					</div>
				);
			})}
		</div>
	);
};

export default TabBar;
