/**
 * Restaura los Todos a su estado inicial (datos de semilla).
 *
 * @async
 * @function resetTodos
 * @returns {Promise<{ message: string; }>}
 * Promesa que resuelve con un objeto que contiene un mensaje de confirmación
 */
export const resetTodos = async (): Promise<{message: string}> => {
	const response = await fetch("/api/seed", {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	}).then((res) => res.json());

	return response;
};
