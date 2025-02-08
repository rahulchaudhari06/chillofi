import './App.css'
import Home from './components/Home';
import mountain from './assets/mountain.jpg';


function App() {

  return (
    <>

    <div className='h-screen w-screen bg-cover bg-center flex justify-center items-center text-6xl text-slate-100 'style={{ backgroundImage: `url(${mountain})` }}>
      <Home/>
    </div>

    </>
  )
}

export default App
