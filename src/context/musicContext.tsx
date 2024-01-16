'use client'

import { Usefetch } from "@/app/hooks/useFetch"
import { IMusicContextProps, IMusic } from "@/types"
import {

    ReactNode,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from "react"

const MusicContext = createContext({} as IMusicContextProps)

export function MusicProvider({ children }: { children: ReactNode }) {

    const { musics: musicsResponse, music: musicResponse } = Usefetch()


    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [musics, setMusics] = useState<IMusic[]>()
    const [music, setMusic] = useState<IMusic>()
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    useEffect(() => {

        setMusics(musicsResponse)
        setMusic(musicResponse)
    }, [musicResponse, musicsResponse])

    return (

        <MusicContext.Provider value={{
            audioRef,
            musics, setMusics,
            music, setMusic, 
            isPlaying, setIsPlaying
        }}>
            {children}
        </MusicContext.Provider>
    )
}

export const useMusic = () => useContext(MusicContext)