from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Centro

bp = Blueprint("routes", __name__)

# Dependencia para obtener sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Crear nuevo centro
db_gen = get_db()
db = next(db_gen)

@bp.route("/centros", methods=["POST"])
def crear_centro():
    data = request.get_json()
    nuevo = Centro(
        codigo_centro=data["codigo_centro"],
        titular=data["titular"],
        rut=data["rut"],
        acs=data.get("acs"),
        ubicacion=data.get("ubicacion")
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return jsonify({"id": nuevo.id}), 201

# Obtener todos los centros
@bp.route("/centros", methods=["GET"])
def listar_centros():
    centros = db.query(Centro).all()
    resultado = [
        {
            "id": c.id,
            "codigo_centro": c.codigo_centro,
            "titular": c.titular,
            "rut": c.rut,
            "acs": c.acs,
            "ubicacion": c.ubicacion
        } for c in centros
    ]
    return jsonify(resultado)

# Obtener un centro por código
@bp.route("/centros/<int:codigo>", methods=["GET"])
def obtener_centro_por_codigo(codigo):
    centro = db.query(Centro).filter_by(codigo_centro=codigo).first()
    if centro is None:
        return jsonify({"error": "Centro no encontrado"}), 404
    return jsonify({
        "id": centro.id,
        "codigo_centro": centro.codigo_centro,
        "titular": centro.titular,
        "rut": centro.rut,
        "acs": centro.acs,
        "ubicacion": centro.ubicacion
    })
