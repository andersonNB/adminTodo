import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";

export async function middleware(req: NextRequest) {
	const {pathname, searchParams} = req.nextUrl;

	// Log para debug - verificar que el middleware se ejecuta
	console.log(
		"[Middleware] Ejecutándose para:",
		pathname,
		"Método:",
		req.method
	);

	// Verificar si hay token de sesión
	let token = null;
	try {
		token = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET,
			secureCookie: process.env.NODE_ENV === "production",
		});

		console.log(
			"[Middleware] Token obtenido:",
			token ? "✅ Existe" : "❌ No existe"
		);
		if (token) {
			console.log("[Middleware] Token data:", {
				email: token.email,
				sub: token.sub,
				exp: token.exp,
			});
		}
	} catch (error) {
		console.error("[Middleware] Error al obtener token:", error);
		// Verificar cookies directamente como fallback
		const nextAuthSessionToken =
			req.cookies.get("next-auth.session-token") ||
			req.cookies.get("__Secure-next-auth.session-token");
		console.log(
			"[Middleware] Cookie de sesión encontrada:",
			nextAuthSessionToken ? "Sí" : "No"
		);
	}

	// Si el usuario está autenticado e intenta acceder a /api/auth/signin
	if (pathname === "/api/auth/signin" && token) {
		console.log(
			"[Middleware] 🔒 Usuario autenticado intentando acceder a signin - REDIRIGIENDO"
		);
		const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
		const redirectUrl = new URL(callbackUrl, req.url);
		return NextResponse.redirect(redirectUrl);
	}

	// Si el usuario NO está autenticado e intenta acceder a rutas protegidas
	if (
		!token &&
		!pathname.startsWith("/api/auth") &&
		(pathname.startsWith("/dashboard") || pathname === "/")
	) {
		console.log(
			"[Middleware] 🔓 Usuario no autenticado - REDIRIGIENDO a signin"
		);
		return NextResponse.redirect(new URL("/api/auth/signin", req.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/", "/dashboard/:path*", "/api/auth/signin"],
};
