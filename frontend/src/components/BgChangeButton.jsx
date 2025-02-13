import { useBg } from "./BgContext"; // Import context

export function BgChangeButton() {
    const { handleBgChange } = useBg(); // Get the function to change background

    return (
        <button
            onClick={handleBgChange}
            className="text-sm border border-blue-500 p-2 cursor-pointer ml-2"
        >
            Change Background
        </button>
    );
}
