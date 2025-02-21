import { StateCreator } from "zustand";
import { getEntidades } from "../handlers/entidad_handler";
import { EntidadesType } from "../schemas/entidad_schemas";

export type EntidadSliceType = {
    entidades: EntidadesType[]

    isLoadingEntidades: Boolean

    errorEntidades: string | null

    fetchEntidades: () => Promise<void>
}

export const createEntidadesSlice: StateCreator<EntidadSliceType> = (set) => ({
    entidades: [], 

    isLoadingEntidades: false, 

    errorEntidades: null, 

    fetchEntidades: async() => {
        try {
            const entidades = await getEntidades()
            set({entidades})
        } catch (error) {
            console.error("Failed to fetch entidades:", error);
            set({ entidades: [] }); // Reset on failure
        }
    }
})