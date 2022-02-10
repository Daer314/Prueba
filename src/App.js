import { useEffect, useState } from 'react'
import './App.css';

function App() {

  const [players, setPlayers] = useState([])
  const [height, setHeight] = useState(0)

  useEffect(() => {
    fetchData();
  }, [])
  
  const fetchData = async () => {
    const data = await fetch('https://mach-eight.uc.r.appspot.com/')
    const response = await data.json()
    setPlayers(response.values)
  }

  const getData = (number) => {
    setHeight(number.target.value)
  }

  const filteredPlayers = height ? 
    players.filter(player => player.h_in > height)
           .map((player,index) => {
             return (
               <li key={index}>{`${player.first_name} ${player.last_name}`}</li>
             )
           }) 
    : [];

  return (
    <div className='App'>
      <h1>NBA Players</h1>
      <p>Please enter the height</p>
      <input type='number' onChange={getData} placeholder='search'/>
      <ul>
       { 
        !!filteredPlayers.length ? 
        (<ul data-testid='players-name'>
          {filteredPlayers}
        </ul>) 
        : <p>No matches found</p>
       }
      </ul>
    </div>
  );
}

export default App;
