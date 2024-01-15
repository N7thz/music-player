'use client'

import React from 'react'
import { useMusic } from '@/context/musicContext'
import Image from 'next/image'

export const Main = () => {

    const { music } = useMusic()

    if (music !== undefined) {

        const { id, name, cover, letra, artists } = music

        return (

            <main className="flex flex-col  items-center w-8/12 bg-zinc-700 rounded-lg">
                <div className="flex gap-3 items-center w-full pt-12">
                    <Image
                        src={cover}
                        width={150}
                        height={150}
                        alt='album cover'
                        className='ml-3 rounded-lg'
                    />
                    <div>
                        <h1 className='text-3xl'>
                            {name}
                        </h1>
                        <h2 className='text-2xl capitalize'>
                            {artists}
                        </h2>
                    </div>
                </div>

                <p className="p-6 leading-6 w-full h-[400px] overflow-y-scroll scrollbar scrollbar-thumb-zinc-500  scrollbar-none scrollbar-thumb-rounded-full  hover:scrollbar-thin">
                    {
                        letra?.map(linha =>
                            <>
                                <span
                                    className='text-2sm'
                                    key={linha}
                                >
                                    {linha}
                                </span>
                                <br />
                            </>)
                    }
                </p>
            </main>
        )
    }
}
