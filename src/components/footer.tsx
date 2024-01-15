'use client'

import { useEffect, useRef, useState } from "react"

import { MusicAside } from "./musicAside"

import {
    StepBack,
    StepForward,
    VolumeX,
    Volume1,
    Volume2,
    Shuffle,
    Repeat,
    Repeat1,
    Play,
    Pause
} from "lucide-react"
import { formatDuration } from "@/lib/utils"
import { useMusic } from "@/context/musicContext"

export const Footer = () => {

    const { music } = useMusic()

    const audioRef = useRef<HTMLAudioElement | null>(null)

    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [isRepeat, setIsRepeat] = useState<boolean>(false)
    const [isRandom, setIsRandon] = useState<boolean>(false)
    const [isMute, setIsMute] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number | null>(null)
    const [duration, setDuration] = useState<number | null>(null)
    const [progress, setProgress] = useState<number>(0)

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const updateProgress = () => {

        if (audioRef.current && duration !== null) {

            const percentage = (audioRef.current.currentTime / duration) * 100
            setProgress(percentage)
        }
    }

    useEffect(() => {

        const updateCurrentTime = () => {

            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime)
            }
        }

        const updateDuration = () => {

            if (audioRef.current) {

                setDuration(audioRef.current.duration)
            }
        }

        if (audioRef.current) {

            audioRef.current.addEventListener('timeupdate', updateCurrentTime)
            audioRef.current.addEventListener('loadedmetadata', updateDuration)
        }

        return () => {

            if (audioRef.current) {

                audioRef.current.removeEventListener('timeupdate', updateCurrentTime)
                // eslint-disable-next-line react-hooks/exhaustive-deps
                audioRef.current.removeEventListener('loadedmetadata', updateDuration)
            }
        }

    }, [duration])

    useEffect(() => {

        if (audioRef.current) {

            audioRef.current.addEventListener('timeupdate', updateProgress)
        }

        return () => {

            if (audioRef.current) {

                // eslint-disable-next-line react-hooks/exhaustive-deps
                audioRef.current.removeEventListener('timeupdate', updateProgress)
            }
        }

    }, [progress, updateProgress])


    if (music != undefined) {

        const { musicURL } = music

        const playSong = () => {

            if (audioRef.current) {

                isPlaying
                    ? audioRef.current.pause()
                    : audioRef.current.play()


                setIsPlaying(!isPlaying)
            }
        }

        return (
            <footer className="flex min-h-[5vw] bg-zinc-800">

                <MusicAside
                    className="w-1/3 h-14 hover:bg-zinc-700"
                    music={music}
                />
                <div className="flex flex-col justify-around w-1/3 ">
                    <div className="flex items-center justify-center gap-6">

                        {
                            isRandom
                                ? <Shuffle
                                    onClick={() => setIsRandon(!isRandom)}
                                    size={24}
                                    className="text-green-400"
                                />
                                : <Shuffle
                                    onClick={() => setIsRandon(!isRandom)}
                                    size={24}
                                />
                        }

                        <StepBack
                            size={24}
                            className="text-zinc-300 hover:text-zinc-50"
                        />

                        {
                            isPlaying
                                ? <Pause
                                    onClick={playSong}
                                    size={32}
                                    className="hover:scale-110 duration-100"
                                />
                                : <Play
                                    onClick={playSong}
                                    size={32}
                                    className="hover:scale-110 duration-100"
                                />
                        }

                        <StepForward
                            size={24}
                            className="text-zinc-300 hover:text-zinc-50"
                        />

                        {
                            isRepeat
                                ? <Repeat1
                                    onClick={() => setIsRepeat(!isRepeat)}
                                    size={24}
                                    className="text-green-400"
                                />
                                : <Repeat
                                    onClick={() => setIsRepeat(!isRepeat)}
                                    size={24}
                                />
                        }

                    </div>
                    <div className="w-full flex justify-between items-center gap-1">
                        <span>
                            {currentTime !== null ? formatDuration(currentTime) : '0:00'}
                        </span>
                        <input
                            value={progress}
                            min={0}
                            max={audioRef.current?.duration}
                            type="range"
                            className="rounded-full text-green-400 w-full h-2 appearance-none"
                        />

                        <span>
                            {duration !== null ? formatDuration(duration) : '0:00'}
                        </span>
                    </div>
                </div>
                <div className="flex gap-1 justify-center items-center w-1/3">

                    <Volume2
                        className=""
                    />
                    <input
                        type="range"
                        className="rounded-full w-1/2 h-2 appearance-none"
                    />
                </div>
                <audio
                    ref={audioRef}
                    src={musicURL}
                    loop={isRepeat}
                />
            </footer>
        )
    }
}

