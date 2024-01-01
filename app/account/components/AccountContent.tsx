"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import LikeItem from "@/app/liked/components/LikeItem";

interface LikedContentProps {
  songs: Song[];
};

const AccountContent: React.FC<LikedContentProps> = ({
  songs
}) => {
  const router = useRouter();
  const { isLoading, user } = useUser();

  const onPlay = useOnPlay(songs);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/');
    }
  }, [isLoading, user, router]);

  if (songs.length === 0) {
    return (
      <div 
        className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
      >
        No liked songs.
      </div>
    )
  }
  return ( 
        <div 
        className="
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-3 
            lg:grid-cols-4 
            xl:grid-cols-5 
            2xl:grid-cols-8 
            gap-4 
            mt-4
        "
        >
            {songs.map((song: any) => (
                <div 
                key={song.id} 
                className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <LikeItem onClick={() => {}} data={song} />
                        {/* <LikeButton songId={song.id} /> */}
                    </div>
                </div>
            ))}
        </div>
    
  );
}
 
export default AccountContent;

