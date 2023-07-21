import * as z from "zod"
import { GamesResultSchema } from "@/lib/validations/games"
import { GameResultSchema } from "@/lib/validations/game"
import { PlatformsResultSchema } from "@/lib/validations/platforms"
import { userGamePostSchema, userGameDeleteSchema, userGameResultSchema } from "@/lib/validations/user-game"
import { userPlatformSchema } from "@/lib/validations/user-platform"


export type GameDetail = z.infer<typeof GameResultSchema>

export type GameInfo = z.infer<typeof GamesResultSchema>[0];

export type Games = z.infer<typeof GamesResultSchema>

export type Platforms = z.infer<typeof PlatformsResultSchema>

export type UserGamePostRequest = z.infer<typeof userGamePostSchema>

export type UserGameDeleteRequest = z.infer<typeof userGameDeleteSchema>

export type UserGame = z.infer<typeof userGameResultSchema>

export type UserPlatformRequest = z.infer<typeof userPlatformSchema>

export type ImageType = 'box' | 'square' | 'masthead' | 'banner' | 'logo' | 'screenshots'

export type NavItem = {
    title: string
    target: string
}

export type GameListType = {
    RequestType: 'hall-of-fame' | 'popular' | 'upcoming' | 'platforms'
    title: string
} & (
        | {
            RequestType: 'hall-of-fame' | 'popular' | 'upcoming'
        }
        | {
            RequestType: 'platforms'
            platforms: PlatformType[]
        }
    );

export type PlatformType = 'all' | 'ps4' | 'xb1' | 'pc' | 'wii-u' | 'vita' | 'switch' | 'oculus' | 'vive' | 'psvr' | '3ds' | 'xbsx' | 'ps5' | 'stadia'