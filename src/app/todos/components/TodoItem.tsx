import React from "react";
import {Todo} from "@/generated/prisma";
import styles from "./TodoItem.module.css";
import {IoCheckboxOutline, IoSquareOutline} from "react-icons/io5";

interface Props {
	todo: Todo;
}

export const TodoItem = ({todo}: Props) => {
	return (
		<div className={todo.complete ? styles.todoDone : styles.todoPending}>
			<div className="flex flex-col sm:flex-row justify-start items-center gap-4">
				<div
					className={`flex items-center gap-1 p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
						todo.complete ? "bg-blue-100" : "bg-red-100"
					}`}
				>
					{todo.complete ? (
						<IoCheckboxOutline size={30} className="text-black" />
					) : (
						<IoSquareOutline size={30} className="text-black" />
					)}
				</div>
				<div className="text-center sm:text-left text-black">
					{todo.description}
				</div>
			</div>
		</div>
	);
};
