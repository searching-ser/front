import { StateCreator } from "zustand";
import { getSedes, getSede } from "../handlers/sede_handlers";
import { SedesType, SedeType } from "../schemas/sede_schemas";
import { initialSede } from "../schemas/sede_schemas";

export type SedeSliceType = {
    sedes: SedesType[]
    sede: SedeType

    isLoadingSedes: boolean;
    isLoadingSede: boolean;
    errorSedes: string | null;
    errorSede: string | null;

    fetchSedes: () => Promise<void>
    fetchSede: (sede_id: number) => Promise<void>
}

export const createSedeSlice: StateCreator<SedeSliceType> = (set) => ({
    sedes: [], 
    sede: initialSede,

    isLoadingSedes: false,
    isLoadingSede: false,

    errorSedes: null,
    errorSede: null,

    fetchSedes: async() => {
        set({ isLoadingSedes: true, errorSedes: null });
        try {
            const sedes = await getSedes()
            set({ sedes })
        } catch (error) {
            console.error("Failed to fetch sedes:", error);
            set({ sedes: [], isLoadingSedes: false, errorSedes: "Failed to fetch sedes" });
        }
    },  
    fetchSede: async(sede_id: number) => {
        set({ isLoadingSede: true, errorSede: null });
        try {
            const sede = await getSede(sede_id)
            set({ sede })
        } catch (error) {
            console.error("Failed to fetch sede:", error);
            set({ sede: initialSede, isLoadingSede: false, errorSede: "Failed to fetch sede" });
        }
    }
})