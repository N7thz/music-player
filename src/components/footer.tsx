'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react"

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
import { formatDuration, getCurrentMusic } from "@/lib/utils"
import { useMusic } from "@/context/musicContext"
import { Progress } from "./ui/progress"

export const Footer = () => {

    const {
        audioRef,
        musics,
        music,
        setMusic,
        isPlaying,
        setIsPlaying
    } = useMusic()

    const [isRepeat, setIsRepeat] = useState<boolean>(false)
    const [isRandom, setIsRandon] = useState<boolean>(false)
    const [isMute, setIsMute] = useState<boolean>(false)
    const [currentTime, setCurrentTime] = useState<number | null>(null)
    const [duration, setDuration] = useState<number | null>(null)
    const [progress, setProgress] = useState<number>(0)
    const [volume, setVolume] = useState<string>('100')
    const [prevVolume, setPrevVolume] = useState<string>('0')

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

        // if (currentTime === (duration ?? - 0.1)) {

        //     if (musics !== undefined && music !== undefined) {

        //         const currentMusicIndex = getCurrentMusic(musics, music)

        //         if (currentMusicIndex > 0) {

        //             setMusic(musics[currentMusicIndex - 1])
        //         } else {

        //             setMusic(musics[musics?.length - 1])
        //         }
        //     }
        // }

        return () => {

            if (audioRef.current) {

                audioRef.current.removeEventListener('timeupdate', updateCurrentTime)
                // eslint-disable-next-line react-hooks/exhaustive-deps
                audioRef.current.removeEventListener('loadedmetadata', updateDuration)
            }
        }

    }, [audioRef, currentTime, duration, music, musics, setMusic])

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

    }, [audioRef, progress, updateProgress])


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

        const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {

            setVolume(e.target.value)
            if (audioRef.current) {

                Number(volume) > 10
                    ? audioRef.current.volume = Number(volume) / 100
                    : audioRef.current.volume = 0
            }
        }

        const activeMute = () => {

            if (audioRef.current) {

                if (isMute) {

                    setVolume(prevVolume)
                    audioRef.current.volume = Number(prevVolume) / 100
                } else {

                    setPrevVolume(volume)
                    setVolume('0')
                    audioRef.current.volume = 0
                }
            }

            setIsMute(!isMute)
        }

        const playPrevMusic = () => {

            if (musics) {

                const currentMusicIndex = getCurrentMusic(musics, music)

                if (currentMusicIndex > 0) {

                    setMusic(musics[currentMusicIndex - 1])
                } else {

                    setMusic(musics[musics?.length - 1])
                }
            }
        }

        const playNextMusic = () => {

            if (musics) {

                const currentMusicIndex = getCurrentMusic(musics, music)

                if (currentMusicIndex < musics.length - 1) {

                    setMusic(musics[currentMusicIndex + 1])
                } else {

                    setMusic(musics[0])
                }
            }
        }

        const playRandonMusic = () => {

            setIsRandon(!isRandom)
        }

        return (

            <footer className="flex min-h-[5vw] bg-zinc-700 p-2">
                <MusicAside
                    className="w-1/3 h-14 bg-zinc-700"
                    music={music}
                />
                <div className="flex flex-col justify-around w-1/3 ">
                    <div className="flex items-center justify-center gap-6">

                        {
                            isRandom
                                ? <Shuffle
                                    onClick={playRandonMusic}
                                    size={24}
                                    className="text-green-400"
                                />
                                : <Shuffle
                                    onClick={playRandonMusic}
                                    size={24}
                                />
                        }

                        <StepBack
                            onClick={playPrevMusic}
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
                            onClick={playNextMusic}
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

                        <Progress
                            value={progress}
                            max={
                                audioRef.current?.duration !== undefined
                                    ? audioRef.current.duration
                                    : 0
                            }
                            className="rounded-full w-full h-2 appearance-none"
                        />

                        <span>
                            {duration !== null ? formatDuration(duration) : '0:00'}
                        </span>
                    </div>
                </div>
                <div className="flex gap-1 justify-center items-center w-1/3">

                    {
                        isMute
                            ? < VolumeX onClick={activeMute} />
                            : Number(volume) > 40
                                ? <Volume2 onClick={activeMute} />
                                : <Volume1 onClick={activeMute} />
                    }

                    <input
                        onChange={changeVolume}
                        max={100}
                        min={0}
                        value={volume}
                        type="range"
                        className="rounded-full w-1/2 h-2 appearance-none outline-none"
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

