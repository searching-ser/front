import API from "../api";
import { EntidadesSchema } from "../schemas/entidad_schemas";
import { safeParse } from "valibot";

export const getEntidades = async() => {
    try {
        const response = await API.get("/entidad")
        const result = safeParse(EntidadesSchema, response.data);
        if (!result.success) {
            console.error("Validation failed:", result.issues);
            throw new Error("Invalid response format(entidad).");
        }
        return result.output.entidades
    } catch (error : any) {
        if (error.response) {
            throw new Error(error.response.data.detail || "Failed to fetch entidades.");
        }

        throw new Error("Network error or invalid response(entidades).");
    }
}