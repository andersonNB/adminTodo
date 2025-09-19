"use client";
import React, {useEffect} from "react";

const RestTodos = () => {
	useEffect(() => {
		async function todos() {
			fetch("/api/todos")
				.then((resp) => resp.json())
				.then((res) => console.log(res));
		}

		//console.log(todos());
	}, []);

	return <div>RestTodos</div>;
};

export default RestTodos;
