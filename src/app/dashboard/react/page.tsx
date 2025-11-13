"use client";
import {useEffect, useState} from "react";

function Child({
	name = "Se activa por que aunque no se le pasan props, al estar en el componente padre el render del padre activa el render del hijo",
}: {
	name?: string;
}) {
	console.log("Render hijo");

	const [highlight, setHighlight] = useState(false);

	useEffect(() => {
		// Activa el highlight brevemente cada vez que el componente se renderiza
		setHighlight(true);
		const timeout = setTimeout(() => setHighlight(false), 2000);
		return () => clearTimeout(timeout);
	}, [setHighlight]);

	return (
		<p
			className={`border-2 w-[500px] h-[80px] transition-all duration-500 p-2 ${
				highlight
					? "border-amber-400 shadow-md scale-105"
					: "border-transparent shadow-none scale-100"
			}`}
		>
			qwerty
			{name}
		</p>
	);
}

const Parent = () => {
	const [count, setCount] = useState(0);

	return (
		<div className="flex flex-col gap-4 ">
			<div>
				<button
					onClick={() => setCount(count + 1)}
					className="bg-blue-500 text-white p-2 rounded-md hover:cursor-pointer"
				>
					Incrementar
				</button>
			</div>
			<Child key={count} />
		</div>
	);
};
export default Parent;
