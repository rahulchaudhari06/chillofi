import { useBg } from "./BgContext"; // Import context

export function BgChangeButton() {
    const { handleBgChange } = useBg(); // Get the function to change background

    return (
        <button
            onClick={handleBgChange}
            className="text-sm border bg-slate-900 text-white rounded-sm border-slate-100 p-2 cursor-pointer"
        >
            Change Background
        </button>
    );
}
