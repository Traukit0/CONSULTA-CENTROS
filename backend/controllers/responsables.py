from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from database import SessionLocal
from models import ResponsableCentro

bp_responsables = Blueprint("responsables", __name__, url_prefix="/responsables")

# Dependencia para obtener sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_gen = get_db()
db = next(db_gen)

# Crear responsable de centro
@bp_responsables.route("/", methods=["POST"])
def crear_responsable():
    data = request.get_json()
    nuevo = ResponsableCentro(
        nombre=data["nombre"],
        rut=data["rut"],
        cargo=data.get("cargo"),
        telefono=data.get("telefono"),
        email=data.get("email")
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return jsonify({"id": nuevo.id}), 201

# Listar todos los responsables
@bp_responsables.route("/", methods=["GET"])
def listar_responsables():
    responsables = db.query(ResponsableCentro).all()
    resultado = [
        {
            "id": r.id,
            "nombre": r.nombre,
            "rut": r.rut,
            "cargo": r.cargo,
            "telefono": r.telefono,
            "email": r.email
        } for r in responsables
    ]
    return jsonify(resultado)

# Buscar responsable por ID
@bp_responsables.route("/<int:id>", methods=["GET"])
def obtener_responsable(id):
    responsable = db.query(ResponsableCentro).filter_by(id=id).first()
    if responsable is None:
        return jsonify({"error": "Responsable no encontrado"}), 404
    return jsonify({
        "id": responsable.id,
        "nombre": responsable.nombre,
        "rut": responsable.rut,
        "cargo": responsable.cargo,
        "telefono": responsable.telefono,
        "email": responsable.email
    })
