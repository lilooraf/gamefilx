import * as z from "zod"

export const GameResultSchema = z.object({
  id: z.number(),
  name: z.string(),
  topCriticScore: z.number().nullable(),
  description: z.string(),
  firstReleaseDate: z.string(),
  Genres: z.array(z.object({
    id: z.number(),
    name: z.string(),
  })),
  Platforms: z.array(z.object({
    id: z.number(),
    name: z.string(),
    shortName: z.string(),
    imageSrc: z.string().optional().nullable(),
  })),
  Companies: z.array(z.object({
    name: z.string(),
    type: z.string().optional().nullable(),
  })),
  trailers: z.array(z.object({
    specialName: z.string().optional().nullable(),
    externalUrl: z.string(),
    videoId: z.string(),
  })),
  images: z.object({
    box: z.object({
      og: z.string().optional().nullable(),
      sm: z.string().optional().nullable(),
    }).optional(),
    square: z.object({
      og: z.string().optional().nullable(),
      xs: z.string().optional().nullable(),
      sm: z.string().optional().nullable(),
      lg: z.string().optional().nullable(),
    }).optional(),
    masthead: z.object({
      og: z.string().optional().nullable(),
      xs: z.string().optional().nullable(),
      sm: z.string().optional().nullable(),
      md: z.string().optional().nullable(),
      lg: z.string().optional().nullable(),
      xl: z.string().optional().nullable(),
    }).optional(),
    banner: z.object({
      og: z.string().optional().nullable(),
      sm: z.string().optional().nullable(),
    }).optional(),
    logo: z.object({
      og: z.string().optional().nullable(),
    }).optional(),
    screenshots: z.array(z.object({
      og: z.string().optional().nullable(),
      sm: z.string().optional().nullable(),
    })).optional(),
  }).optional(),
})
