import { useEffect, useState } from 'react'
import './App.css'
import CatCard from './components/CatCard'

function App() {

  const[image, setImage] = useState("https://cdn2.thecatapi.com/images/2ga.png");
  const[breeds, setBreeds] = useState([{}]);
  const[banned, setBanned] = useState([]);
  const[index, setIndex] = useState(0);

  useEffect(() => {
    getBreeds();
  }, [])

  const getBreeds = async () => {
    const response = await fetch(`https://api.thecatapi.com/v1/breeds`);
    const obj = await response.json();
    const arr = [];
    for(let i = 0; i < obj.length; i++){
      arr.push(obj[i].id);
    }
    setBreeds(obj);
  }

  const addBan = () => {
    if(banned.includes(index)) return;
    const newBans = [...banned, index];
    setBanned(newBans);
  }

  const BansCard = banned.map((ban) => 
    <>
        <button> {breeds[ban].name} </button>
    </>
  )

  const callAPI = async () => {
    let newInd;
    while(true){
      newInd = Math.floor(Math.random() * 67);
      if(banned.includes(newInd) == false) break;
    }
  
    setIndex(newInd);

    let query = `https://api.thecatapi.com/v1/images/search?breed_ids=${breeds[index].id}`;

    const response = await fetch(query);
    const obj = await response.json();
    setImage(obj[0].url);
  }

  return (
    <div className="App">
      <div>
        <ul>
          {BansCard}
        </ul>
      </div>
      <div>

      </div>
      <h1> I Love Cats </h1>
      <button onClick={addBan}> {breeds[index].name} </button>
      <CatCard
        origin = {breeds[index].origin}
        description = {breeds[index].description}
        url = {image}
      />
      <button onClick={callAPI}> New </button>
    </div>
  )
}

export default App
