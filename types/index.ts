export type Game = {
    id: number
    name: string
}

export type GameDetail = Game & {
    description: string
    firstReleaseDate: string
    Genres: Genre[]
    Platforms: Platform[]
    Companies: Company[]
    trailers: Trailer[]
    images: Images
}

export type GameInfo = Game & {
    topCriticScore: number
    images: {
        box?: {
            og: string
            sm: string
        },
        banner?: {
            og: string
            sm: string
        },
    }
}

export type Genre = {
    id: number
    name: string
}

export type Platform = {
    id: number
    name: string
    shortName: string
    imageSrc: string
}

export type Company = {
    name: string
    type: string
}

export type Trailer = {
    specialName: string
    externalUrl: string
    videoId: string
}

export type Images = {
    box: {
        og: string
        sm: string
    },
    square: {
        og: string
        xs: string
        sm: string
        lg: string
    },
    masthead: {
        og: string
        xs: string
        sm: string
        md: string
        lg: string
        xl: string
    },
    banner: {
        og: string
        sm: string
    },
    logo: {
        og: string
    },
    screenshots: [{
        og: string
        sm: string
    }]
}

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