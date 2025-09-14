import prisma from "@/lib/prisma";
import {NextResponse} from "next/server";
import * as yup from "yup";

interface Segments {
	params: {
		id: string;
	};
}

export async function GET(request: Request, segments: Segments) {
	const {id} = segments.params;

	try {
		const todoById = await prisma.todo.findUniqueOrThrow({
			where: {id},
		});

		if (!todoById) {
			return NextResponse.json(
				{message: "Todo not found", status: 404},
				{status: 404}
			);
		}

		return NextResponse.json({payload: todoById, status: 200}, {status: 200});
	} catch (error) {
		return NextResponse.json({message: "Server error", error}, {status: 404});
	}
}

const putSchema = yup.object({
	complete: yup.boolean().optional(),
	description: yup.string().optional(),
});

export async function PUT(request: Request, segments: Segments) {
	const {id} = segments.params;

	try {
		const todoById = await prisma.todo.findUniqueOrThrow({
			where: {id},
		});

		if (!todoById) {
			return NextResponse.json(
				{message: "Todo not found", status: 404},
				{status: 404}
			);
		}

		const {complete, description} = await putSchema.validate(
			await request.json()
		);

		const updatedTodo = await prisma.todo.update({
			where: {id},
			data: {complete, description},
		});

		return NextResponse.json(
			{payload: updatedTodo, status: 200},
			{status: 200}
		);
	} catch (error) {
		return NextResponse.json({message: "Server error", error}, {status: 404});
	}
}
