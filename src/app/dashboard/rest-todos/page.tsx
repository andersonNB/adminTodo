import React from "react";
import prisma from "@/lib/prisma";
import {TodosGrid} from "@/app/todos";

export const metadata = {
	title: "Listado de todos",
	description: "SEO title",
};

export default async function RestTodos() {
	const todos = await prisma.todo.findMany({orderBy: {description: "asc"}});

	//normalmente podriamos hacer esto en un client componentes para obtener la data del api
	//pero aprovechamos los server Compoentnes y prisma para hacer esto, ya que un server componente puede ser asincrono
	/*useEffect(() => {
		async function todos() {
			fetch("/api/todos")
				.then((resp) => resp.json())
				.then((res) => console.log(res));
		}

		console.log(todos());
	}, []);
*/
	return (
		<div>
			<TodosGrid todos={todos} />
		</div>
	);
}
