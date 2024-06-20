import { POST } from "./Conecction";

export async function login(data) {
    try {
        const response = await POST("sesion", data);
        return response; // Devuelve directamente la respuesta
    } catch (error) {
        console.error("Error en la solicitud de inicio de sesión:", error);
        throw error; // Re-lanza el error para manejarlo en el componente React
    }
}
