import React from 'react';

const Pokemoncard = ({ image, name, rarity, price, style }) => {
  return (
    <div className="card" style={{ ...style, position: 'absolute', center: `${style.zIndex * 20}px` }}>
      <img src={image} alt={name} />
      <div className="card-info">
        <h3>{name}</h3>
        <p>Rarity: {rarity}</p>
        <p>Price: ${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Pokemoncard;
