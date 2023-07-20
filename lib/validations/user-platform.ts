import * as z from "zod"

export const userPlatformSchema = z.object({
  platforms: z.array(z.string()
    .refine((platform) => {
      return [
        "pc",
        "ps5",
        "ps4",
        "vita",
        "xbsx",
        "xb1",
        "wii-u",
        "switch",
        "oculus",
        "vive",
        "psvr",
        "3ds",
        "stadia",
      ].includes(platform)
    }, {
      message: "Invalid platform",
    })),
})