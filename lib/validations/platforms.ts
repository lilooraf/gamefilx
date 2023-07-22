import * as z from "zod"

export const PlatformsResultSchema = z.array(z.object({
  name: z.string(),
  longName: z.string(),
}))
