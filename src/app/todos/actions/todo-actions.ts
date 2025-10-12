"use server";

import {Todo} from "@/generated/prisma";
import prisma from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export const toggleTodo = async (
	id: string,
	complete: boolean
): Promise<Todo> => {
	const todo = await prisma.todo.findFirst({where: {id}});

	if (!todo) {
		throw `Todo con id ${id} no encontrado`;
	}

	const updatedTodo = await prisma.todo.update({
		where: {id},
		data: {complete},
	});

	revalidatePath("/dashboard/server-todos");

	return updatedTodo;
};

export const addTodo = async (
	description: string,
	userId: string
): Promise<Todo | {message: string; error: unknown}> => {
	try {
		const todo = await prisma.todo.create({data: {description, userId}});

		revalidatePath("/dashboard/server-todos");
		return todo;
	} catch (error) {
		return {
			message: "Error creando todo",
			error: error,
		};
	}
};

export const deleteCompletedServerActions = async () => {
	try {
		const todo = await prisma.todo.deleteMany({where: {complete: true}});
		revalidatePath("/dashboard/server-todos");
		return todo;
	} catch (error) {
		return {
			message: "Error, ese elemento ya fue eliminado",
			error,
		};
	}
};
