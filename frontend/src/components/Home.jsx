import { useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa6";
import { MdSkipPrevious, MdSkipNext } from "react-icons/md";
import rickroll from "../assets/rickroll.mp3";

export default function Home() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(new Audio(rickroll));

    const togglePlayPause = () => {
        isPlaying ? audioRef.current.pause() : audioRef.current.play()
        setIsPlaying(!isPlaying);
    };

    return (
        <div>
            <div className="flex flex-row">
                <MdSkipPrevious className="hover:scale-120 transition-transform duration-200"/>
                <button onClick={togglePlayPause}>
                    {isPlaying ? <FaPause className="hover:scale-120 transition-transform duration-200" /> : <FaPlay className="hover:scale-120 transition-transform duration-200" />}
                </button>
                <MdSkipNext className="hover:scale-120" />
            </div>
        </div>
    );
}
