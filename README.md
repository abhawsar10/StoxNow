# StoxNow - Full-Stack Stock Trading App
This project is a full-stack stock trading application with a Flask backend, React frontend, and a SQLite Database. The backend manages portfolio operations, fetches stock data, and stores it in the local SQLite Database; while the frontend displays the portfolio and stock information.

### Project Structure
- backend/: Contains the Flask server (API) and Database Connections.
- stox-now-app/: Contains the React application (UI).

## Setup Instructions
### Clone the repository
```   
git clone https://github.com/abhawsar10/StoxNow
cd StoxNow
```

### Backend Setup (Flask)

Navigate to the backend folder and set up the virtual environment, install dependencies, and run the Flask server.

Step-by-step:
```
# Navigate to the backend directory
cd backend

# Set up a virtual environment (optional but recommended)
python3 -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```
This will start the Flask backend on http://127.0.0.1:5000. 

In case the Flask server runs on another port, you will need to update the `API_BASE_URL` in the `\stox-now-app\src\services\api.tsx` file to the address it uses.

### Frontend Setup (React)
Next, set up and run the React frontend.

Step-by-step:

```
# Navigate to the frontend directory
cd stox-now-app

# Install frontend dependencies
npm install  # or yarn install

# Start the React development server
npm start  # or yarn start

```
This will start the React app on http://localhost:3000

To view and interact with the app, open http://localhost:3000 in your browser.




### Shutdown
Terminate the Flask server and React Server running on your machine.

Optional: Deactivating the Virtual Environment
If you're using a virtual environment, you can deactivate it after you are done working:
```
deactivate
```

## API Endpoints (Backend)

- `GET /api` Backend server status check.
  
- `GET /api/portfolio` Fetches the current portfolio.

- `POST /api/buy` Buys a stock (requires ticker and quantity in the request body).

- `POST /api/sell` Sells a stock (requires ticker and quantity in the request body).

- `GET /api/stock/<ticker>` Fetches current data for a specific stock.

- `POST /api/update-portfolio` Updates the portfolio with latest stock pPrices
