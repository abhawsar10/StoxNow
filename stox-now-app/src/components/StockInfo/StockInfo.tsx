import React from 'react';
import { ArrowUpRight, ArrowDownRight, Activity, DollarSign, TrendingUp } from 'lucide-react';
import './StockInfo.css';

interface StockData {
    symbol: string;
    name: string;
    price: number;
    previousClose: number;
    volume: number;
    marketCap: number;
    fiftyTwoWeekLow: number;
    fiftyTwoWeekHigh: number;
}

interface StockInfoProps {
    stockData: StockData;
    buyQuantity: number;
    setBuyQuantity: (quantity: number) => void;
    handleBuy: () => void;
    formatCurrency: (value: number) => string;
}

const StockInfo: React.FC<StockInfoProps> = ({ stockData, buyQuantity, setBuyQuantity, handleBuy, formatCurrency }) => {
    const priceChange = stockData.price - stockData.previousClose;
    const priceChangePercent = (priceChange / stockData.previousClose) * 100;

    return (
        <div className="stock-info">
            <div className="stock-header">
                <div className="stock-title">
                    <h1>{stockData.symbol}</h1>
                    <h2>{stockData.name}</h2>
                </div>
                <div className="stock-price">
                    <h1>{formatCurrency(stockData.price)}</h1>
                    <div className={`price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
                        {priceChange >= 0 
                            ? <ArrowUpRight size={20} /> 
                            : <ArrowDownRight size={20} />
                        }
                        <span>{priceChange.toFixed(2)} ({priceChangePercent.toFixed(2)}%)</span>
                    </div>
                </div>
            </div>

            <div className="stock-details">

                <div className="detail-item">
                    <div className="detail-item-header">
                        <Activity size={16} />
                        <span>Volume</span>
                    </div>
                    <div className="detail-item-value">
                        {stockData.volume.toLocaleString()}
                    </div>
                </div>

                <div className="detail-item">
                    <div className="detail-item-header">
                        <DollarSign size={16} />
                        <span>Market Cap</span>
                    </div>
                    <div className="detail-item-value">
                        {formatCurrency(stockData.marketCap)}
                    </div>
                </div>

                <div className="detail-item">
                    <div className="detail-item-header">
                        <TrendingUp size={16} />
                        <span>52 Week Range</span>
                    </div>
                    <div className="detail-item-value">
                        {formatCurrency(stockData.fiftyTwoWeekLow)} - {formatCurrency(stockData.fiftyTwoWeekHigh)}
                    </div>
                </div>

            </div>

            <div className="buy-section">
                <input
                    className="quantity-input"
                    type="number"
                    min="1"
                    value={buyQuantity}
                    onChange={(e) => setBuyQuantity(Number(e.target.value))}
                />
                <button className="buy-button" onClick={handleBuy}>
                    Buy
                </button>
            </div>
        </div>
    );
};

export default StockInfo;