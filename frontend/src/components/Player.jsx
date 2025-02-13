import { useRef, useEffect, useState } from "react";
import { BgChangeButton } from "./BgChangeButton";

export default function Player() {
    const playerRef = useRef(null); // Reference to iframe
    const ytPlayer = useRef(null); // Reference to YouTube Player instance
    const [currentVideo, setCurrentVideo] = useState("4xDzrJKXOOY"); // Default video
    const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state
    const [videoTitle, setVideoTitle] = useState(""); // Store video title

    const videoIds = [
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
    ];

    useEffect(() => {
        // Check if YT API is already loaded
        if (!window.YT) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            tag.async = true;
            document.body.appendChild(tag);
            console.log("api loaded");
        }

        // Wait for YT API to be ready
        window.onYouTubeIframeAPIReady = () => {
            createPlayer(currentVideo);
        };

        // If API is already available, initialize player immediately
        if (window.YT && window.YT.Player) {
            createPlayer(currentVideo);
            console.log("api already loaded");
        }

        return () => {
            if (ytPlayer.current) {
                ytPlayer.current.destroy(); // Cleanup the player on unmount
            }
        };
    }, []);

    // Function to create and initialize the YouTube player
    const createPlayer = (videoId) => {
        ytPlayer.current = new YT.Player(playerRef.current, {
            videoId: videoId,
            playerVars: { autoplay: 1, controls: 1 },
            events: {
                onReady: (event) => {
                    event.target.playVideo();
                    setIsPlaying(true);
                    updateVideoTitle(); // Get title when video is ready
                },
                onStateChange: (event) => {
                    setIsPlaying(event.data === 1); // 1 -> playing, 2 -> paused
                },
            },
        });
    };

    useEffect(() => {
        if (ytPlayer.current) {
            ytPlayer.current.loadVideoById(currentVideo);
            updateVideoTitle(); // Update title when video changes
        }
    }, [currentVideo]);

    // Function to update the video title
    const updateVideoTitle = () => {
        if (ytPlayer.current) {
            // Use setTimeout to allow time for video data to load
            setTimeout(() => {
                const videoData = ytPlayer.current.getVideoData();
                if (videoData && videoData.title) {
                    setVideoTitle(videoData.title);
                } else {
                    setVideoTitle("Unknown Title");
                }
            }, 500); // Delay by 500ms to ensure data is loaded
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
    

    return (
        <div className="pl-20 pt-[85vh] bottom-10 text-white left-10 flex flex-col">
        <div className="hidden" id="player-container">
            <div ref={playerRef}></div>
        </div>
    
        <div className="w-fit bg-slate-500 font-bold px-2 py-1 rounded-sm mb-2 text-md">
            {videoTitle || "Loading..."}
        </div>
    
        <div className="flex flex-row space-x-2">
            <button  onClick={togglePlayPause} className="text-sm border bg-white text-black rounded-sm border-slate-100 p-2 cursor-pointer">
                {isPlaying ? "PAUSE" : "PLAY"}
            </button>
    
            <button onClick={handleVideoChange} className="text-sm border bg-slate-900 text-white rounded-sm border-slate-100 p-2 cursor-pointer">
                CHANGE RADIO
            </button>
            <BgChangeButton />
        </div>
    </div>
    
    );
}
