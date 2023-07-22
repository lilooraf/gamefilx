import * as z from "zod"

export const GamesResultSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  topCriticScore: z.number().nullable(),
  images: z.object({
    box: z.object({
      og: z.string().optional().nullable(),
      sm: z.string().optional().nullable(),
    }).optional(),
    banner: z.object({
      og: z.string().optional().nullable(),
      sm: z.string().optional().nullable(),
    }).optional(),
  }).optional(),
})).min(1)
