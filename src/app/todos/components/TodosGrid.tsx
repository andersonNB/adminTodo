"use client";
import {Todo} from "@/generated/prisma";
import {TodoItem} from "./TodoItem";
import {toggleTodo} from "../actions/todo-actions";

interface Props {
	todos?: Todo[];
}

export const TodosGrid = ({todos = []}: Props) => {
	//const router = useRouter();

	// vamos a utilizar un server actions para actualizar el todo
	/*const toggleTodo = async (id: string, complete: boolean) => {
		await updateTodo(id, complete);

		router.refresh();
	};
	*/

	return (
		<>
			<div className="w-full">
				<i>todos</i> que llegan del lado del sevidor y pintarse del lado del
				cliente{" "}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
				))}
			</div>
		</>
	);
};
