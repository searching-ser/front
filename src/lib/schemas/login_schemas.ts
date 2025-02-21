import * as v from "valibot"

export const LoginResponseSchema = v.object({
    message: v.string(),
    token: v.string(),
    user: v.object({
        id: v.number(),
        email: v.string(),
        role: v.string(),
        sede_id: v.number()
    })
})