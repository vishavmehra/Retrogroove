"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import LikeButton from "@/components/LikeButton";

import PlayButton from "@/components/PlayButton";

interface LikedItemProps {
  data: Song;
  onClick: (id: string) => void;
}

const LikeItem: React.FC<LikedItemProps> = ({
  data,
  onClick
}) => {LikeItem
  const imagePath = useLoadImage(data);

  return ( 
    <div
      onClick={() => onClick(data.id)} 
      className="
        relative 
        group 
        flex 
        flex-col 
        items-center 
        justify-center 
        rounded-md 
        overflow-hidden 
        gap-x-4 
        bg-[#D0C195]
        dark:bg-[#4c4032]
        cursor-pointer 
        hover:bg-[#c5b585]
        dark:hover:bg-[#4c4032]
        hover:scale-105
        transition 
        p-3
      "
    >
      <div 
        className="
          relative 
          aspect-square 
          w-full
          h-full 
          group
          rounded-md 
          overflow-hidden
        "
      >
        <Image
          className="object-cover group-hover:scale-110 transition"
          src={imagePath || '/images/music-placeholder.png'}
          fill
          alt="Image"
        />
      </div>
        <div className="flex flex-col items-start w-full pt-4 gap-y-1">
          <p className="font-semibold dark:text-[#c7a84c] text-[#372133] truncate w-full">
            {data.title}
          </p>
          <p className="font-medium text-neutral-600 dark:text-[#c5bb9d] truncate w-full">
            {data.genre}
          </p>
          <p 
            className="
              text-neutral-600 
              dark:text-[#c5bb9d]
              text-sm 
              pb-4 
              w-full 
              truncate
            "
          >
            By {data.author}, {data.year}
          </p>
          <div className="flex">
            <LikeButton songId={data.id}/>
          </div>
        </div>
      <div 
        className="
          absolute 
          bottom-30 
          right-6
        "
      >
        <PlayButton />
      </div>
    </div>
   );
}
 
export default LikeItem;