"use client";

import {IoReloadOutline, IoTrashOutline} from "react-icons/io5";
import {useRouter} from "next/navigation";
import {resetTodos} from "../helpers/seed";
import {addTodo, deleteCompletedServerActions} from "../actions/todo-actions";
import {useSession} from "next-auth/react";

export const NewTodo = () => {
	const router = useRouter();
	const session = useSession();
	console.log("session con el hook desde un client componente: ", session);

	const deleteCompleted = async () => {
		//await deleteAllCompletedTodos();
		await deleteCompletedServerActions();
		//router.refresh();
	};

	const handleReset = async () => {
		await resetTodos();
		router.refresh();
	};

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const description = formData.get("description");

		if (typeof description === "string") {
			if (description.trim() === "") return;

			await addTodo(description, session.data?.user?.id ?? "no id add todo");
			//router.refresh();
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
