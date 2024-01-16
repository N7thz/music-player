'use client'

import Image from "next/image"
import { IMusicProps } from "@/types"
import { twMerge } from "tailwind-merge"
import { Play } from "lucide-react"
import { useMusic } from "@/context/musicContext"

export const MusicAside: React.FC<IMusicProps> = ({ music, className, ...otherPros }) => {

    const { audioRef, isPlaying, setIsPlaying } = useMusic()

    if (music !== undefined) {

        const { id, cover, artists, name } = music

        const playSong = () => {

            setIsPlaying(!isPlaying)

            if (audioRef.current) {

                isPlaying
                    ? audioRef.current.pause()
                    : audioRef.current.play()
            }
        }

        return (
            <div
                {...otherPros}
                key={id}
                className={twMerge("flex items-center bg-zinc-800 mx-2 my-1 rounded-md cursor-pointer  group", className)}
            >
                <Image
                    src={cover}
                    width={50}
                    height={50}
                    alt="foto da capa do album"
                    className="w-16 h-16 p-2 rounded-sm"
                />
                <div className="flex flex-col justify-center w-full pl-2 rounded-md overflow-hidden">
                    <span className="text-xl capitalize">
                        {name}
                    </span>
                    <span className="text-sm italic text-zinc-50/90">
                        {artists}
                    </span>
                </div>
                <Play
                    onClick={playSong}
                    className="mr-4 hidden group-hover:flex hover:text-green-400 hover:scale-105 duration-300"
                />
            </div>
        )
    }
}
