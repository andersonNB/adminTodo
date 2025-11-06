"use client";
import {useState} from "react";

function Child({name}: {name: string}) {
	console.log("Render hijo");
	return <p>Hola {name}</p>;
}

const Parent = () => {
	const [count, setCount] = useState(0);
	//no commentss
	return (
		<div>
			<button
				onClick={() => setCount(count + 1)}
				className="bg-blue-500 text-white p-2 rounded-md"
			>
				Incrementar
			</button>
			<Child name="Anderson" />
		</div>
	);
};
export default Parent;
