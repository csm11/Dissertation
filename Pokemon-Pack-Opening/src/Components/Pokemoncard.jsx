import React from 'react';

function Pokemoncard(props) {
  return (
    <div className="card" style={props.style} onClick={props.onClick}>
      <img src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      <p>Rarity: {props.rarity}</p>
      <p>Price: {props.price}</p>
    </div>
  );
}

export default Pokemoncard;

