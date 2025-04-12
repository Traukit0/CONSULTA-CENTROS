from flask import Blueprint, request, jsonify
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Funcionario

bp_funcionarios = Blueprint("funcionarios", __name__, url_prefix="/funcionarios")

# Dependencia para obtener sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_gen = get_db()
db = next(db_gen)

# Crear un funcionario
@bp_funcionarios.route("/", methods=["POST"])
def crear_funcionario():
    data = request.get_json()
    nuevo = Funcionario(
        nombre=data["nombre"],
        rut=data["rut"]
    )
    db.add(nuevo)
    db.commit()
    db.refresh(nuevo)
    return jsonify({"id": nuevo.id}), 201

# Listar todos los funcionarios
@bp_funcionarios.route("/", methods=["GET"])
def listar_funcionarios():
    funcionarios = db.query(Funcionario).all()
    resultado = [
        {
            "id": f.id,
            "nombre": f.nombre,
            "rut": f.rut
        } for f in funcionarios
    ]
    return jsonify(resultado)

# Buscar funcionario por ID
@bp_funcionarios.route("/<int:id>", methods=["GET"])
def obtener_funcionario(id):
    funcionario = db.query(Funcionario).filter_by(id=id).first()
    if funcionario is None:
        return jsonify({"error": "Funcionario no encontrado"}), 404
    return jsonify({
        "id": funcionario.id,
        "nombre": funcionario.nombre,
        "rut": funcionario.rut
    })
