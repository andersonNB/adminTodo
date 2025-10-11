import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import NextAuth, {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import {signInEmailPassword} from "@/app/auth/actions/auth-actions";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	// Configure one or more authentication providers
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "Correo electrónico",
					type: "text",
					placeholder: "usuario@gmail.com",
				},
				password: {
					label: "Contraseña",
					type: "password",
					placeholder: "*******",
				},
			},

			async authorize(credentials, req) {
				const user = await signInEmailPassword(
					credentials?.email ?? "no email in credentials",
					credentials?.password ?? ""
				);
				if (!user) return null;

				return user;
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? "",
			clientSecret: process.env.GITHUB_SECRET ?? "",
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? "",
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
		}),
	],
	//debug: true,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({user, account, profile, email, credentials}) {
			return true;
		},

		async jwt({token, user, account, profile}) {
			const dbUser = await prisma.user.findUnique({
				where: {email: token.email ?? "no-email"},
			});
			token.roles = dbUser?.roles ?? ["no-roles"];
			token.id = dbUser?.id ?? "no-uuid";
			return token;
		},

		async session({session, token, user}) {
			if (session && session.user) {
				session.user.roles = token.roles;
				session.user.id = token.id as string;
			}

			console.log(session);
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
