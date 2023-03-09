import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Pokemoncard from './Components/Pokemoncard';
import BaseSet from './assets/base_set.jpg';

function App() {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const apiKey = '63959bc3-d85e-4fe2-9d14-61d1d9e57242';
  const URL = "https://api.pokemontcg.io/v2/cards/base1-";

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

  const fetchPokemon = () => {
    const pokemon = [];
    for (let i = 0; i < 10; i++) {
      fetch(`${URL}${Math.floor(Math.random() * 102 + 1)}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          pokemon.push(data.data);
          if (pokemon.length === 10) {
            setPokemonCards(pokemon);
          }
        });
    }
  };

  const handleClick = () => {
    setShowCards(true);
    fetchPokemon(); // Call the fetchPokemon function every time the button is clicked
  };

    const handleImageClick = () => {
    setShowImage(false);
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