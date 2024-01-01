"use client";

import { Song } from "@/types";
import SongItem from "@/components/SongItem";
import { useEffect, useState } from "react";
import useOnPlay from "@/hooks/useOnPlay";

interface TopPicksContentProps {
  songs: Song[];
}

const TopPicksContent: React.FC<TopPicksContentProps> = ({ songs }) => {
  const numRandomSongs = 5; 
  const [randomSongs, setRandomSongs] = useState<Song[]>([]);
  const onPlay = useOnPlay(songs);

  useEffect(() => {
    
    const clone = [...songs];

    
    for (let i = clone.length - 1; i > 0 && i >= clone.length - numRandomSongs; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clone[i], clone[j]] = [clone[j], clone[i]];
    }

    const selectedSongs = clone.slice(-numRandomSongs);

    setRandomSongs(selectedSongs);
  }, [songs]);

  if (randomSongs.length === 0) {
    return (
      <div className="mt-4 text-neutral-600">
        Generating top picks for you.....
      </div>
    );
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
      {randomSongs.map((item) => (
        <SongItem
          onClick={(id) => onPlay(id)}
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
};

export default TopPicksContent;
