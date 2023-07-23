import * as z from "zod"

export const GameSearchSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
}))

