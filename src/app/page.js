"use client";

import { useState, useEffect } from 'react';

function HomePage() {

  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {

    fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
      .then((response) => response.json())
      .then((data) => {
        console.log("pokemon list", data);
        setPokemons(data.results);
      })
      .catch((err) => {
        console.error("Error fetching Pokémon: ", err);
      })

  }, []);

  return (
    <div>
      <h1>Pokémon List</h1>
        <ul>
          {pokemons.map((pokemon, index) => (
            <li key={index}>{pokemon.name}</li>
          ))}
        </ul>
        <button>
          Load More
        </button>

    </div>
  );
}

export default HomePage
