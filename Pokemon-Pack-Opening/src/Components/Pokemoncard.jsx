import React from 'react'

export default function Pokemoncard(props) {

  return (
    <div>
        <img src={props.image} alt= "This is an image"/>
        <h1>{props.name}</h1>
        <h2>{props.rarity}</h2>
        <h3>{props.price}</h3>
    </div>
  )
}
