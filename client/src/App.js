import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import Chat from './features/chat/Chat';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <Chat />
      </header>
    </div>
  );
}

export default App;
