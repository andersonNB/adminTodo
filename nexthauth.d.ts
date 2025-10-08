import {DefaultSession, DefaultUser} from "next-auth";

interface IUser extends DefaultUser {
	/**
	 * Roles del usuario
	 */
	roles?: string[];
	/**
	 * Agregar cualquier otro campo que tu manejas
	 */
}

declare module "next-auth" {
	interface User {
		roles?: string[];
		id: string;
	}

	interface Session {
		user?: User;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		roles?: string[];
	}
}
