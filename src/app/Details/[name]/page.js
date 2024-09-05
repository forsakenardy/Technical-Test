"use client";


import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function Details() {

  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
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
    <div className='container' >
      <img className='poke-img' src={pokemon.sprites.front_default} alt={`${pokemon.name} front`} />
      <img className='poke-img' src={pokemon.sprites.front_shiny} alt={`${pokemon.name} shiny`} />
      <h1>{pokemon.name}</h1>
      <div className='details'>
      <p>ID: {pokemon.id}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Height: {pokemon.height}</p>
      <p>Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
      <p>Stats: {pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join(', ')}</p>
      </div>

    </div>
  );
};

export default Details
