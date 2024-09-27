import { useState, useEffect } from 'react';
import './App.css';
import { fetchData } from './api/api.ts';
import FilterablePostsFeed from './components/FilterablePostsFeed.tsx';
import { Character } from './types/types.ts';

export default function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchCharacters = async () => {
          try {
              const data = await fetchData<{ results: Character[] }>('https://rickandmortyapi.com/api/character');
              setCharacters(data);
          } catch (err) {
              setError((err as Error).message);
          }
      };

      fetchCharacters();
  }, []); // Empty dependency array means this runs once after the initial render


  if (error) {
    return <div>Error fetching characters: {error}</div>; // Show error message
  }
  
  return (
    <div className="App">
      <FilterablePostsFeed characters={characters} />
    </div>
  );
}
