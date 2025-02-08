import { useState } from "react";
import { FaPlay,FaPause } from "react-icons/fa6";
import { MdSkipPrevious,MdSkipNext } from "react-icons/md";



export default function Home(){
    const [music, setMusic] = useState("Play")
    
    return (
        <div>
            <div className="flex flex-row" >
            <MdSkipPrevious className="hover:scale-120"/>
            <button onClick={setMusic("Pause")}>
                {music=="Play" ?  <FaPlay className="hover:scale-120" /> : <FaPause className="hover:scale-120" />}
            </button>
            <MdSkipNext className="hover:scale-120" />
            </div>
        </div>
    )

}