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
            const title = ytPlayer.current.getVideoData().title;
            setVideoTitle(title);
        }
    };

    const handleVideoChange = () => {
        setCurrentVideo(videoIds[Math.floor(Math.random() * videoIds.length)]);
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

    return (
        <div className="pl-20 pt-[85vh] bottom-10 text-white left-10">
            <div className="hidden" id="player-container">
                <div ref={playerRef}></div>
            </div>

            <div className="text-lg font-bold mb-2">
                {videoTitle || "Loading..."}
            </div>

            <button className="text-sm border border-amber-500 p-2 cursor-pointer" onClick={handleVideoChange}>
                CHANGE RADIO
            </button>

            <button className="text-sm border border-blue-500 p-2 cursor-pointer ml-2" onClick={togglePlayPause}>
                {isPlaying ? "PAUSE" : "PLAY"}
            </button>
            
            <BgChangeButton />
        
        </div>
    );
}
