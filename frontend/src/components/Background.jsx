import { useBg } from "./BgContext"; // Import context

export default function Background() {
    const { bg } = useBg(); // Get the current background

    return (
        <div
        className="h-screen w-screen -z-50 bg-cover absolute bg-center transition-all duration-500 bg-black brightness-50"            style={{ backgroundImage: `url(${bg})` }}
        />
    );
}
