import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

/** * Intenta iniciar sesión con email y contraseña.
 * - Si el usuario no existe, lo crea automáticamente con la contraseña proporcionada.
 * - Si el usuario existe, compara la contraseña ingresada con la almacenada (hash bcrypt).
 * * @async * @function signInEmailPassword * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña en texto plano para verificar o registrar.
 * @returns {Promise<object|null>} Retorna el objeto de usuario si la autenticación es válida o el usuario fue creado, de lo contrario `null`.
 *
 * @example
 * const user = await signInEmailPassword("user@example.com", "password123");
 * if (user) {
 * console.log("Inicio de sesión exitoso:", user);
 *  } else {
 * console.log("Credenciales inválidas");
 *  }
 */
export const signInEmailPassword = async (email: string, password: string) => {
	if (!email || !password) return null;

	const user = await prisma?.user.findUnique({where: {email}});

	if (!user) {
		const dbUser = await createUser(email, password);
		return dbUser;
	}

	if (!bcrypt.compareSync(password, user.password ?? "")) {
		return null;
	}

	return user;
};

/**
 * Crea un nuevo usuario en la base de datos con el email y la contraseña proporcionados.
 *
 * @async
 * @function createUser
 * @param {string} email - Correo electrónico del nuevo usuario.
 * @param {string} password - Contraseña en texto plano que será almacenada (actualmente sin hash).
 * @returns {Promise<object>} Retorna el nuevo objeto de usuario creado en la base de datos.
 *
 * @note Se recomienda hashear la contraseña antes de guardarla para mayor seguridad:
 * ```ts
 * const hashedPassword = bcrypt.hashSync(password, 10);
 * ``` */
const createUser = async (email: string, password: string) => {
	const user = await prisma.user.create({
		data: {
			email,
			password: bcrypt.hashSync(password),
			name: email.split("@")[0],
		},
	});

	return user;
};
