"use client";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';

import DescBox from './DescBox';
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import SidebarItem from "./SidebarItem";
import Box from "./Box";
import Library from "./Library";
import { useMemo, useState, useEffect } from "react";
import { useTheme } from "next-themes"

interface SidebarProps {
  children: React.ReactNode;
  songs: Song[];
}

const Sidebar = ({ children, songs }: SidebarProps) => {
  const pathname = usePathname();
  const player = usePlayer();
  const router = useRouter();

  

  const routes = useMemo(() => [
    {
      icon: HiHome,
      label: 'Home',
      active: pathname !== '/search',
      href: '/'
    },
    {
      icon: BiSearch,
      label: 'Search',
      href: '/search',
      active: pathname === '/search'
    },
  ], [pathname]);

  return (
    <div 
      className={twMerge(`
        flex 
        h-full
        `,
        player.activeId && 'h-[calc(100%-80px)]'
      )}
    >
      <div 
        className="
          hidden 
          md:flex 
          flex-col 
          gap-y-2 
          
          h-full 
          w-[300px] 
          p-2
        "
      >
        <div className='
                    flex
                    px-5
                    py-4
                    gap-y-4
                 '>
                    <Box>
                      <div>
                        <Image 
                            onClick={() => router.push('/')}
                            src={`/assets/4x/logoLight.png`}
                            alt='logo' 
                            width={200} 
                            height={200} 
                            className='cursor-pointer block dark:hidden'
                            />
                        <Image 
                            onClick={() => router.push('/')}
                            src={`/assets/4x/logoDark.png`}
                            alt='logo' 
                            width={200} 
                            height={200} 
                            className='cursor-pointer hidden dark:block'
                            />
                      </div>
                    </Box>
                </div>
        <DescBox>
                
                <div className='
                    flex
                    flex-col
                    gap-y-4
                    px-5
                    py-4
                    font-light
                    group
                '>
                    <div
                        className="
                            relative 
                            w-full
                            h-full
                            group
                            rounded-md 
                            overflow-hidden
                        "
                    >
                        <Image src={'/assets/popCover.jpg'} alt='cover' className='object-cover group-hover:scale-110 rounded-md transition' width={300} height={200}/>
                    </div>
                    
                    <span className='font-semibold'>Welcome to Retrogroove!</span>
                    Re-live the 90s

                </div>
            </DescBox>
        <Box>
          <div className="flex flex-col gap-y-4 px-5 py-4">
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Library songs={songs} />
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto py-2">
        {children}
      </main>
    </div>
  );
}
 
export default Sidebar;