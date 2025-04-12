from flask import Blueprint, request, jsonify
import jwt
import datetime
import os

bp_auth = Blueprint("auth", __name__, url_prefix="/auth")

# Credenciales fijas
VALID_USERNAME = "acuiculturacastro"
VALID_PASSWORD = "ACUIcul34"
# Obtener una clave secreta del entorno o usar un valor predeterminado
SECRET_KEY = os.environ.get("SECRET_KEY", "clave_secreta_predeterminada")

@bp_auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    
    if not data:
        return jsonify({"error": "Datos requeridos"}), 400
        
    username = data.get("username")
    password = data.get("password")
    
    # Verificar credenciales
    if username == VALID_USERNAME and password == VALID_PASSWORD:
        # Generar token JWT con expiración de 12 horas
        token = jwt.encode({
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=12),
            'user': username,
            'iat': datetime.datetime.utcnow()
        }, SECRET_KEY, algorithm='HS256')
        
        return jsonify({
            "success": True,
            "token": token,
            "message": "Autenticación exitosa"
        })
    
    return jsonify({
        "success": False,
        "error": "Credenciales inválidas"
    }), 401 