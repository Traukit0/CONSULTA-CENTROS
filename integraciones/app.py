from flask import Flask, request, jsonify
from flask_cors import CORS
import jwt
import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
# Configure CORS to allow requests from your React app
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])  # Default Vite dev server port

# This should be a secure random key in production
app.config['SECRET_KEY'] = 'your-secret-key'

# Mock user database - in production, use a real database
users_db = {
    "user1": {
        "username": "user1",
        "password": generate_password_hash("password123")
    }
}

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')
    
    if not username or not password:
        return jsonify({"message": "Missing username or password"}), 400
    
    user = users_db.get(username)
    
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid credentials"}), 401
    
    # Generate JWT token
    token = jwt.encode({
        'sub': username,
        'iat': datetime.datetime.utcnow(),
        'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)
    }, app.config['SECRET_KEY'])
    
    return jsonify({
        "message": "Login successful",
        "token": token,
        "username": username
    })

@app.route('/api/protected', methods=['GET'])
def protected():
    token = request.headers.get('Authorization')
    
    if not token or not token.startswith('Bearer '):
        return jsonify({"message": "Missing or invalid token"}), 401
    
    try:
        # Verify the token
        token = token.split(' ')[1]
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        username = payload['sub']
        
        # Return protected data
        return jsonify({
            "message": "Authentication successful",
            "data": f"Protected data for {username}"
        })
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token expired"}), 401
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 401

if __name__ == '__main__':
    app.run(debug=True)
