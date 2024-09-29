import React, { useState } from 'react';
import { buyStock, fetchStockData } from '../../services/api';
import './StockSearch.css'
import { formatCurrency } from '../../services/currencyFormatter';
import StockInfo from '../StockInfo/StockInfo';

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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <div className="stock-search">
      <div className="stock-search-title">
        <div>Search</div>
      </div>
      <div className="input-container">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          placeholder="Enter stock symbol (e.g. AAPL)"
          onKeyDown={handleKeyDown} 
        />
        <button className='search-button' onClick={handleSearch}>Search</button>
      </div>

      {stockData && (
        <StockInfo
          stockData={stockData}
          buyQuantity={buyQuantity}
          setBuyQuantity={setBuyQuantity}
          handleBuy={handleBuy}
          formatCurrency={formatCurrency}
        />
      )}
    </div>
  );
};

export default StockSearch;
