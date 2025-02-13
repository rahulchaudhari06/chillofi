import { useState, useEffect } from 'react';

function TimeDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [name, setName] = useState(localStorage.getItem('userName') || '');

  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      setCurrentTime(`${hours}:${minutes} ${ampm}`);
    }, 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
    localStorage.setItem('userName', event.target.value);
  };

  return (

    <div className="absolute top-[40vh] left-[50vh] font-bold text-2xl text-white md:top-[20vh] md:left-[25vh]">
      <div className='text-6xl'>{currentTime}</div>
      <div>
        Time to do some work 
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder=""
          className="ml-[5px] "
        />
      </div>
    </div>

  );
}

export default TimeDisplay;
