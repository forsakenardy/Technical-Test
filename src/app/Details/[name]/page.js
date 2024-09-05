"use client";


import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function Details() {

  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) =>  response.json())
      .then((data) => {
        console.log(data);
        setPokemon(data);
      })
     
      .catch((error) => {
        console.error('Error fetching Pokémon data:', error);
        setPokemon(null);
      });
  }, [name]);

  if (!pokemon) {
    return <p>not found</p>;
  }

  return (
    <div>
      <h1>{pokemon.name}</h1>

    </div>
  );
};

export default Details
