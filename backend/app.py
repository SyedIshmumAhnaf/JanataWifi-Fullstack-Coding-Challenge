# Flask Basic Setup
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Allow CORS for all routes

@app.route('/api/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Backend is running!"})

if __name__ == '__main__':
    app.run(debug=True)
