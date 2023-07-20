import { Status } from "@prisma/client"
import * as z from "zod"

export const userGamePostSchema = z.object({
  rating: z.number().optional(),
  review: z.string().optional(),
  status: z.nativeEnum(Status).optional(),
  game: z.object({
    id: z.number(),
    name: z.string(),
    topCriticScore: z.number(),
    images: z.object({
      box: z.object({
        og: z.string(),
        sm: z.string(),
      }).optional(),
      banner: z.object({
        og: z.string(),
        sm: z.string(),
      }).nullable(),
    }),
  }),
})

export const userGameDeleteSchema = z.object({
  gameId: z.number(),
})