"use client";
import React from "react";
import {IoReloadOutline, IoTrashOutline} from "react-icons/io5";
import {createTodo, deleteAllCompletedTodos} from "../helpers/todos";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {resetTodos} from "../helpers/seed";

const NewTodoClientSide = () => {
	const session = useSession();
	const router = useRouter();
	console.log(
		"Este componente usa el api que tenemos en el proyecto y pase por el server de nextb"
	);

	const deleteCompleted = async () => {
		await deleteAllCompletedTodos();
		router.refresh();
	};

	const handleReset = async () => {
		await resetTodos();
		router.refresh();
	};

	//TODO: Cuando se resetan los todos, queda cache en la sesión por que se envia el id del usuario anterior
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const description = formData.get("description");

		if (typeof description === "string") {
			if (description.trim() === "") return;

			await createTodo(description, session.data?.user?.id ?? "no id add todo");
			router.refresh();
		}
	};

	return (
		<form className="flex w-full items-center" onSubmit={onSubmit}>
			<input
				type="text"
				name="description"
				className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
				placeholder="¿Qué necesita ser hecho?"
			/>

			<button
				type="submit"
				className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
			>
				Crear
			</button>

			<span className="flex flex-1"></span>

			<button
				className="flex items-center justify-center gap-1 rounded-full w-[34px] h-[34px] bg-gray-400  text-white hover:bg-gray-700 transition-all"
				onClick={handleReset}
			>
				<IoReloadOutline />
			</button>

			<button
				type="button"
				className="flex items-center justify-center gap-1 rounded-full w-[34px] h-[34px] ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
				onClick={deleteCompleted}
			>
				<IoTrashOutline />
			</button>
		</form>
	);
};

export default NewTodoClientSide;
