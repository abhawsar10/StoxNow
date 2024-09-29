import React, { useState } from 'react';
import './PortfolioItem.css'
import { sellStock } from '../../services/api';

interface PortfolioItemProps {
    portfolioStock: {
        ticker: string;
        quantity: number;
        value: number;
    };
    getPortfolio : Function;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({portfolioStock, getPortfolio}) => {

    const [sellQuantity, setSellQuantity] = useState(0)

    

    const handleSell = async () => {
        if (sellQuantity <= 0 || sellQuantity > portfolioStock.quantity) {
            alert('Please select a valid quantity to sell.');
            return;
        }
        try {
            console.log("selling",portfolioStock.ticker)
            await sellStock(portfolioStock.ticker, sellQuantity);
            alert(`Successfully Sold ${sellQuantity} Stock(s) of ${portfolioStock.ticker}`);
            getPortfolio();
            setSellQuantity(1);

        } catch (error: any) {
            alert(error.message);
        }
    };

    
    return (
        <div className='portfolio-stock'>
            <div>
                <h3>{portfolioStock.ticker}</h3>
            </div>
            <div>
                {portfolioStock.quantity.toFixed(2)}
            </div>
            <div>
                ${portfolioStock.value.toFixed(2)}
            </div>

            <div className="quantity-selector">
                <input
                type="number"
                min="1"
                value={sellQuantity}
                onChange={(e) => setSellQuantity(Number(e.target.value))}
                />
                <button className='buy-button' onClick={handleSell}>Sell</button>
            </div>

        </div>
    );
};

export default PortfolioItem;
