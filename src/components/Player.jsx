import { useRef, useEffect, useState } from "react";
import { BgChangeButton } from "./BgChangeButton";

export default function Player() {
    const playerRef = useRef(null);
    const ytPlayer = useRef(null);
    const [currentVideo, setCurrentVideo] = useState("4xDzrJKXOOY");
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoTitle, setVideoTitle] = useState("");

    const [videoIds, setVideoIds] = useState([
        "4xDzrJKXOOY",
        "jfKfPfyJRdk",
        "tGfQYbArQhc",
        "EQnOzVA9ndA",
        "bRnTGwCbr3E",
        "S_MOd40zlYU",
        "Na0w3Mz46GA",
        "5yx6BWlEVcY",
        "tNkZsRW7h2c",
        "mKCieTImjvU",
    ]);

    const alternateVideoIds = [
        "dQw4w9WgXcQ",  // Secret playlist
        "y6120QOlsfU",
        "L_jWHffIx5E",
        "feA64wXhbjo",
        "djV11Xbc914",
        "9bZkp7q19f0",
        "PWgvGjAhvIw",
        "fJ9rUzIMcZQ",
        "btPJPFnesV4",
        "kXYiU_JCYtU",
    ];

    useEffect(() => {
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            tag.async = true;
            document.body.appendChild(tag);
            console.log("api loaded");
        }

        window.onYouTubeIframeAPIReady = () => {
            createPlayer(currentVideo);
        };

        if (window.YT && window.YT.Player) {
            createPlayer(currentVideo);
            console.log("api already loaded");
        }

        return () => {
            if (ytPlayer.current) {
                ytPlayer.current.destroy();
            }
        };
    }, []);

    const createPlayer = (videoId) => {
        ytPlayer.current = new YT.Player(playerRef.current, {
            videoId: videoId,
            playerVars: { autoplay: 1, controls: 1 },
            events: {
                onReady: (event) => {
                    event.target.playVideo();
                    setIsPlaying(true);
                    updateVideoTitle();
                },
                onStateChange: (event) => {
                    setIsPlaying(event.data === 1);
                },
            },
        });
    };

    useEffect(() => {
        if (ytPlayer.current) {
            ytPlayer.current.loadVideoById(currentVideo);
            updateVideoTitle();
        }
    }, [currentVideo]);

    const updateVideoTitle = () => {
        if (ytPlayer.current) {
            setTimeout(() => {
                const videoData = ytPlayer.current.getVideoData();
                if (videoData && videoData.title) {
                    setVideoTitle(videoData.title);
                } else {
                    setVideoTitle("Unknown Title");
                }
            }, 500);
        }
    };

    const togglePlayPause = () => {
        if (ytPlayer.current) {
            if (isPlaying) {
                ytPlayer.current.pauseVideo();
            } else {
                ytPlayer.current.playVideo();
            }
        }
    };

    const handleVideoChange = () => {
        setCurrentVideo(videoIds[Math.floor(Math.random() * videoIds.length)]);
    };

    const handleSecretPlaylist = () => {
        setVideoIds(prevIds => 
            prevIds[0] === alternateVideoIds[0] ? 
            [
                "4xDzrJKXOOY",
                "jfKfPfyJRdk",
                "tGfQYbArQhc",
                "EQnOzVA9ndA",
                "bRnTGwCbr3E",
                "S_MOd40zlYU",
                "Na0w3Mz46GA",
                "5yx6BWlEVcY",
                "tNkZsRW7h2c",
                "mKCieTImjvU",
            ] : 
            alternateVideoIds
        );
    };

    return (
        <div className="pl-4 pt-[85vh] bottom-4 text-white left-4 flex flex-col md:pl-20 md:pt-[85vh] md:bottom-10 md:left-10">
            <div className="hidden" id="player-container">
                <div ref={playerRef}></div>
            </div>
        
            <div className="w-fit bg-inherit font-semibold px-[1.5] py-1 rounded-sm mb-2 text-md">
                {videoTitle || "Loading..."}
            </div>
        
            <div className="flex flex-row space-x-2">
                <button onClick={togglePlayPause} className="text-sm font-pone bg-white text-black p-2 cursor-pointer">
                    {isPlaying ? "Pause" : "Play"}
                </button>
        
                <button onClick={handleVideoChange} className="text-sm font-pone bg-slate-900 text-white p-2 cursor-pointer">
                    Change Radio
                </button>
                <BgChangeButton />
                <div 
                    onClick={handleSecretPlaylist}
                    className="w-20 h-2 bg-transparent cursor-pointer hover:bg-white/10 rounded-full"
                    title="Secret Playlist Toggle"
                />
            </div>
        </div>
    );
}