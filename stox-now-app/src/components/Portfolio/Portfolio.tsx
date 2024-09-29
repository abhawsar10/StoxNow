import React, { useEffect, useState } from 'react';
import './Portfolio.css'
import { fetchPortfolio } from '../../services/api';
import PortfolioItem from '../PortfolioItem/PortfolioItem';
import { formatCurrency } from '../../services/currencyFormatter';

const Portfolio: React.FC = () => {
    
    const [portfolio, setPortfolio] = useState<any[]>([])
    const [portfolioValue, setPortfolioValue] = useState(0)
    const [totalStocks, setTotalStocks] = useState(0)
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'ascending' | 'descending' } | null>(null);

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

    const sortPortfolio = (key: string) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        
        const sortedPortfolio = [...portfolio].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        
        setPortfolio(sortedPortfolio);
    };

    useEffect(()=>{
        getPortfolio();
    },[])
    
    return (
        <div className='portfolio-container'>
            <div className='portfolio-header'>
                <div className='portfolio-header-row'>
                    <h1>Your Portfolio</h1>
                    <h1 className='number-font'>{formatCurrency(portfolioValue)}</h1>
                </div>
                <div className='portfolio-header-row'>
                    <h2>Total Stocks Owned</h2>
                    <h2 className='number-font'>{totalStocks.toFixed(2)}</h2>
                </div>
            </div>
            <div className='portfolio-titles'>
                <div onClick={() => sortPortfolio('ticker')} className='portfolio-titles-sort'>
                    Ticker {sortConfig?.key === 'ticker' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </div>
                <div onClick={() => sortPortfolio('quantity')} className='portfolio-titles-sort'>
                    Quantity {sortConfig?.key === 'quantity' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </div>
                <div onClick={() => sortPortfolio('value')} className='portfolio-titles-sort'>
                    Current Value {sortConfig?.key === 'value' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
                </div>
                <div>Sell</div>
                <div>Buy</div>
            </div>
            {portfolio.map((item)=>(
                <PortfolioItem key={item.ticker} portfolioStock={item} getPortfolio={getPortfolio} />
            ))}
        </div>
    );
};

export default Portfolio;
