# Flask Basic Setup
from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app) # Allow CORS for all routes

with open('stock_market_data.json') as data:
    stock_data = json.load(data) #reading from json file and storing it in stock_data

@app.route('/api/stocks', methods=['GET'])
def get_stocks():
    return jsonify(stock_data)

'''
@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Backend is running!"})
'''

if __name__ == '__main__':
    app.run(debug=True)
