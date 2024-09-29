import React, { useEffect, useState } from 'react';
import './Portfolio.css'
import { fetchPortfolio } from '../../services/api';
import PortfolioItem from '../PortfolioItem/PortfolioItem';

const Portfolio: React.FC = () => {
    
    const [portfolio, setPortfolio] = useState<any[]>([])
    const [portfolioValue, setPortfolioValue] = useState(0)
    const [totalStocks, setTotalStocks] = useState(0)

    async function getPortfolio(){
        const stocks = await fetchPortfolio();

        const total = stocks.reduce(
            (accumulator: Number, currentStock: any) => accumulator + currentStock.value,
            0,
        );
        setPortfolioValue(total)

        const totalstocks = stocks.reduce(
            (accumulator: Number, currentStock: any) => accumulator + currentStock.quantity,
            0,
        );
        setTotalStocks(totalstocks)
        setPortfolio(stocks)
    }

    useEffect(()=>{
        getPortfolio();
    },[])
    
    return (
        <div className='portfolio-container'>
            <div className='portfolio-header'>
                <div className='portfolio-header-row'>
                    <h1>Your Portfolio</h1>
                    <h1>$ {portfolioValue.toFixed(2)}</h1>
                </div>
                <div className='portfolio-header-row'>
                    <h2>Total Stocks Owned</h2>
                    <h2>{totalStocks.toFixed(2)}</h2>
                </div>
            </div>
            <div className='portfolio-titles'>
                <div>Ticker</div>
                <div>Quantity</div>
                <div>Current Value</div>
                <div>Option</div>
            </div>
            {portfolio.map((item)=>(
                <PortfolioItem key={item.ticker} portfolioStock={item} getPortfolio={getPortfolio} />
            ))}
        </div>
    );
};

export default Portfolio;
