import React, { useEffect, useState } from 'react';
import './Portfolio.css'
import { fetchPortfolio } from '../../services/api';
import PortfolioItem from '../PortfolioItem/PortfolioItem';

const Portfolio: React.FC = () => {
    
    const [portfolio, setPortfolio] = useState<any[]>([])

    async function getPortfolio(){
        const stocks = await fetchPortfolio();
        setPortfolio(stocks)
    }

    useEffect(()=>{
        getPortfolio();
    },[])
    
    return (
        <div className='portfolio-container'>
            <div>Your Portfolio</div>
            {portfolio.map((item)=>(
                <PortfolioItem key={item.ticker} portfolioStock={item} getPortfolio={getPortfolio} />
            ))}
        </div>
    );
};

export default Portfolio;
