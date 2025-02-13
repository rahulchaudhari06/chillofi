import { useState, useRef } from "react";
import TodoModal from "./TodoModal";
import PomodoroModal from "./PomodoroModal";

export default function Navbar() {
  const [isTodoModalOpen, setIsTodoModalOpen] = useState(false);
  const [isPomodoroModalOpen, setIsPomodoroModalOpen] = useState(false);
  const todoButtonRef = useRef(null);
  const pomodoroButtonRef = useRef(null);

  const toggleTodoModal = () => {
    setIsTodoModalOpen(!isTodoModalOpen);
  };

  const togglePomodoroModal = () => {
    setIsPomodoroModalOpen(!isPomodoroModalOpen);
  };

  return (
    <>
      <nav className="bg-inherit text-white p-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center">
          <a href="#" className="text-xl font-bold">Resoundly</a>
          <ul className="flex flex-wrap space-x-6 items-center">
            <li><a href="https://github.com/rahulchaudhari06/chillofi" target="_blank" className="hover:text-gray-300">gh</a></li>
            <li><a href="https://x.com/cipherotaku04" target="_blank" className="hover:text-gray-300">x</a></li>
            <li>
              <button
                ref={todoButtonRef}
                onClick={toggleTodoModal}
                className="hover:text-gray-300"
              >
                Todo
              </button>
            </li>
            <li>
              <button
                ref={pomodoroButtonRef}
                onClick={togglePomodoroModal}
                className="hover:text-gray-300"
              >
                Pomodoro
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <TodoModal isOpen={isTodoModalOpen} toggleModal={toggleTodoModal} buttonRef={todoButtonRef} />
      <PomodoroModal isOpen={isPomodoroModalOpen} toggleModal={togglePomodoroModal} buttonRef={pomodoroButtonRef} />
    </>
  );
}
