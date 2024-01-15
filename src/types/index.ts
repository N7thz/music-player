import { Dispatch, HTMLProps, SetStateAction } from "react"

export interface IMusic {

    id?: number
    name: string
    artists: string
    cover: string
    musicURL?: string
    letra?: string[]
}

export interface IMusicProps extends HTMLProps<HTMLDivElement> {

    music: IMusic
}

export interface IMusicContextProps {

    musics: IMusic[] | undefined
    setMusics: Dispatch<SetStateAction<IMusic[] | undefined>>
    music: IMusic | undefined
    setMusic: Dispatch<SetStateAction<IMusic | undefined>>
}