import { IMusic } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDuration(time: number): string {

  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export function getCurrentMusic(musics: IMusic[], music: IMusic) {

  const currentMusicIndex = musics?.findIndex(musicArray => musicArray.id === music.id)

  return currentMusicIndex
}
