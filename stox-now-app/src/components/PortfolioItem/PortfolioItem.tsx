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
        if (sellQuantity <= 0) {
            alert('Please select a valid quantity to sell.');
            setSellQuantity(0);
            return;
        }
        if (sellQuantity > portfolioStock.quantity) {
            alert('Not enough stocks to sell.');
            setSellQuantity(0);
            return;
        }
        try {
            console.log("selling",portfolioStock.ticker)
            await sellStock(portfolioStock.ticker, sellQuantity);
            alert(`Successfully Sold ${sellQuantity} Stock(s) of ${portfolioStock.ticker}`);
            getPortfolio();
            setSellQuantity(0);

        } catch (error: any) {
            alert(error.message);
        }
    };

    
    return (
        <div className='portfolio-stock'>
            <div>
                <h2>{portfolioStock.ticker}</h2>
            </div>
            <div>
                <h3>{portfolioStock.quantity.toFixed(2)}</h3>
            </div>
            <div>
                <h3>$ {portfolioStock.value.toFixed(2)}</h3>
            </div>

            <div className="quantity-selector">
                <input
                    className='quantity-input'
                    type="number"
                    min="0"
                    value={sellQuantity}
                    onChange={(e) => setSellQuantity(Number(e.target.value))}
                />
                <button className='sell-button' onClick={handleSell}>Sell</button>
            </div>

        </div>
    );
};

export default PortfolioItem;
