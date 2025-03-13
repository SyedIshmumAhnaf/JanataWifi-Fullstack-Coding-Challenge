# Flask Basic Setup
from flask import Flask, jsonify, request
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
@app.route('/api/stocks/<int:id>', methods=['PUT'])
def update_stock(id):
    stock = request.json
    sql = "UPDATE stocks SET trade_code=%s, high=%s, low=%s, open=%s, close=%s, volume=%s WHERE id=%s"
    values = (stock['trade_code'], stock['high'], stock['low'], stock['open'], stock['close'], stock['volume'], id)
    cursor.execute(sql, values)
    db.commit()
    return jsonify({"message": "Stock updated"})

@app.route('/api/stocks', methods=['POST'])
def add_stock():
    stock = request.json
    sql = "INSERT INTO stocks (date, trade_code, high, low, open, close, volume) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    values = (stock['date'], stock['trade_code'], stock['high'], stock['low'], stock['open'], stock['close'], stock['volume'])
    cursor.execute(sql, values)
    db.commit()
    return jsonify({"message": "Stock added"})
'''
@app.route('/api/stocks/<string:date>', methods=['DELETE'])
def delete_stock(date):
    sql = "DELETE FROM stocks WHERE date=%s"
    values = (date,)
    cursor.execute(sql, values)
    db.commit()
    return jsonify({"message": "Stock deleted"})
'''
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Backend is running!"})
'''

if __name__ == '__main__':
    app.run(debug=True)
