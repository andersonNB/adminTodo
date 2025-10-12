import {Todo} from "@/generated/prisma";

/**
 * Actualiza el estado de completado de un Todo existente.
 *
 * @param {string} id - El identificador único del Todo a actualizar.
 * @param {boolean} complete - Estado de completado que se desea asignar al Todo.
 * @returns {Promise<Todo>} - Promesa que resuelve con el Todo actualizado.
 */
export const updateTodo = async (
	id: string,
	complete: boolean
): Promise<Todo> => {
	const body = {complete};

	const todo: Response = await fetch(`/api/todos/${id}`, {
		method: "PUT",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});
	/** @type {Todo} */
	const response: Todo = await todo.json();
	console.log({response});

	return response;
};

/**
 * Crea un nuevo Todo en el sistema.
 *
 * @param {string} description - La descripción del nuevo Todo.
 * @returns {Promise<Todo>} - Promesa que resuelve con el Todo recién creado.
 */
export const createTodo = async (
	description: string,
	userId: string
): Promise<Todo> => {
	const body = {description, userId};

	const todo = await fetch(`/api/todos`, {
		method: "POST",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());

	return todo;
};

/**
 * Elimina todos los Todos que estén marcados como completados.
 *
 * @async
 * @function deleteAllCompletedTodos
 * @returns {Promise<{count: number}>} Promesa que resuelve con un objeto que indica cuántos Todos fueron eliminados.
 */
export const deleteAllCompletedTodos = async () => {
	const todo = await fetch("/api/todos", {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());

	return todo;
};
