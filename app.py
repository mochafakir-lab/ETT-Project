from flask import Flask, request, jsonify
from flask_cors import CORS
from query_data import query_rag

app = Flask(__name__, static_folder='static', static_url_path='/')
CORS(app)

@app.route('/')
def serve_index():
    return app.send_static_file('index.html')

@app.route('/api/query', methods=['POST'])
def query_model():
    data = request.json
    if not data or 'query' not in data:
        return jsonify({"error": "No query provided"}), 400
        
    query_text = data['query']
    
    try:
        result = query_rag(query_text)
        return jsonify({
            "response": result["response"],
            "sources": result["sources"]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
