from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

# 景点数据
attractions = [
    {
        "name": "岳麓山",
        "location": [112.936, 28.186],
        "type": "natural",
        "crowdLevel": {
            "morning": "low",
            "afternoon": "medium",
            "evening": "low"
        },
        "description": "长沙著名的自然风景区，适合徒步和观光"
    },
    {
        "name": "橘子洲头",
        "location": [112.961, 28.195],
        "type": "natural",
        "crowdLevel": {
            "morning": "low",
            "afternoon": "high",
            "evening": "medium"
        },
        "description": "湘江中的著名景点，毛泽东青年艺术雕塑所在地"
    },
    {
        "name": "湖南省博物馆",
        "location": [112.996, 28.211],
        "type": "cultural",
        "crowdLevel": {
            "morning": "medium",
            "afternoon": "high",
            "evening": "low"
        },
        "description": "展示湖南历史文化的综合性博物馆"
    },
    {
        "name": "太平街",
        "location": [112.976, 28.196],
        "type": "historical",
        "crowdLevel": {
            "morning": "low",
            "afternoon": "high",
            "evening": "high"
        },
        "description": "长沙保存最完整的历史文化街区"
    },
    {
        "name": "天心阁",
        "location": [112.982, 28.191],
        "type": "historical",
        "crowdLevel": {
            "morning": "low",
            "afternoon": "medium",
            "evening": "low"
        },
        "description": "长沙古城的重要历史遗迹"
    }
]

@app.route('/')
def serve_index():
    return send_from_directory('.', 'index.html')

@app.route('/style.css')
def serve_style():
    return send_from_directory('.', 'style.css')

@app.route('/app.js')
def serve_app():
    return send_from_directory('.', 'app.js')

@app.route('/api/attractions')
def get_attractions():
    return jsonify(attractions)

@app.route('/api/attractions/<attraction_type>')
def get_attractions_by_type(attraction_type):
    if attraction_type == 'all':
        return jsonify(attractions)
    filtered = [a for a in attractions if a['type'] == attraction_type]
    return jsonify(filtered)

if __name__ == '__main__':
    app.run(debug=True, port=5000) 