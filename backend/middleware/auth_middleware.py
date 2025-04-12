from flask import request, jsonify, g
from functools import wraps
import jwt
import os

SECRET_KEY = os.environ.get("SECRET_KEY", "clave_secreta_predeterminada")

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        auth_header = request.headers.get('Authorization')
        
        if auth_header and auth_header.startswith('Bearer '):
            token = auth_header[7:]  # Quitar 'Bearer ' del token
            
        if not token:
            return jsonify({"error": "Token requerido"}), 401
            
        try:
            # Verificar token
            payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            g.user = payload['user']  # Guardar información del usuario
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401
            
        return f(*args, **kwargs)
    
    return decorated 