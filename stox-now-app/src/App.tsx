import React from 'react';
import './App.css';
import StockSearch from './components/StockSearch/StockSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>StoxNow</h1>
      </header>
      <main>
        <StockSearch />
        {/* <Portfolio /> */}
      </main>
    </div>
  );
}

export default App;
