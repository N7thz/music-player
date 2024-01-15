import { useEffect, useState } from "react"
import axios from "axios"
import { IMusic } from "@/types"

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export function Usefetch() {

    const [musics, setMusics] = useState<IMusic[]>()
    const [music, setMusic] = useState<IMusic>()

    const getMusics = async () => {

        await api.get("/api/musics")
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