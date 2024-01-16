import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Footer } from "@/components/footer"
import { MusicList } from "@/components/musicList"
import { Main } from "@/components/main"

import { Search, Library, History } from "lucide-react"
import Loading from "./loading"

export default async function Home() {

  await new Promise(resolve => setTimeout(resolve, 2000))

  return (

    <div className="flex flex-col justify-between min-h-screen bg-zinc-800" >
      <div className="min-h-12 flex items-center justify-end  pr-4 pt-2">
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>BE</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex  gap-4 p-4">

        <aside className="flex flex-col items-center justify-between w-4/12 
        bg-zinc-700 rounded-lg">
          <div className="w-full flex justify-end gap-2 p-2 bg-zinc-800 
          rounded-lg overflow-hidden border border-zinc-50">
            <Search className="hover:text-green-400 hover:scale-105 hover:duration-100 hover:cursor-pointer" />
            <History className="hover:text-green-400 hover:scale-105 hover:duration-100 hover:cursor-pointer" />
            <Library className="hover:text-green-400 hover:scale-105 hover:duration-100 hover:cursor-pointer" />
          </div>

          <MusicList />
        </aside>

        <Main />
      </div>
      <Footer />
    </div >
  )
}