import React from "react";
import prisma from "@/lib/prisma";
import {NewTodo} from "@/app/todos/components/NewTodo";
import {TodosGrid} from "@/app/todos";

export const metadata = {
	title: "Server actions",
	description: "SEO title",
};

const ServerTodosPage = async () => {
	const todos = await prisma.todo.findMany({orderBy: {description: "asc"}});

	return (
		<div>
			qwerty
			<div className="w-full px-3 mx-5 mb-5">
				<NewTodo />
			</div>
			<TodosGrid todos={todos} />
		</div>
	);
};

export default ServerTodosPage;
