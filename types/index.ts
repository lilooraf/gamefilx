export type Game = {
    id: number
    name: string
    description: string
    firstReleaseDate: string
    Genres: Genre[]
    Platforms: Platform[]
    Companies: Company[]
    trailers: Trailer[]
    images: Images
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
    screenshots: {
        og: string
        sm: string
    }[]
}