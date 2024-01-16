'use client'

import { IMusic } from "@/types"
import { MusicAside } from "./musicAside"
import { useMusic } from "@/context/musicContext"

export const MusicList = () => {

    const { musics, music: currentMusic, setMusic, setIsPlaying } = useMusic()

    const changeCurrentMusic = (music: IMusic) => {

        setIsPlaying(false)
        setMusic(music)
    }

    return (

        <div className="flex flex-col items-center w-full h-full pt-12">

            {
                musics?.map(music =>
                    music.id === currentMusic?.id
                        ? <MusicAside
                            onClick={() => changeCurrentMusic(music)}
                            key={music.id}
                            music={music}
                            className="w-11/12 hover:scale-105 duration-300 text-green-400"
                        />

                        : <MusicAside
                            onClick={() => changeCurrentMusic(music)}
                            key={music.id}
                            music={music}
                            className="w-11/12 hover:scale-105 duration-300"
                        />
                )
            }
        </div>
    )
}
