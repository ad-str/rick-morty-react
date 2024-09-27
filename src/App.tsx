import { useEffect } from 'react';
import './App.css';
import { fetchData } from './api/api.ts';
import FilterablePostsFeed from './components/FilterablePostsFeed.tsx';

export default function App() {
  useEffect(() => {
    fetchData('https://rickandmortyapi.com/api/character');
  }, []);

  const CHARACTERS = [
    {name: "Rick", species: "Human", status: "Alive", gender: "Male", dateCreated: "2017-11-04T18:48:46.250Z"},
    {name: "Morty", species: "Human", status: "Alive", gender: "Male", dateCreated: "2017-11-04T18:50:21.651Z"}
  ]

  return (
    <FilterablePostsFeed characters={CHARACTERS} />
  );
}
