import API from "../api";
import { SedesSchemaList, SedeSchema } from "../schemas/sede_schemas";
import { safeParse } from "valibot"
import { SedeCreateType } from "../schemas/sede_schemas";

export const createSede = async(sedeData: SedeCreateType) => {
    try {
        console.log(sedeData)
        const formData = new FormData()
        formData.append("sede_data", JSON.stringify({
            has_read_terms: sedeData.has_read_terms,
            name: sedeData.name,
            address: sedeData.address,
            city: sedeData.city,
            country: sedeData.country || "Mexico", // Default country if missing
            rep_name: sedeData.rep_name,
            rep_email: sedeData.rep_email,
            type: sedeData.type,
            group_num: sedeData.group_num,
            group_capacity: sedeData.group_capacity,
            has_collaborators: sedeData.has_collaborators,
            open_to_public: sedeData.open_to_public,
            english_group_num: sedeData.english_group_num,
            spanish_group_num: sedeData.spanish_group_num,
            advanced_group_num: sedeData.advanced_group_num,
            basic_group_num: sedeData.basic_group_num,
            first_time: sedeData.first_time,
            state_id: sedeData.state_id,
        }));

        if (sedeData.legal_form) {
            formData.append("legal_form", sedeData.legal_form);
        }

        if (sedeData.logo) {
            formData.append("logo", sedeData.logo);
        }

        const response = await API.post("/sede", formData);
    } catch (error : any) {
        console.error("Error creating Sede:", error.response?.data || error.message);
        throw new Error(error.response?.data?.detail || "Failed to create Sede");
    }
}

export const getSedes = async () => {
    try {
        const response = await API.get("/sede")
        const result = safeParse(SedesSchemaList, response.data);
        if (!result.success) {
            console.error("Validation failed:", result.issues);
            throw new Error("Invalid response format(sede list).");
        }
        
        return result.output.sedes
    } catch (error: any) {
        // console.error("Error fetching sedes:", error);

        if (error.response) {
            throw new Error(error.response.data.detail || "Failed to fetch sedes.");
        }

        throw new Error("Network error or invalid response(sedes).");
    }
}

export const getSede = async(sede_id : number) => {
    try {
        const response = await API.get(`/sede/${sede_id}`)
        const result = safeParse(SedeSchema, response.data)
        if (!result.success) {
            console.error("Validation failed:", result.issues);
            throw new Error("Invalid response format(sede individual).");
        }

        return result.output
    } catch (error : any) {
        if (error.response) {
            throw new Error(error.response.data.detail || "Failed to fetch sede individual.");
        }

        throw new Error("Network error or invalid response(sede individudal).");
    }
}