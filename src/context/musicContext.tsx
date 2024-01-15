'use client'

import { Usefetch } from "@/app/hooks/useFetch"
import { IMusicContextProps, IMusic } from "@/types"
import {

    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from "react"

const MusicContext = createContext({} as IMusicContextProps)

export function MusicProvider({ children }: { children: ReactNode }) {

    const [musics, setMusics] = useState<IMusic[]>()
    const [music, setMusic] = useState<IMusic>()
    const { musics: musicsResponse, music: musicResponse } = Usefetch()

    useEffect(() => {

        setMusics(musicsResponse)
        setMusic(musicResponse)
    }, [musicResponse, musicsResponse])

    return (

        <MusicContext.Provider value={{ musics, setMusics, music, setMusic }}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => useContext(MusicContext)