import './App.css'
import { useState } from 'react';
import Background from './components/Background';
import Player from './components/Player';
import Navbar from './components/Navbar';
import TodoModal from './components/TodoModal';
import { BgProvider } from "./components/BgContext";
import { ImPrevious } from 'react-icons/im';


function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
     <div className="relative ">
     <BgProvider>
            <Background />
            <Navbar toggleModal={toggleModal} />
            <TodoModal isOpen={isModalOpen} toggleModal={toggleModal} />
            <Player/>
        </BgProvider>
        </div>
    </>
  )
}

export default App
