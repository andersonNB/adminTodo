import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {getServerSession} from "next-auth";
import {NextResponse} from "next/server";
import {authOptions} from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
	//await prisma.todo.deleteMany(); equivalente a delete from todo
	const session = await getServerSession(authOptions);
	const userId = session?.user?.id;

	if (!userId) {
		return NextResponse.json({message: "No user session found"}, {status: 401});
	}

	await prisma.todo.deleteMany({where: {userId}});

	const todos = await prisma.todo.createMany({
		data: [
			{description: "Piedra del alma", complete: true, userId},
			{description: "Piedra del poder", userId},
			{description: "Piedra del tiempo", userId},
			{description: "Piedra del espacio", userId},
			{description: "Piedra de la realidad", userId},
		],
	});

	/* Ya al momento de crear el seed debemos primero crear el usuario ya que en este punto
	un usuario tiene varios todos asignados, por lo tanto los todos deben tener esa columna llena ya que es obligatorio
	await prisma.todo.createMany({
		data: [
			{
				description: "Piedra del alma",
				complete: true,
			},
			{
				description: "Piedra del poder",
			},
			{
				description: "Piedra del tiempo",
			},
			{
				description: "Piedra del espacio",
			},
			{
				description: "Piedra del realidad",
			},
		],
	});

    const todo = await prisma.todo.create({
		data: {
			description: "Piedra del poder",
			complete: true,
		},
	});

	console.log(todo);*/

	return NextResponse.json({message: "Seed executed", todos});
}
