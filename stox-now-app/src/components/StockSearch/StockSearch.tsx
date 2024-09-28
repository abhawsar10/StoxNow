import React, { useState } from 'react';
import { buyStock, fetchStockData } from '../../services/api';
import './StockSearch.css'

const StockSearch: React.FC = () => {
    
  const [ticker, setTicker] = useState('');
  const [stockData, setStockData] = useState<any>(null);
  const [buyQuantity, setBuyQuantity] = useState(1); 

  const handleSearch = async () => {
    if (ticker.length===0){
      return
    }
    try {
      const stockData = await fetchStockData(ticker);
      setStockData(stockData);
    } catch (error:any) {
      alert(error.message);
      setTicker('')
    }
  };


  const handleBuy = async () => {
    if (buyQuantity <= 0) {
      alert('Please select a valid quantity.');
      return;
    }
    try {
      console.log("buying",ticker)
      const response = await buyStock(ticker, buyQuantity);
      console.log(response)
      alert(`Successfully bought ${buyQuantity} Stock(s) of ${ticker}`);
      // setStockData(null);
      setBuyQuantity(1);
    } catch (error: any) {
      alert(error.message);
    }
  };


  return (
    <div className="stock-search">
      <div className="input-container">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g. AAPL)"
        />
        <button className='search-button' onClick={handleSearch}>Search</button>
      </div>

      {stockData && (
        <div className="stock-container">
          <h2>{stockData.symbol}</h2>
          <h3>{stockData.name}</h3>
          <h3>Price: ${stockData.price}</h3>
          {/* <button className='buy-button'>Buy</button> */}
          <div className="quantity-selector">
            <input
              type="number"
              min="1"
              value={buyQuantity}
              onChange={(e) => setBuyQuantity(Number(e.target.value))}
            />
            <button className='buy-button' onClick={handleBuy}>Buy</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StockSearch;
