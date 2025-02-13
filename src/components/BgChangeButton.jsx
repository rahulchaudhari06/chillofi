import { useBg } from "./BgContext"; // Import context

export function BgChangeButton() {
    const { handleBgChange } = useBg(); // Get the function to change background

    return (
        <button
            onClick={handleBgChange}
            className="text-sm  bg-slate-900 font-pone text-white  p-2 cursor-pointer"
        >
            Change Background
        </button>
    );
}
