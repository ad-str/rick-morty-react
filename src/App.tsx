import { useEffect } from 'react';
import './App.css';
import { fetchData } from './api/api.ts';
import FilterablePostsFeed from './components/FilterablePostsFeed.tsx';
import CharacterCard from './components/CharacterCard.tsx';

export default function App() {
  useEffect(() => {
    fetchData('https://rickandmortyapi.com/api/character');
  }, []);

  const CHARACTERS = [
    {name: "Rick", species: "Human", status: "Alive", gender: "Male", dateCreated: "2017-11-04T18:48:46.250Z"},
    {name: "Morty", species: "Human", status: "Alive", gender: "Male", dateCreated: "2017-11-04T18:50:21.651Z"},
    {name: "Adam", species: "Human", status: "Unknown", gender: "Male", dateCreated: "2016-11-04T18:48:46.250Z"},
    {name: "Foo", species: "Human", status: "Unknown", gender: "Male", dateCreated: "2015-11-04T18:50:21.651Z"},
    {name: "Bar", species: "Human", status: "Dead", gender: "Male", dateCreated: "2014-11-04T18:48:46.250Z"},
    {name: "Baz", species: "Human", status: "Dead", gender: "Male", dateCreated: "2013-11-04T18:50:21.651Z"}
  ]

  return (
    <div className="App">
      <FilterablePostsFeed characters={CHARACTERS} />
      <div className="feed-container">
        <CharacterCard />
        <CharacterCard />
        <CharacterCard />
      </div>
    </div>
  );
}
