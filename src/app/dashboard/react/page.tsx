"use client";
import React, {useState, useEffect} from "react";
import clsx from "clsx";

// 🔹 Este componente detecta cuando React re-renderiza a su hijo
const RenderHighlighter: React.FC<{children: React.ReactNode}> = ({
	children,
}) => {
	const [highlight, setHighlight] = useState(false);

	useEffect(() => {
		// Se activa cuando el componente se vuelve a renderizar
		setHighlight(true);
		const timeout = setTimeout(() => setHighlight(false), 500);
		return () => clearTimeout(timeout);
	});

	return (
		<div
			className={clsx(
				"transition-all duration-500 rounded-lg",
				highlight
					? "shadow-[0_0_10px_2px_rgba(255,215,0,0.6)] "
					: "shadow-none blur-0"
			)}
		>
			{children}
		</div>
	);
};

const ChildComponent = () => {
	console.log("render del hijo");
	return (
		<RenderHighlighter>
			<div className="p-4 bg-gray-200 rounded-md">Hijo</div>
		</RenderHighlighter>
	);
};

const BehaviorReactPage = () => {
	const [isChanging, setIsChanging] = useState(false);
	console.log("render del padre ", isChanging);

	return (
		<RenderHighlighter>
			<div
				className={`flex flex-col gap-4 p-4 transition-all ${
					isChanging ? "border-amber-400 border-2" : "border-gray-300 border"
				}`}
			>
				<button
					onClick={() => setIsChanging(!isChanging)}
					className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
				>
					Click
				</button>
				<ChildComponent />
			</div>
		</RenderHighlighter>
	);
};

export default BehaviorReactPage;
