from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import mysql.connector

app = Flask(__name__)
CORS(app) 

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="stock_user",
        password="Secure@123",
        database="stock_market",
        autocommit=True
    )

with open('stock_market_data.json') as data:
    stock_data = json.load(data) 

@app.route('/api/stocks/recent', methods=['GET'])
def get_recent_stocks():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    cursor.execute("""
        SELECT DATE_FORMAT(date, '%%Y-%%m-%%d') as date, trade_code, open, high, low, close, volume
        FROM stocks
        ORDER BY date DESC
        LIMIT 10
    """)
    recent_stocks = cursor.fetchall()
    cursor.close()
    db.close() 
    return jsonify(recent_stocks)


@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    limit = int(request.args.get('limit', 10000))
    offset = int(request.args.get('offset', 0))
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    #cursor.execute("SELECT * FROM stocks LIMIT 100")
    #cursor.execute("SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, trade_code, open, high, low, close, volume FROM stocks ORDER BY date ASC LIMIT %s OFFSET %s")
    sql = "SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, trade_code, open, high, low, close, volume FROM stocks ORDER BY date ASC LIMIT %s OFFSET %s"
    values = (limit, offset)
    cursor.execute(sql, values)
    stocks = cursor.fetchall()
    cursor.close()
    db.close() 
    return jsonify(stocks)
    #return jsonify(stock_data)

@app.route('/api/allStocks', methods=['GET'])
def get_all_stocks():
    limit = int(request.args.get('limit', 100))
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    #cursor.execute("SELECT * FROM stocks LIMIT 100")
    #cursor.execute("SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, trade_code, open, high, low, close, volume FROM stocks ORDER BY date ASC LIMIT %s OFFSET %s")
    sql = "SELECT DATE_FORMAT(date, '%Y-%m-%d') as date, trade_code, open, high, low, close, volume FROM stocks ORDER BY date ASC lIMIT %s"
    values = (limit,)
    cursor.execute(sql,values)
    stocks = cursor.fetchall()
    cursor.close()
    db.close() 
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

'''
@app.route('/api/stocks/<string:date>/<string:trade_code>', methods=['DELETE'])
def delete_stock(date,trade_code):
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    sql = "DELETE FROM stocks WHERE date=%s AND trade_code=%s"
    values = (date, trade_code)
    cursor.execute(sql, values)
    db.commit()
    return jsonify({"message": "Stock deleted"})

@app.route('/api/stocks', methods=['POST'])
def add_stock():
    db = get_db_connection()
    cursor = db.cursor(dictionary=True)
    stock = request.json
    sql = "INSERT INTO stocks (date, trade_code, high, low, open, close, volume) VALUES (%s, %s, %s, %s, %s, %s, %s)"
    values = (stock['date'], stock['trade_code'], stock['high'], stock['low'], stock['open'], stock['close'], stock['volume'])
    cursor.execute(sql, values)
    db.commit()
    return jsonify({"message": "Stock added"})

@app.route('/api/stocks/<string:date>/<string:trade_code>', methods=['PUT'])
def update_stock(date, trade_code):
    db = get_db_connection()
    cursor = db.cursor()
    stock_data = request.json

    sql = "UPDATE stocks SET high = %s, low = %s, open = %s, close = %s, volume = %s WHERE date = %s AND trade_code = %s"
    values = (stock_data['high'],stock_data['low'],stock_data['open'],stock_data['close'],stock_data['volume'],date,trade_code)
    cursor.execute(sql, values)
    db.commit()
    cursor.close()
    db.close()
    return jsonify({"message": "Stock updated successfully"})

if __name__ == '__main__':
    app.run(debug=True)
