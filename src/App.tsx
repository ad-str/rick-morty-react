import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { fetchData } from './api/api.ts';

function App() {
  useEffect(() => {
    fetchData('https://rickandmortyapi.com/api/character');
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          HELLO!
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
