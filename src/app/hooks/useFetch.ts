import { useEffect, useState } from "react"
import axios from "axios"
import { IMusic } from "@/types"

export function Usefetch() {

    const [musics, setMusics] = useState<IMusic[]>()
    const [music, setMusic] = useState<IMusic>()

    const getMusics = async () => {

        await axios.get("/api/musics")
            .then(response => {

                setMusics(response.data.musics)
                setMusic(response.data.musics[2])
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {

        getMusics()
    }, [])

    return { musics, music }
}