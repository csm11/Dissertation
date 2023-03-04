import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Pokemoncard from './Components/Pokemoncard'





function App() {


const [pokemonCard, setPokemonCard] = useState(false) 
const URL = "https://api.pokemontcg.io/v2/cards/base1-"
useEffect(() => {
  function getPokemon(){ 
    fetch(`${URL}${Math.floor(Math.random() * 102 +1)}`).then(res => res.json()).then(data => {
     console.log(data.data) 
      setPokemonCard(data.data) 
    })
  }
     getPokemon()
},[])

const getCardPrice = (card) => {
  const cardPrice = card.tcgplayer.prices.normal !== undefined ? 
  card.tcgplayer.prices.normal.market : card.tcgplayer.prices['1stEditionHolofoil'] !== undefined 
  ? card.tcgplayer.prices['1stEditionHolofoil'].market : card.tcgplayer.prices.holofoil.market;
  return cardPrice;
}

  return (
    <div className="App">
      {pokemonCard && <Pokemoncard image={pokemonCard.images.small} name={pokemonCard.name} rarity={pokemonCard.rarity} price={getCardPrice(pokemonCard)}/>}
    </div>
  )
    
}

export default App
