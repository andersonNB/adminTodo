import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import * as yup from "yup";

export async function GET(request: Request) {
	const {searchParams} = new URL(request.url);
	console.log(searchParams);
	const take = searchParams.get("take") ?? "10";
	const skip = searchParams.get("skip") ?? "0";

	if (isNaN(+take) || isNaN(Number(skip))) {
		return NextResponse.json(
			{message: "Take tiene que ser un número"},
			{
				status: 400,
			}
		);
	}

	const todos = await prisma.todo.findMany({
		take: Number(take),
		skip: Number(skip),
	});

	return NextResponse.json(todos);
}

const postSchema = yup.object({
	description: yup.string().required(),
	complete: yup.boolean().optional().default(false),
	userId: yup.string().required(),
});

export async function POST(request: Request) {
	//se puede obtener el usuario del hook que creamos

	try {
		const {complete, description, userId} = await postSchema.validate(
			await request.json()
		);
		const todo = await prisma.todo.create({
			data: {complete, description, userId},
		});

		return NextResponse.json(todo);
	} catch (error) {
		return NextResponse.json(error, {status: 400});
	}
}

export async function DELETE() {
	try {
		const response = await prisma.todo.deleteMany({where: {complete: true}});

		return NextResponse.json(response);
	} catch (error) {
		return NextResponse.json(error, {status: 400});
	}
}
