"use client";
import {useState} from "react";

function Child({name}: {name: string}) {
	console.log("Render hijo");
	return <p>Hola {name}</p>;
}

const Parent = () => {
	const [count, setCount] = useState(0);

	return (
		<div>
			<button onClick={() => setCount(count + 1)}>Incrementar</button>
			<Child name="Anderson" />
		</div>
	);
};
export default Parent;
