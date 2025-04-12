from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from database import SessionLocal
from models import TipoInspeccion

bp_tipos = Blueprint("tipos", __name__, url_prefix="/tipos-inspeccion")

# Dependencia para obtener sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_gen = get_db()
db = next(db_gen)

# Crear tipo de inspección
@bp_tipos.route("/", methods=["POST"])
def crear_tipo():
    data = request.get_json()
    nuevo = TipoInspeccion(nombre=data["nombre"])
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return jsonify({"id": nuevo.id}), 201

# Listar todos los tipos de inspección
@bp_tipos.route("/", methods=["GET"])
def listar_tipos():
    tipos = db.query(TipoInspeccion).all()
    resultado = [
        {
            "id": t.id,
            "nombre": t.nombre
        } for t in tipos
    ]
    return jsonify(resultado)

# Obtener tipo de inspección por ID
@bp_tipos.route("/<int:id>", methods=["GET"])
def obtener_tipo(id):
    tipo = db.query(TipoInspeccion).filter_by(id=id).first()
    if tipo is None:
        return jsonify({"error": "Tipo de inspección no encontrado"}), 404
    return jsonify({
        "id": tipo.id,
        "nombre": tipo.nombre
    })
