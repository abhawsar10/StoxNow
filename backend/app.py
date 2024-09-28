import sqlite3
from flask import Flask
from flask_cors import CORS
from routes import api

def create_database():
    conn = sqlite3.connect('stoxnow.db')
    c = conn.cursor()
    c.execute('''
                CREATE TABLE IF NOT EXISTS portfolio (
                    ticker TEXT PRIMARY KEY,
                    quantity REAL NOT NULL,
                    value REAL NOT NULL
                )
            ''')
    print("Portfolio Table Created")
    conn.commit()
    conn.close()

def create_app():
    app = Flask(__name__)
    CORS(app) 
    app.register_blueprint(api)
    return app

if __name__ == '__main__':
    app = create_app()
    create_database()
    app.run(debug=True) 