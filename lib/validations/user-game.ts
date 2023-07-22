import * as z from "zod"
import { Status } from "@prisma/client"

export const userGamePostSchema = z.object({
  rating: z.number().optional(),
  review: z.string().optional(),
  status: z.nativeEnum(Status).optional(),
  game: z.object({
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
    }),
  }),
})

export const userGameDeleteSchema = z.object({
  gameId: z.number(),
})

export const userGameResultSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  topCriticScore: z.number().nullable(),
  images: z.object({
    box: z.object({
      og: z.string().optional(),
      sm: z.string().optional(),
    }).optional(),
    banner: z.object({
      og: z.string().optional(),
      sm: z.string().optional(),
    }).optional(),
  })
}))
