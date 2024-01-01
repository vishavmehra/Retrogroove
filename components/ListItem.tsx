'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from 'react-icons/fa';


interface ListItemProps {
    image: string;
    name: string;
    href: string;
}
const ListItem: React.FC<ListItemProps> = ({
    image,
    name,
    href
}) => {
    const router = useRouter();

    const onClick = () => {
        router.push(href);
    }
    return (  
        <button
            onClick={onClick}
            className="
                relative
                group
                flex
                items-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-[#D0C195]
                dark:bg-[#4c4032]
                hover:opacity-75
                transition
                pr-4
            "
        >
            <div className="
                relative
                min-h-[64px]
                min-w-[64px]
            ">
                <Image 
                    className="object-cover"
                    src={image}
                    fill
                    alt="Image"
                />
            </div>
            <p className="text-[#372133] dark:text-[#EAC56A] font-medium truncate py-5">
                {name}
            </p>
            <div
                className="
                    absolute
                    transition
                    opacity-0
                    rounded-full
                    flex
                    items-center
                    bg-[#72C6AA]
                    justify-center
                    p-4
                    drop-shadow-md
                    right-5
                    group-hover:opacity-100
                    hover:scale-110
                "
            >
                <FaPlay className='text-[#372133]'/>
            </div>
        </button>
    );
}
 
export default ListItem;