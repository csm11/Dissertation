import React from 'react';

const Pokemoncard = ({ image, name, rarity, price, style }) => {
  return (
    <div className="card" style={style}>
      <img src={image} alt={name} />
      <div className="card-info">
        <h3>{name}</h3>
        <p>Rarity: {rarity}</p>
        <p>Points: {price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Pokemoncard;

