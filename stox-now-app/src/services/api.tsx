const API_BASE_URL = 'http://localhost:5000/api';

export const fetchStockData = async (ticker: string) => {

    try {
        const response = await fetch(`${API_BASE_URL}/stock/${ticker}`);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error(`Ticker '${ticker}' not found.`);
            }
            throw new Error('An error occurred while fetching stock data.');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error fetching stock data:', error);
        throw error;
    }
};

export const buyStock = async (ticker: string, quantity: number) => {
  const response = await fetch(`${API_BASE_URL}/buy`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 'ticker': ticker, 'quantity': quantity })
  });
  return response.json();
};

export const sellStock = async (ticker: string, quantity: number) => {
  const response = await fetch(`${API_BASE_URL}/sell`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ticker, quantity })
  });
  return response.json();
};

export const fetchPortfolio = async () => {
  const response = await fetch(`${API_BASE_URL}/portfolio`);
  const data = await response.json();
  return data;
};

export const updatePortfolio = async () => {
  const response = await fetch(`${API_BASE_URL}/update-portfolio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  const data = await response.json();
  return data;
};
