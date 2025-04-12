from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Inspeccion, Centro, ResponsableCentro, Funcionario, TipoInspeccion
from datetime import datetime

bp_inspecciones = Blueprint("inspecciones", __name__, url_prefix="/inspecciones")

# Dependencia para obtener sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_gen = get_db()
db = next(db_gen)

# Crear una inspección
@bp_inspecciones.route("/", methods=["POST"])
def crear_inspeccion():
    data = request.get_json()

    try:
        nueva = Inspeccion(
            fecha=datetime.strptime(data["fecha"], "%Y-%m-%d"),
            centro_id=data["centro_id"],
            responsable_id=data["responsable_id"],
            tipo_id=data["tipo_id"],
            fiscalizador_1_id=data.get("fiscalizador_1_id"),
            fiscalizador_2_id=data.get("fiscalizador_2_id"),
            observaciones=data.get("observaciones")
        )
        db.add(nueva)
        db.commit()
        db.refresh(nueva)
        return jsonify({"id": nueva.id}), 201
    except Exception as e:
        db.rollback()
        return jsonify({"error": str(e)}), 400

# Listar todas las inspecciones
@bp_inspecciones.route("/", methods=["GET"])
def listar_inspecciones():
    inspecciones = db.query(Inspeccion).all()
    resultado = [
        {
            "id": i.id,
            "fecha": i.fecha.strftime("%Y-%m-%d"),
            "centro_id": i.centro_id,
            "responsable_id": i.responsable_id,
            "tipo_id": i.tipo_id,
            "fiscalizador_1_id": i.fiscalizador_1_id,
            "fiscalizador_2_id": i.fiscalizador_2_id,
            "observaciones": i.observaciones
        } for i in inspecciones
    ]
    return jsonify(resultado)

# Obtener inspección por ID
@bp_inspecciones.route("/<int:id>", methods=["GET"])
def obtener_inspeccion(id):
    inspeccion = db.query(Inspeccion).filter_by(id=id).first()
    if inspeccion is None:
        return jsonify({"error": "Inspección no encontrada"}), 404
    return jsonify({
        "id": inspeccion.id,
        "fecha": inspeccion.fecha.strftime("%Y-%m-%d"),
        "centro_id": inspeccion.centro_id,
        "responsable_id": inspeccion.responsable_id,
        "tipo_id": inspeccion.tipo_id,
        "fiscalizador_1_id": inspeccion.fiscalizador_1_id,
        "fiscalizador_2_id": inspeccion.fiscalizador_2_id,
        "observaciones": inspeccion.observaciones
    })