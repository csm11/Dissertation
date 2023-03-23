import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Pokemoncard from './Components/Pokemoncard';
import BaseSet from './assets/base_set.jpg';
import SilverTempest from './assets/SilverTempest.jpeg';


function App() {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [clickedCard, setClickedCard] = useState(null);
  const [showImage, setShowImage] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [showPacks, setShowPacks] = useState(true);
  const [timeLeft, setTimeLeft] = useState(30);
const [timeEnded, setTimeEnded] = useState(false)
const [isShaking, setIsShaking] = useState(true);

  const [points, setPoints] = useState(50); // Initialize points to 50
  const URL_BASE_SET = "https://api.pokemontcg.io/v2/cards/base1-"; //base pack
  const URL_SILVER_TEMPEST = "https://api.pokemontcg.io/v2/cards/swsh12-"; //silver tempest pack
  const apiKey = "63959bc3-d85e-4fe2-9d14-61d1d9e57242";

  useEffect(() => {
    if (timeLeft === 1) {
      return; // stop updating the points when timer reaches 0
    }})

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft => {
        if (timeLeft === 0) {
          clearInterval(intervalId); // stop the interval
          // additional actions if needed
          
        }
        return timeLeft -1;
      });
    }, 1000);
  
    return () => clearInterval(intervalId);
  }, []);
  
  document.addEventListener("mousemove", function(event) {
    document.documentElement.style.setProperty('--mouse-x', event.clientX + "px");
    document.documentElement.style.setProperty('--mouse-y', event.clientY + "px");
  });
  console.log(MouseEvent)
  
  const getCardPrice = (card) => {
    if (!card) {
      return 0; // return 0 if card is undefined
    }

  //gets the card price from the api data
    let cardPrice;
    if (card.tcgplayer && card.tcgplayer.prices) {
      cardPrice =
        card.tcgplayer.prices.normal !== undefined //checking if value is not defined
          ? card.tcgplayer.prices.normal.market
          : card.tcgplayer.prices['1stEditionHolofoil'] !== undefined
          ? card.tcgplayer.prices['1stEditionHolofoil'].market
          : card.tcgplayer.prices.holofoil.market;
    } else {
      cardPrice = 0; // set card price to 0 if prices are not available
    }
    return cardPrice;
  };
const fetchPokemon = (packUrl) => {
  const availableCards = Array.from(Array(102).keys())
    //.filter(cardNumber => cardNumber !== 50 && cardNumber !== 72);

  const pokemon = [];
  for (let i = 0; i < 10; i++) {
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const cardNumber = availableCards[randomIndex];
    availableCards.splice(randomIndex, 1);

    fetch(`${packUrl}${cardNumber}?apiKey=${apiKey}`)
      .then((res) => res.json())
      .then((data) => {
        pokemon.push(data.data);
        if (pokemon.length === 10) {
          setPokemonCards(pokemon);
          setShowButton(true);
          setShowPacks(false);
          const totalCardPrices = pokemon.reduce((sum, card) => sum + getCardPrice(card), 0);
          if (packUrl === URL_SILVER_TEMPEST) {
            setPoints(points + totalCardPrices - 10);
          } else {
            setPoints(points + totalCardPrices - 50);
          }
        }
      });
  }
};

const handleBaseSetClick = () => {
  setShowImage(false);
  setClickedCard(null);
  fetchPokemon(URL_BASE_SET);
  setShowPacks(false);
  setPokemonCards([]);
  setIsShaking(false);
};

const handleSilverTempestClick = () => {
  setShowImage(false);
  setClickedCard(null);
  fetchPokemon(URL_SILVER_TEMPEST);
  setShowPacks(false);
  setPokemonCards([]);
  setIsShaking(false);
};

const shakeAnimation = "shake 0.5s ease-in-out";

  //Back button 
  const handleGoBackClick = () => {
    setShowImage(false);
    setClickedCard(null);
    setShowPacks(true); // update showPacks to true when the button is clicked
    setPokemonCards([]);
    setShowButton(true);
    setIsShaking(true);
    setShowButton(false);
  };
  
//use effect creates an interval may delete
  useEffect(() => {
    const intervalId = setInterval(() => {
      setPoints(points => points + 0);
    }, 1000); // Update points every second
    return () => clearInterval(intervalId); // Cleanup function to clear interval
  }, []);


  useEffect(() => {
    if (timeLeft === 0) {
      window.location.href = 'survey.html';
    }
  }, [timeLeft]);
  
  return ( 
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '2%' }}>
      <div style={{ position: 'absolute', top: '15%', textAlign: 'center' }}>
        <h1 style={{ fontSize: '100%' }}>Time left: {timeLeft} seconds</h1>
        
        <div style={{ position: 'relative' }}>
          <div className="points-container">
            <p>Points: {points.toFixed(2)}</p>
          </div>
          {showPacks && (
        <div style={{ display: 'flex' }}>
          <div className="pack-container pack1" onClick={() => handleBaseSetClick()}>
            <img src={BaseSet} alt="base set pack" className="pack-image" />
            <p>50 Points</p>
          </div>
          <div className="pack-container pack2" onClick={() => handleSilverTempestClick()}>
            <img src={SilverTempest} alt="silver tempest pack" className="pack-image" />
            <p>20 Points</p>
          </div>
            </div>
          )}
          
          <div className="card-container">
          <div class="pokemon-card"></div>
            {pokemonCards.map((card, i) => (
              card && (
                <Pokemoncard
                  image={card.images.small}
                  name={card.name}
                  rarity={card.rarity}
                  price={getCardPrice(card)}
                  key={i}
                  onClick={() => handleCardClick(i)}
                />
              )
            ))}
            {showButton && (
              <button onClick={() => handleGoBackClick()}>Go Back To Packs</button>
            )}
          </div>
  
          <div style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)' }}>
  
          </div>
        </div>
      </div>
    </div>
  );
  
        }





        
  export default App;
  