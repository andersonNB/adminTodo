import React from "react";
import prisma from "@/lib/prisma";
import {TodosGrid} from "@/app/todos";
import NewTodoClientSide from "@/app/todos/components/NewTodoClientSide";
import {getUserSessionServer} from "@/app/auth/actions/auth-actions";

export const metadata = {
	title: "Listado de todos",
	description: "SEO title",
};

export default async function RestTodos() {
	const session = await getUserSessionServer();
	const {id} = session?.user ?? {};

	const todos = await prisma.todo.findMany({
		orderBy: {description: "asc"},
		where: {userId: id},
	});

	//normalmente podriamos hacer esto en un client componentes para obtener la data del api
	//pero aprovechamos los server Components y prisma para hacer esto, ya que un server componente puede ser asincrono
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
			<div className="w-full px-3 mx-5 mb-5">
				{/** <NewTodo />*/}qwerty
				<NewTodoClientSide />
			</div>
			<TodosGrid todos={todos} />
		</div>
	);
}
