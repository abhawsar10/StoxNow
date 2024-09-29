
import sqlite3
from flask import Blueprint, abort, jsonify, request
import yfinance as yf

api = Blueprint('main', __name__,)


def get_db():
    db = sqlite3.connect('stoxnow.db')
    db.row_factory = sqlite3.Row
    return db

def fetch_stock_data(ticker):
    try:
        stock = yf.Ticker(ticker)
        data = stock.info

        if 'symbol' not in data or 'longName' not in data:
            raise ValueError("Invalid ticker")
        
        return {
            'symbol': data.get('symbol'),
            'name': data.get('longName'),
            'price': data.get('currentPrice'),
            'previousClose': data.get('previousClose'),
            'volume': data.get('volume'),
            'marketCap': data.get('marketCap'),
            'fiftyTwoWeekLow': data.get('fiftyTwoWeekLow'),
            'fiftyTwoWeekHigh': data.get('fiftyTwoWeekHigh'),
        }
    except Exception as e:
        print(f"Error fetching data for ticker {ticker}: {e}")
        abort(404, description=f"Ticker '{ticker}' not found.")

@api.route('/')
def status_check():
    return jsonify({"status":"ok"})

@api.route('/api')
def status_check_api():
    return jsonify({"status":"ok"})

@api.route('/api/stock/<ticker>')
def get_stock(ticker):
    return jsonify(fetch_stock_data(ticker)), 200

@api.route('/api/portfolio')
def get_portfolio():
    with get_db() as db:
        stocks = db.execute('SELECT * FROM portfolio').fetchall()
    return jsonify([dict(stock) for stock in stocks]), 200

@api.route('/api/buy', methods=['POST'])
def buy_stock():
    data = request.json
    ticker = data['ticker']
    quantity = data['quantity']

    stock = fetch_stock_data(ticker)
    price = stock['price']
    total_value = price * quantity

    with get_db() as db:
        cursor = db.cursor()

        # Check if the stock already exists in portfolio
        cursor.execute('SELECT * FROM portfolio WHERE ticker = ?', (ticker,))
        existing_stock = cursor.fetchone()

        if existing_stock:

            new_quantity = existing_stock['quantity'] + quantity
            new_value = price * new_quantity
            cursor.execute(
                'UPDATE portfolio SET quantity = ?, value = ? WHERE ticker = ?',
                (new_quantity, new_value, ticker)
            )

        else:
            cursor.execute(
                'INSERT INTO portfolio (ticker, quantity, value) VALUES (?, ?, ?)',
                (ticker, quantity, total_value)
            )
        
    db.commit()
    status_code = 200 if existing_stock else 201
    return jsonify({
        'ticker': ticker,
        'quantity': quantity,
        'value': total_value,
    }), status_code


@api.route('/api/sell', methods=['POST'])
def sell_stock():
    data = request.json
    ticker = data['ticker']
    quantity_to_sell  = data['quantity']

    stock = fetch_stock_data(ticker)
    current_price = stock['price']

    with get_db() as db:
        cursor = db.cursor()

        # Check if the stock exists in portfolio
        cursor.execute('SELECT * FROM portfolio WHERE ticker = ?', (ticker,))
        existing_stock = cursor.fetchone()
        if not existing_stock:
            return jsonify({'error': 'Stock not found in portfolio'}), 404
        
        current_quantity = existing_stock['quantity']
        if quantity_to_sell > current_quantity:
            return jsonify({'error': 'Not enough stock to sell'}), 400

        new_quantity = current_quantity - quantity_to_sell
        if new_quantity==0:
            cursor.execute('DELETE FROM portfolio WHERE ticker = ?', (ticker,))
        else:
            cursor.execute(
                'UPDATE portfolio SET quantity = ?, value = ? WHERE ticker = ?',
                (new_quantity, new_quantity*current_price, ticker)
            )

    db.commit()

    return jsonify({
        'ticker': ticker,
        'amount': quantity_to_sell*current_price,
        'remaining_quantity': new_quantity
    }), 200
