import * as v from "valibot"

export const EntidadSchema = v.object({
    id: v.number(),
    name: v.string()
})

export const EntidadesSchema = v.object({
    entidades: v.array(
        EntidadSchema
    )
})

export type EntidadesType = {
    id: number
    name: string
}