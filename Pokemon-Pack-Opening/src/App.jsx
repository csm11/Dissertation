import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Pokemoncard from './Components/Pokemoncard';
import BaseSet from './assets/base_set.jpg';




function App() {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const apiKey = '61a8e710-d3f3-4a14-8e78-8bbf7e371e4d';
  const setCode = 'base1'; // Replace with the code of the set you want to retrieve
  const URL = `https://api.pokemontcg.io/v2/cards?set=${setCode}&apiKey=${apiKey}`;
  fetch(URL)
  .then(response => response.text())
  .then(data => console.log(data));

  useEffect(() => {
    fetchPokemon();
  }, []);

  const getCardPrice = (card) => {
    const cardPrice =
      card.tcgplayer.prices.normal !== undefined
        ? card.tcgplayer.prices.normal.market
        : card.tcgplayer.prices['1stEditionHolofoil'] !== undefined
        ? card.tcgplayer.prices['1stEditionHolofoil'].market
        : card.tcgplayer.prices.holofoil.market;
    return cardPrice;
  };
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };
  
  const fetchPokemon = () => {
    const pokemon = [];
    for (let i = 0; i < 10; i++) {
      debounce(() => {
      fetch(`${URL}&page=${Math.floor(Math.random() * 10) + 1}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          pokemon.push(data.data[0]);
          if (pokemon.length === 10) {
            setPokemonCards(pokemon);
          }
        });
      }, 10000)();
    }
  };

  const handleClick = () => {
    setShowCards(true);
    fetchPokemon(); // Call the fetchPokemon function every time the button is clicked
  };

  return (
    <div>
        <button onClick={handleClick}>Open Pack</button> {/* Add a button that generates a new set of Pokemon cards */}
        {showCards && (
    <div className="card-container">
      <div className="image-container">
        <img src={BaseSet} alt="BaseSet" />
      </div>
        {pokemonCards.map((card, i) => (
          <Pokemoncard
            image={card.images.small}
            name={card.name}
            rarity={card.rarity}
            price={getCardPrice(card)}
            key={i}
            style={{ zIndex: i* - i }} // Set the z-index to a value that decreases for each subsequent card
          />
        ))}
      </div>
        )}
    </div>
  );
}

export default App;
