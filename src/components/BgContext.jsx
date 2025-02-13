import { createContext, useContext, useState } from "react";
import g1 from "../assets/g1.gif";
import g2 from "../assets/g2.gif";
import g3 from "../assets/g3.gif";
import g4 from "../assets/g4.gif";
import g5 from "../assets/g5.gif";
import g6 from "../assets/g6.gif";
import g7 from "../assets/g7.gif";

const BgContext = createContext();

const backgrounds = [g1, g2, g3, g4, g5, g6, g7];

export function BgProvider({ children }) {
    const [bg, setBg] = useState(g1); // Default background

    const handleBgChange = () => {
        setBg((prevBg) => {
            const currentIndex = backgrounds.indexOf(prevBg);
            const nextIndex = (currentIndex + 1) % backgrounds.length;
            return backgrounds[nextIndex];
        });
    };

    return (
        <BgContext.Provider value={{ bg, handleBgChange }}>
            {children}
        </BgContext.Provider>
    );
}

// Custom hook to use the background context
export function useBg() {
    return useContext(BgContext);
}
