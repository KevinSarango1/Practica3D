'use client';

import { GET, POST } from "./Conecction";
const URL = process.env.URL_API;

export async function guardar_archivo(archivo) {
    let datos = null;
    try {
        datos = await POST("persona/imagen", archivo, "NONE", true);
    } catch (error) {
        console.log(error.response);
        return error.response.data;
    }
    return datos;
}

export async function listar_personas() {
    let datos = null;
    try {
        datos = await GET(`${URL}/persona`);
    } catch (error) {
        console.log(error.response);
        return error.response.data;
    }
    return datos;
}
