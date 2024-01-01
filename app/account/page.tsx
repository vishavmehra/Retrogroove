import Header from "@/components/Header";

import getLikedSongs from "@/actions/getLikedSongs";
import AccountContent from "./components/AccountContent";
import Image from "next/image";

const Account = async () => {
    const songs = await getLikedSongs();

  return (
    <div className="
            rounded-lg
            h-full
            w-full
            overflow-hidden
            overflow-y-auto
        ">
            <Header>
                {/* <Image src={'/assets/popCover.jpg'} alt='cover' width={500} height={500} className="rounded-md"/> */}
                <div className="mt-20">
                    <div className="
                        flex
                        flex-col
                        md:flex-row
                        items-center
                        justify-bottom
                        gap-x-5
                    ">
                        <div className="
                            relative
                            h-32
                            w-32
                            lg:h-44
                            lg:w-44
                        ">
                            <Image
                                fill
                                alt = 'playlist'
                                className="object-cover rounded-md"
                                src='/assets/like.png'
                            />
                        </div>
                        <div className="
                            flex
                            flex-col
                            gap-y-2
                            mt-4
                            md:mt-0
                        ">
                            <h1 className="
                                text-[#372133]
                                dark:text-[#EAC56A]
                                text-4xl
                                sm:text-5xl
                                lg:text-7xl
                                font-bold
                            ">
                                Thank you!
                            </h1>
                            

                        </div>
                    </div>
                </div>
            </Header>
            
        </div>
  )
}

export default Account;