import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
	await prisma.todo.deleteMany(); //equivalente a delete from todo
	await prisma.user.deleteMany();

	const user = await prisma.user.create({
		data: {
			email: "test1@google.com",
			password: bcrypt.hashSync("1234"),
			roles: ["INTERNO", "SUPERADMIN", "COLABORADOR"],
			todos: {
				create: [
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
			},
		},
	});

	console.log("seed: ", user);

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

	return NextResponse.json({message: "Seed executed"});
}
