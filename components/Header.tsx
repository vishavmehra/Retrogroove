'use client'

import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx'
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Button from "./Button";
import useAuthModal from "@/hooks/useAuthModel";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useUser } from "@/hooks/useUser";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { ModeToggle } from "./ModeToggle";

interface HeaderProps{
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className
}) => {
    const authModal = useAuthModal();
    const router = useRouter();
    const supabaseClient = useSupabaseClient();
    const { user } = useUser();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        router.refresh();

        if (error) {
            toast.error(error.message);
        }
        else{
            toast.success("Logged out");
        }
    }
    return (  
        <div className={twMerge(`
            h-fit
            
            p-6
            `, className
          )}>

            <div className="
                w-full
                mb-4
                flex
                items-center
                justify-between
            ">
                <div className="
                    hidden
                    md:flex
                    gap-x-2
                    items-center
                    ">
                    <button 
                        onClick={() => router.back()}
                        className="
                            rounded-md
                            flex
                            items-center
                            justify-center
                            bg-[#D0C195]
                            hover:bg-[#cbbb8e]
                            dark:bg-[#4c4032]
                            dark:hover:bg-[#5a493b] 
                            
                            transition
                        "
                    >
                        <RxCaretLeft className='text-[#372133] dark:text-[#EAC56A]' size={35}/>
                    </button>
                    <button 
                        onClick={() => router.forward()}
                        className="
                            rounded-md
                            flex
                            items-center
                            justify-center
                            bg-[#D0C195] 
                            dark:bg-[#4c4032]
                            hover:bg-[#cbbb8e] 
                            dark:hover:bg-[#5a493b] 
                            transition
                        "
                    >
                        <RxCaretRight className='text-[#372133] dark:text-[#EAC56A]' size={35}/>
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2">
                    <button
                        className="
                            rounded-md
                            p-2
                            bg-[#D8B182] 
                            hover:bg-[#cbbb8e] 
                            dark:bg-[#4c4032]
                            dark:hover:bg-[#5a493b]
                            flex
                            items-center
                            justify-center
                            transition
                        "
                     >
                        <HiHome size={20} className='text-[#372133] dark:text-[#EAC56A]' onClick={() => {router.push('/')}}/>
                    </button>
                    <button
                        className="
                            rounded-md
                            p-2
                            bg-[#D8B182] 
                            hover:bg-[#cbbb8e] 
                            dark:bg-[#4c4032]
                            dark:hover:bg-[#5a493b]
                            flex
                            items-center
                            justify-center
                            transition
                        "
                     >
                        <BiSearch size={20} className='text-[#372133] dark:text-[#EAC56A]' onClick={() => {router.push('/search')}}/>
                    </button>  
                </div>
                <div className="
                    flex
                    justify-between
                    items-center
                    gap-x-4
                ">
                    {user ? (
                        <div className="flex gap-x-4 items-center"> 
                            <Button
                                onClick={handleLogout}
                                className="
                                    bg-[#D0C195]
                                    hover:bg-[#cbbb8e]
                                    dark:bg-[#4c4032]
                                    text-[#372133] 
                                    dark:text-[#D0C195]
                                    dark:hover:bg-[#5a493b]
                                      px-6 
                                      py-2"
                            >
                                Logout
                            </Button>
                            <Button
                                onClick={() => router.push('/account')}
                                className="bg-[#72C6AA] dark:bg-[#eac56a]"
                            >
                                <FaUserAlt />
                            </Button>
                            <div>
                                <ModeToggle/>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button 
                                    onClick={authModal.onOpen}
                                    className="
                                    bg-[#D0C195]
                                    hover:bg-[#cbbb8e]
                                    dark:bg-[#4c4032]
                                    text-[#372133] 
                                    dark:text-[#D0C195]
                                    dark:hover:bg-[#5a493b]
                                      px-6 
                                      py-2"
                                >
                                    Sign up
                                </Button>
                                
                            </div>
                            <div>
                                <Button 
                                    onClick={authModal.onOpen}
                                    className="
                                    bg-[#72C6AA]
                                    dark:bg-[#EAC56A]
                                        text-[#0f241d]
                                        font-medium
                                        px-6
                                        py-2
                                ">
                                    Log In
                                </Button>
                            </div>
                            <div>
                                <ModeToggle/>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}
 
export default Header;