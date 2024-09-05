"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function HomePage() {

  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [fetching, setFetching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      router.push(`/Details/${searchQuery.toLowerCase()}`); // Redireccionar a la página de detalles del Pokémon
    }
  };


  return (
    <div className='container'>
            <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Find by name"
        />
        <button type="submit">Buscar</button>
      </form>
      <h1>Pokémon List</h1>
        <ul className='poke-list'>
          {pokemons.map((pokemon, index) => (
            <li key={index}>           
             <Link href={`/Details/${pokemon.name}`}>{pokemon.name}</Link>
             </li>
          ))}
        </ul>
        <button
        className='load'
        onClick={loadMore}
        disabled={fetching}
      >
        {fetching ? 'Cargando...' : 'Load More'}
      </button>
        <img className="pokeball1" src="https://th.bing.com/th/id/R.a3ec35371287e126c74d176b810b4c6d?rik=kd8k%2fIwKA7LWTg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fpokemon-go-png-there-s-something-you-can-do-to-try-to-enhance-your-pokemon-go-experience-maybe-you-want-to-know-of-things-like-how-to-catch-pikachu-as-your-first-pokemon-400.png&ehk=VOKvR7cnIXFMy4pNKWSXnPVIuvmik1hKGRujWYBR%2fgs%3d&risl=&pid=ImgRaw&r=0" alt="" />
        <img className="pokeball2" src="https://2.bp.blogspot.com/-iIPEjC_wjL4/WnjPYcy0iQI/AAAAAAAHd5s/jbrmjTiP61YGB5yR6pLuOGEX-9pr9nOeACLcBGAs/s1600/POKEBALL%2B%25281%2529.png" alt="" />
    </div>
  );
}

export default HomePage
