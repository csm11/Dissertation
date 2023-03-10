import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Pokemoncard from './Components/Pokemoncard';
import BaseSet from './assets/base_set.jpg';
import SilverTempest from './assets/SilverTempest.jpg';

function App() {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [clickedCard, setClickedCard] = useState(null);
  const [showImage, setShowImage] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showPacks, setShowPacks] = useState(true);

  const [points, setPoints] = useState(50); // Initialize points to 50
  const URL_BASE_SET = "https://api.pokemontcg.io/v2/cards/base1-";
  const URL_SILVER_TEMPEST = "https://api.pokemontcg.io/v2/cards/swsh12-";

  const getCardPrice = (card) => {
    if (!card) {
      return 0; // return 0 if card is undefined
    }

  
    let cardPrice;
    if (card.tcgplayer && card.tcgplayer.prices) {
      cardPrice =
        card.tcgplayer.prices.normal !== undefined
          ? card.tcgplayer.prices.normal.market
          : card.tcgplayer.prices['1stEditionHolofoil'] !== undefined
          ? card.tcgplayer.prices['1stEditionHolofoil'].market
          : card.tcgplayer.prices.holofoil.market;
    } else {
      cardPrice = 0; // set card price to 0 if prices are not available
    }
    return cardPrice;
  };

  const fetchPokemon = (url) => {
    const availableCards = Array.from(Array(102).keys())
    .filter(cardNumber => cardNumber !== 50 && cardNumber !== 72); // exclude card number 50 and 72

    const pokemon = [];
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * availableCards.length); // select a random index from the availableCards array
      const cardNumber = availableCards[randomIndex]; // get the card number at the selected index
      availableCards.splice(randomIndex, 1); // remove the card number from the availableCards array

      fetch(`${url}${cardNumber}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.data);
          pokemon.push(data.data);
          if (pokemon.length === 10) {
            setPokemonCards(pokemon);
            setShowButton(true);
            setShowPacks(false);
            const totalCardPrices = pokemon.reduce((sum, card) => sum + getCardPrice(card), 0);
            setPoints(points + totalCardPrices - 50);
          }
        });
    }
  };
  const handleGoBackClick = () => {
    setShowImage(false);
    setClickedCard(null);
    setShowPacks(true); // update showPacks to true when the button is clicked
  };
  

  const handleBaseSetClick = () => {
    setShowImage(false);
    setClickedCard(null); // Reset clickedCard before fetching new cards
    fetchPokemon(URL_BASE_SET);
    setShowPacks(false);

  };

  const handleSilverTempestClick = () => {
    setShowImage(false);
    setClickedCard(null); // Reset clickedCard before fetching new cards
    fetchPokemon(URL_SILVER_TEMPEST);
    setShowPacks(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setPoints(points => points + 0);
    }, 1000); // Update points every second
    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, []);

  return (
    <div>
      <p>Points: {points}</p>
      {showPacks && (
  <div>
    <div className="pack-container" onClick={() => handleBaseSetClick()}>
      <img src={BaseSet} alt="base set pack" className="pack-image" />
    </div>
    <div className="pack-container" onClick={() => handleSilverTempestClick()}>
      <img src={SilverTempest} alt="silver tempest pack" className="pack-image" />
    </div>
  </div>
)}


      

{pokemonCards.map((card, i) => (
  card && (
    <Pokemoncard
      image={card.images.small}
      name={card.name}
      rarity={card.rarity}
      price={getCardPrice(card)}
      key={i}
      style={{
        zIndex: pokemonCards.length - i + 10,
        transform: clickedCard === i ? 'scale(1.1)' : 'none',
        transition: 'transform 0.3s ease-in-out'
      }}
      onClick={() => handleCardClick(i)}
    />
  )
))}
          {showButton && ( // Render button only if showButton is true
            <button onClick={() => handleGoBackClick()}>Go Back</button>

          )}
        </div>
      )

}


export default App;
