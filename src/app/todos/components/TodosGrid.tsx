import React from "react";
import {Todo} from "@/generated/prisma";
import {TodoItem} from "./TodoItem";

interface Props {
	todos?: Todo[];
}

export const TodosGrid = ({todos = []}: Props) => {
	return (
		<>
			<div className="w-full">
				<i>todos</i> que llegan del lado del sevidor y pintarse del lado del
				cliente{" "}
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
				{todos.map((todo) => (
					<TodoItem key={todo.id} todo={todo} />
				))}
			</div>
		</>
	);
};
