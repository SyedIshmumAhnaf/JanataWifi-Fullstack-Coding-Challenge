# Flask Basic Setup
from flask import Flask, jsonify
from flask_cors import CORS
import json
import mysql.connector

app = Flask(__name__)
CORS(app) # Allow CORS for all routes

db = mysql.connector.connect(
    host="localhost",
    user="stock_user",
    password="Secure@123",
    database="stock_market"
)
cursor = db.cursor(dictionary=True)

with open('stock_market_data.json') as data:
    stock_data = json.load(data) #reading from json file and storing it in stock_data

@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    #cursor.execute("SELECT * FROM stocks LIMIT 100")
    cursor.execute("SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, trade_code, open, high, low, close, volume FROM stocks LIMIT 100")
    stocks = cursor.fetchall()
    return jsonify(stocks)
    #return jsonify(stock_data)

'''
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Backend is running!"})
'''

if __name__ == '__main__':
    app.run(debug=True)
