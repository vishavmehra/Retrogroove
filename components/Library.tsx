'use client'

import { RiDiscFill } from 'react-icons/ri'
import { AiOutlinePlus } from 'react-icons/ai'

import { useUser } from '@/hooks/useUser'
import useUploadModal from '@/hooks/useUploadModel copy'
import useAuthModal from '@/hooks/useAuthModel'
import { Song } from '@/types'
import MediaItem from './MediaItem'

interface LibraryProps {
    songs: Song[];
}
const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal()

    const { user } = useUser();

    const onClick = () => {
        if (!user){
            return authModal.onOpen()
        }

        return uploadModal.onOpen();
    }
    return ( 
    <div className="flex flex-col">
        <div 
            className="
                flex
                items-center
                justify-between
                px-5
                pt-4
            " 
        >
            <div 
                className="
                    inline-flex
                    items-center
                    gap-x-2
                " 
            >
                <RiDiscFill size={26} className='text-[#372133] dark:text-[#EAC56A]' />
                <p
                    className='
                        text-[#372133]
                        dark:text-[#EAC56A]
                        font-medium
                        text-md
                    '
                >
                    My library
                
                </p>
            </div>
            <AiOutlinePlus 
                className='text-[#372133] dark:text-[#EAC56A] hover:text-[#945889] cursor-pointer transition' 
                size={26}
                onClick={onClick}/>
        </div>
        <div className='
            flex
            flex-col
            gap-y-4
            mt-4
            px-3
        '>
            {songs.map((item) => (
                <MediaItem
                    onClick={() => {}}
                    key= {item.id}
                    data={item}
                />
            ))}
        </div>
    </div> );
}
 
export default Library;