"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

function HomePage() {

  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [fetching, setFetching] = useState(false);

  useEffect(() => {

    const initialPokemons = () => {
      fetch(next)
        .then((response) => response.json())
        .then((data) => {
          setPokemons(data.results);
          setNext(data.next);
        })
        .catch((err) => {
          console.error("Error fetching Pokémon: ", err);
        });
    };
    initialPokemons();
  }, []);

  useEffect(() => {

    if (!fetching) return

    fetch(next)
      .then((response) => response.json())
      .then((data) => {
        setPokemons((prevList) => [...prevList, ...data.results]); 
        setNext(data.next);
        setFetching(false);
      })
      .catch((err) => {
        console.error("Error fetching Pokémon: ", err);
      })

  }, [fetching, next]);

  const loadMore = () => {
    if (next) {
      setFetching(true)
    }
  };


  return (
    <div>
      <h1>Pokémon List</h1>
        <ul>
          {pokemons.map((pokemon, index) => (
            <li key={index}>           
             <Link href={`/Details/${pokemon.name}`}>{pokemon.name}</Link>
             </li>
          ))}
        </ul>
        <button onClick={loadMore}>
          Load More
        </button>

    </div>
  );
}

export default HomePage
