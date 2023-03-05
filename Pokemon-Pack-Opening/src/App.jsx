import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Pokemoncard from './Components/Pokemoncard'





function App() {


const [pokemonCards, setPokemonCards] = useState([]) 
const URL = "https://api.pokemontcg.io/v2/cards/base1-"
useEffect(() => {
  function getPokemon(){ 
    const pokemon =[] 
  for (let i = 0; i < 10; i++){
    fetch(`${URL}${Math.floor(Math.random() * 102 +1)}`).then(res => res.json()).then(data => {
     console.log(data.data) 
     pokemon.push(data.data)
     if(pokemon.length ===10){setPokemonCards(pokemon)}
    })
  }
}
  getPokemon()
},[])


const getCardPrice = (card) => {
  const cardPrice = card.tcgplayer.prices.normal !== undefined ? 
  card.tcgplayer.prices.normal.market : card.tcgplayer.prices['1stEditionHolofoil'] !== undefined 
  ? card.tcgplayer.prices['1stEditionHolofoil'].market : card.tcgplayer.prices.holofoil.market;
  return cardPrice;
}

if(pokemonCards.length === 0)
{return (<div> Loading </div>)}

  return (
    <div className="App">
     { /* {pokemonCard && <Pokemoncard image={pokemonCard.images.small} name={pokemonCard.name} rarity={pokemonCard.rarity} price={getCardPrice(pokemonCard)}/>} */ }
    {pokemonCards.map((card, i)=> <Pokemoncard image={card.images.small} name={card.name} rarity={card.rarity} price={getCardPrice(card)} key={i} />)}
    </div>
  )
    
}

export default App
