export const dynamic = "force-dynamic";
export const revalidate = 0;

//Con force-dynamic y revalidate siempre tendremos los datos actualizados pero acosta del perfomarce de la aplicación
import React from "react";
import prisma from "@/lib/prisma";
import {NewTodo} from "@/app/todos/components/NewTodo";
import {TodosGrid} from "@/app/todos";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";

export const metadata = {
	title: "Server actions",
	description: "SEO title",
};

const ServerTodosPage = async () => {
	//sesión del lado del servidor
	const session = await getServerSession(authOptions);
	const todos = await prisma.todo.findMany({orderBy: {description: "asc"}});
	console.log("render");
	return (
		<div>
			Server actions
			<div className="w-full px-3 mx-5 mb-5">
				<NewTodo />
			</div>
			<TodosGrid todos={todos} />
		</div>
	);
};

export default ServerTodosPage;
