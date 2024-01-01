"use client";

// @ts-ignore
import useSound from "use-sound";
import { useEffect, useState, useRef } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";
import PlayerMediaItem from "./PlayerMediaItem";
import PlayerLikeButton from "./PlayerLikeButton";


interface PlayerContentProps {
  song: Song;
  songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({ 
  song, 
  songUrl
}) => {
  const player = usePlayer();
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [clickPlaybackPosition, setClickPlaybackPosition] = useState(0);


  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;




  const onPlayNext = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const nextSong = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  }

  const onPlayPrevious = () => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex = player.ids.findIndex((id) => id === player.activeId);
    const previousSong = player.ids[currentIndex - 1];

    if (!previousSong) {
      return player.setId(player.ids[player.ids.length - 1]);
    }

    player.setId(previousSong);
  }

  const [play, { pause, sound }] = useSound(
    songUrl,
    { 
      volume: volume,
      onplay: () => setIsPlaying(true),
      onend: () => {
        setIsPlaying(false);
        onPlayNext();
      },
      onpause: () => setIsPlaying(false),
      format: ['mp3']
    }
  );

  useEffect(() => {
    if (sound) {
      sound.play();

      const updatePlaybackPosition = () => {
        setPlaybackPosition(sound.seek() || 0);
        requestAnimationFrame(updatePlaybackPosition);
      };

      updatePlaybackPosition();

      return () => {
        sound.unload();
      };
    }
  }, [sound]);

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  }

  const handleProgressBarClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!sound) return;

    const progressBar = event.currentTarget;
    const boundingRect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left;
    const newPlaybackPosition = (offsetX / boundingRect.width) * sound.duration();

    setPlaybackPosition(newPlaybackPosition);
    sound.seek(newPlaybackPosition);
  };

  const handleProgressBarDragStart = (event: React.MouseEvent<HTMLDivElement>) => {
    
    setIsDragging(true);

    const progressBar = progressBarRef.current;
    if (progressBar) {
        progressBar.classList.add("dragging");
    }

    document.addEventListener("mousemove", handleProgressBarDrag);
    document.addEventListener("mouseup", handleProgressBarDragEnd);
  };

  const handleProgressBarDrag = (event: MouseEvent) => {
    if (!sound || !isDragging) return;

    const progressBar = document.querySelector(".progress-bar"); // Replace with your progress bar class
    if (!progressBar) return;

    const boundingRect = progressBar.getBoundingClientRect();
    const offsetX = event.clientX - boundingRect.left;
    const newPlaybackPosition = (offsetX / boundingRect.width) * sound.duration();

    setPlaybackPosition(newPlaybackPosition);
    sound.seek(newPlaybackPosition);

    
  };

  const handleProgressBarDragEnd = () => {
    setIsDragging(false);

    const progressBar = progressBarRef.current;
    if (progressBar) {
        progressBar.classList.remove("dragging");
    }

    document.removeEventListener("mousemove", handleProgressBarDrag);
    document.removeEventListener("mouseup", handleProgressBarDragEnd);
  };



  return ( 
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
        <div className="flex w-full justify-start">
          <div className="flex items-center gap-x-4">
            <PlayerMediaItem data={song} isPlaying={isPlaying} />
            <PlayerLikeButton songId={song.id} />
          </div>
        </div>

        <div 
          className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
        >
          <div 
            onClick={handlePlay} 
            className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
          >
            <Icon size={30} className="text-[#372133]" />
          </div>
        </div>

        <div 
          className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          "
        >
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={30} 
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
          />
          <div 
            onClick={handlePlay} 
            className="
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
          >
            <Icon size={30} className="text-[#372133]" />
            
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={30} 
            className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            " 
          />
          <div 
            className="relative w-full h-[5px] bg-neutral-200 rounded-full cursor-pointer" 
            onClick={handleProgressBarClick}
            // onMouseMove={handleProgressBarDrag}
            onMouseDown={handleProgressBarDragStart}
          >
            <div
                className="absolute h-[5px] bg-[#FB5252] rounded-full"
                style={{ width: `${(playbackPosition / (sound?.duration() || 1)) * 100}%` }}
            />
            <div
                className={`absolute h-2 bg-[black] rounded-full black-progress-bar ${isDragging ? "dragging" : ""}`}
                style={{
                left: `${(playbackPosition / (sound?.duration() || 1)) * 100}%`,
                transform: 'translate(-50%, -50%)',
                cursor: 'pointer',
                }}
            />
        </div>
        </div>

        <div className="hidden md:flex w-full justify-end pr-2">
          <div className="flex items-center gap-x-2 w-[120px]">
            <VolumeIcon 
              onClick={toggleMute} 
              className="cursor-pointer text-white" 
              size={34} 
            />
            <Slider 
              value={volume} 
              onChange={(value) => setVolume(value)}
            />
          </div>
        </div>

      </div>
   );
}
 
export default PlayerContent;