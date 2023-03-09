import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Pokemoncard from './Components/Pokemoncard';
import BaseSet from './assets/base_set.jpg';


function App() {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [showImage, setShowImage] = useState(false);
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

  const handleCardClick = (index) => {
    setClickedCard(index);
  }

  return (
    <div>
      {showImage ? (
        <div
          className="image-container"
          onClick={() => setShowImage(false)}
        >
          <img src={BaseSet} alt="pack" />
        </div>
      ) : (
        <div className="pack-container" onClick={() => setShowCards(true)}>
          <img src={BaseSet} alt="pack" className="pack-image" />
          <div className="pack-text">Click to open</div>
        </div>
      )}

      {showCards && (
        <div className="card-container">
          {pokemonCards.map((card, i) => (
            <Pokemoncard
              image={card.images.small}
              name={card.name}
              rarity={card.rarity}
              price={getCardPrice(card)}
              key={i}
              style={{
                zIndex: clickedCard === i ? 1 : (i * -1) + 1,
                transform: clickedCard === i ? 'scale(1.1)' : 'none',
                transition: 'transform 0.3s ease-in-out'
              }}
              onClick={() => handleCardClick(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
export default App;