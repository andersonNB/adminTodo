import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";
import NextAuth, {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	// Configure one or more authentication providers
	providers: [
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
			//console.log("user: ", user);
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
