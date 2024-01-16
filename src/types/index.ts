import { Dispatch, HTMLProps, MutableRefObject, SetStateAction } from "react"

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

    audioRef: MutableRefObject<HTMLAudioElement | null>
    musics: IMusic[] | undefined
    setMusics: Dispatch<SetStateAction<IMusic[] | undefined>>
    music: IMusic | undefined
    setMusic: Dispatch<SetStateAction<IMusic | undefined>>
    isPlaying: boolean
    setIsPlaying: Dispatch<SetStateAction<boolean>>
}