import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { MusicProvider } from '@/context/musicContext'
import { twMerge } from 'tailwind-merge'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'music player',
  description: 'listen your favorites songs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
    <body className={twMerge(inter.className, "scrollbar scrollbar-thumb-zinc-500")}>
        <MusicProvider>
          {children}
        </MusicProvider>
      </body>
    </html>
  )
}
