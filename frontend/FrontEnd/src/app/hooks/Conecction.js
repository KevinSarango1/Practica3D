import axios from "axios";

const URL = process.env.URL_API;

const getHeaders = (token, isFormData) => {
    let headers = {
        "Accept": "application/json"
    };

    if (isFormData) {
        headers["Content-Type"] = "multipart/form-data";
    } else {
        headers["Content-Type"] = "application/json";
    }

    if (token !== "NONE") {
        headers["X-Access-Token"] = token;
    }

    return headers;
};

// Método POST
export const POST = async (resource, data, token = "NONE", isFormData = false) => {
    try {
        const response = await axios.post(`${URL}${resource}`, data, { headers: getHeaders(token, isFormData) });
        return response.data;
    } catch (error) {
        throw error; // Re-lanzamos el error para manejarlo donde se invoque la función
    }
};

// Método GET
export const GET = async (resource, token = "NONE") => {
    try {
        const response = await axios.get(`${URL}${resource}`, { headers: getHeaders(token, false) });
        return response.data;
    } catch (error) {
        throw error; // Re-lanzamos el error para manejarlo donde se invoque la función
    }
};
