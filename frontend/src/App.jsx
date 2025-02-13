import './App.css';
import { useState } from 'react';
import Background from './components/Background';
import Player from './components/Player';
import Navbar from './components/Navbar';
import TodoModal from './components/TodoModal';
import TimeDisplay from './components/TimeDisplay';  // Import TimeDisplay component
import { BgProvider } from "./components/BgContext";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="relative">
        <BgProvider>
          <Background />
          <Navbar toggleModal={toggleModal} />
          <TimeDisplay /> 
          <TodoModal isOpen={isModalOpen} toggleModal={toggleModal} />
          <Player />
        </BgProvider>
      </div>
    </>
  );
}

export default App;
