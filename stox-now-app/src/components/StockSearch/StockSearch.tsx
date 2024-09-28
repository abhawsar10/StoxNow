import React, { useState } from 'react';
import { fetchStockData } from '../../services/api';


const StockSearch: React.FC = () => {
    
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState<any>(null);

  const handleSearch = async () => {
    if (ticker.length===0){
      return
    }
    try {
      const stockData = await fetchStockData(ticker);
      setStockData(stockData);
      setTicker('')
    } catch (error:any) {
      alert(error.message);
      setTicker('')
    }
  };

  return (
    <div className="stock-search">
      <h2>Search Stock</h2>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol (e.g. AAPL)"
      />
      <button onClick={handleSearch}>Search</button>

      {stockData && (
        <div className="stock-info">
          <h3>{stockData.name} ({stockData.symbol})</h3>
          <p>Price: ${stockData.price}</p>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
