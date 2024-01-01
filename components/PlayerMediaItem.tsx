"use client";

import Image from "next/image";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

interface PlayerMediaItemProps {
  data: Song;
  onClick?: (id: string) => void;
  isPlaying?: boolean;
}

const PlayerMediaItem: React.FC<PlayerMediaItemProps> = ({
  data,
  onClick
}) => {
  const player = usePlayer();
  const imageUrl = useLoadImage(data);
  const isPlaying = player.activeId === data.id;

  const handleClick = () => {
    if (onClick) {
      return onClick(data.id);
    }
  
    return player.setId(data.id);
  };

  return ( 
    <div
      onClick={handleClick}
      className="
        flex 
        items-center
        gap-x-3 
        cursor-pointer 
        hover:bg-[#191919]
        w-full 
        group
        p-2 
        rounded-md
        transition
      "
    >
      <div 
        className={`
          relative 
          group
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
          ${isPlaying ? 'rotating-image' : ''} // Apply the rotating class conditionally
        `}
      >
        <Image
          fill
          src={"/assets/4x/icon.png"}
          alt="MediaItem"
          className={`
            object-cover 
            group-hover:scale-120 
            transition 
            ${isPlaying ? 'rotating-image' : ''} // Apply the rotating class conditionally
          `}
        />
      </div>
      <div className="flex flex-col gap-y-1 overflow-hidden">
        <p className="text-white  truncate">{data.title}</p>
        <p className="text-neutral-600 text-sm truncate">
          {data.author}, {data.year}
        </p>
        
      </div>
    </div>
  );
}
 
export default PlayerMediaItem;