import { NextResponse } from "next/server";

export default function middleware(request) {

    const token = request.cookies.get('token');
    const usuario = request.cookies.get('usuario');
    const url = request.nextUrl;

    // Redirigir al usuario a la página de inicio de sesión si no está autenticado y está intentando acceder a cualquier ruta protegida
    if (!token && !usuario && (url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/persona/imagen'))) {
        const redirectTo = `${request.nextUrl.origin}/sesion`; // URL absoluta para la página de inicio de sesión
        return NextResponse.redirect(redirectTo);
    }


    // Continuar con la siguiente solicitud si ninguna condición de redirección se cumple
    return NextResponse.next();
}
