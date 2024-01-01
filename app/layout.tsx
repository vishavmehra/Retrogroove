import Sidebar from '@/components/Sidebar'
import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import ToasterProvider from '@/providers/ToasterProvider'
import getSongsByUserId from '@/actions/getSongsByUserId'
import Player from '@/components/Player'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { cn } from '@/lib/utils'

const font = Figtree({ subsets: ['latin']})

export const metadata: Metadata = {
  title: 'Retrogroove',
  description: 'Find 20th century hits',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={cn(
          font.className,
          font.className,
          "bg-[#E0D5B3] dark:bg-[#3D3228]"
        )}>
        <ToasterProvider/>
        <SupabaseProvider>
          <UserProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            storageKey="retrogroove-theme"
          >
            <ModalProvider />
              <Sidebar songs={userSongs}>
              
                  {children}
                
              </Sidebar>
              <Player />
          </ThemeProvider>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
