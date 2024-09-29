import React, { useState } from 'react';
import './PortfolioItem.css'
import { buyStock, sellStock } from '../../services/api';
import { formatCurrency } from '../../services/currencyFormatter';

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
    const [buyQuantity, setBuyQuantity] = useState(0); 

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
    
    const handleBuy = async () => {
        if (buyQuantity <= 0) {
            alert('Please select a valid quantity.');
            return;
        }
        try {
            await buyStock(portfolioStock.ticker, buyQuantity);
            alert(`Successfully bought ${buyQuantity} Stock(s) of ${portfolioStock.ticker}`);
            getPortfolio();
            setBuyQuantity(0);
        } catch (error: any) {
            alert(error.message);
        }
    };


    
    return (
        <tr>
            <td className='td'>
                <h2>{portfolioStock.ticker}</h2>
            </td>
            <td className='td td-right'>
                <h3>{portfolioStock.quantity.toFixed(2)}</h3>
            </td>
            <td className='td td-right'>
                 <h3>{formatCurrency(portfolioStock.value)}</h3>
            </td>
            <td className='td'>
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
            </td>
            <td className='td'>
                <div className="quantity-selector">
                    <input
                        className='quantity-input'
                        type="number"
                        min="0"
                        value={buyQuantity}
                        onChange={(e) => setBuyQuantity(Number(e.target.value))}
                    />
                    <button className='buy-button' onClick={handleBuy}>Buy</button>
                </div>
            </td>
        </tr>
    );
};

export default PortfolioItem;
