'use client';

import { GET, POST } from "./Conecction";
const URL = process.env.URL_API;

export async function listar_productos() {
    let datos = null;
    try {
        datos = await GET("producto", "NONE");
    } catch (error) {
        console.log(error.response);
        return error.response.data;
    }
    return datos;
}

export async function guardar_producto(data) {
    let datos = null;
    try {
        datos = await POST("producto/guardar", data, "NONE");
    } catch (error) {
        console.log(error.response);
        return error.response.data;
    }
    return datos;
}

export async function obtener_producto_por_external_id(external_id) {
    let datos = null;
    try {
        datos = await GET(`producto/${external_id}`, "NONE");
    } catch (error) {
        console.log(error.response);
        return error.response.data;
    }
    return datos;
}

export async function modificar_producto(external_id, data) {
    let datos = null;
    try {
        datos = await POST(`producto/modificar/${external_id}`, data, "NONE");
    } catch (error) {
        console.log(error.response);
        return error.response.data;
    }
    return datos;
}

export async function actualizar_estado_producto() {
    let datos = null;
    try {
        datos = await POST("producto/estado-actualizar", {}, "NONE");
    } catch (error) {
        console.log(error.response);
        return error.response.data;
    }
    return datos;
}

export async function listar_productos_por_estado(data) {
    let datos = null;
    try {
        datos = await POST("producto/estado", data, "NONE");
    } catch (error) {
        console.log(error.response);
        return error.response.data;
    }
    return datos;
}
