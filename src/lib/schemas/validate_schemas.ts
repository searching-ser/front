import * as v from "valibot"

export const validationSchema = v.object({
    message: v.string(), 
    role: v.string()
})