import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { SedeSliceType, createSedeSlice } from "./SedeSlice"
import { EntidadSliceType, createEntidadesSlice } from "./EntidadSlice"

export const useAppStore = create<SedeSliceType & EntidadSliceType>()(
    devtools((...a) => ({
        ...createSedeSlice(...a),
        ...createEntidadesSlice(...a)
    }))
) 