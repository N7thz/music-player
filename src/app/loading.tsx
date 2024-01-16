import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Loading() {

    return (
        <div className="flex flex-col justify-between min-h-screen bg-zinc-800">
            <div className="min-h-12 flex items-center justify-end  pr-4 pt-2">
                <Avatar>
                    <AvatarFallback>BE</AvatarFallback>
                </Avatar>
            </div>
            <div className="flex m-4 gap-4">
                <div className="bg-zinc-700 w-1/3 min-h-[620px] rounded-lg animate-pulse" />
                <div className="bg-zinc-700 w-2/3 min-h-[620px] rounded-lg animate-pulse" />
            </div>
            <footer className="bg-zinc-700 min-h-[80px] w-full animate-pulse" />
        </div>
    )
}
