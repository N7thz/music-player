"use client"

import React from "react"
import { useMusic } from "@/context/musicContext"
import Image from "next/image"
import { ScrollArea } from "./ui/scroll-area"

export const Main = () => {

    const { music } = useMusic()

    if (music !== undefined) {

        const { name, cover, letra, artists } = music

        return (

            <main className="flex flex-col  items-center w-8/12 bg-zinc-700 rounded-lg">
                <div className="flex gap-3 items-center w-full pt-12">
                    <Image
                        src={cover}
                        width={150}
                        height={150}
                        alt="album cover"
                        className="ml-3 rounded-lg max-h-[250px]"
                    />
                    <div>
                        <h1 className="text-3xl">
                            {name}
                        </h1>
                        <h2 className="text-2xl capitalize">
                            {artists}
                        </h2>
                    </div>
                </div>

                <ScrollArea className="p-6 leading-6 w-full h-[400px]">
                    {
                        letra?.map(linha =>
                            <>
                                <span
                                    className="text-2sm"
                                    key={linha}
                                >
                                    {linha}
                                </span>
                                <br />
                            </>)
                    }
                </ScrollArea>
            </main>
        )
    }
}
