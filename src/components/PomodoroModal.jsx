import { useState, useEffect } from "react";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

export default function PomodoroModal({ isOpen, toggleModal, buttonRef }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [pomodoroDuration, setPomodoroDuration] = useState(25); // Default Pomodoro duration

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const startTimer = () => {
    setIsTimerRunning(true);
  };

  const stopTimer = () => {
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeLeft(pomodoroDuration * 60);
    stopTimer();
  };

  const handleDurationChange = (e) => {
    const newDuration = parseInt(e.target.value);
    if (!isNaN(newDuration) && newDuration > 0) {
      setPomodoroDuration(newDuration);
      setTimeLeft(newDuration * 60); // Update timer duration
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + window.scrollY : "50%",
        left: buttonRef.current ? buttonRef.current.getBoundingClientRect().left : "50%",
        transform: "translateX(-50%)",
        background: "inherit",
        color: "#f1f1f1",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.5)",
        width: "90%", // Adjusted for responsiveness
        maxWidth: "300px", // Added for maximum width
        zIndex: 1000,
      }}
    >
      <h3 style={{ color: "#f1f1f1", textAlign: "center" }}>Pomodoro Timer</h3>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm">Duration: </span>
        <input
          type="number"
          value={pomodoroDuration}
          onChange={handleDurationChange}
          className="w-16 text-center bg-transparent border border-gray-300 rounded-md text-sm text-white focus:outline-none"
        />
        <span className="text-sm">min</span>
      </div>

      <div className="flex justify-center items-center mb-4">
        <span className="text-lg">
          {`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}
        </span>
      </div>

      <div className="flex justify-between">
        <button
          onClick={startTimer}
          className="bg-slate-900 px-4 py-2 rounded text-white"
        >
          <FaPlay />
        </button>
        <button
          onClick={stopTimer}
          className="bg-slate-900 px-4 py-2 rounded text-white"
        >
          <FaPause />
        </button>
        <button
          onClick={resetTimer}
          className="bg-slate-900 px-4 py-2 rounded text-white"
        >
          <FaRedo />
        </button>
      </div>

      <button
        onClick={toggleModal}
        className="bg-red-500"
        style={{
          border: "none",
          padding: "10px 20px",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer",
          width: "100%", // Adjusted for responsiveness
          marginTop: "10px",
        }}
      >
        Close
      </button>
    </div>
  );
}
