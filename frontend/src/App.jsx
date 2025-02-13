import './App.css'
import Background from './components/Background';
import Player from './components/Player';
import Navbar from './components/Navbar';
import { BgProvider } from "./components/BgContext";


function App() {

  return (
    <>
     <div className="relative ">
     <BgProvider>
            <Background />
            <Navbar />
            <Player/>
        </BgProvider>
        </div>
    </>
  )
}

export default App
