import React from 'react';
import './App.css';
import StockSearch from './components/StockSearch/StockSearch';
import Portfolio from './components/Portfolio/Portfolio';
import { Route,  Routes, Link, useLocation } from 'react-router-dom';
import { FaSearch, FaChartLine } from 'react-icons/fa';

function App() {
  const location = useLocation();
  return (
      <div className="App">
        <header className="App-header">
          <a href='/'><h1>StoxNow</h1></a>
          <nav>
            <Link to="/search" title="Search Stock" className={location.pathname === "/search" || location.pathname === "/"? "active" : ""}>
              <FaSearch size={24} />
            </Link>
            <Link to="/portfolio" title="View Portfolio" className={location.pathname === "/portfolio" ? "active" : ""}>
              <FaChartLine size={24} />
            </Link>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path="/search" element={<StockSearch />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/" element={<StockSearch />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
