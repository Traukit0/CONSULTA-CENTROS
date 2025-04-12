from flask import Flask
from controllers.centros import bp as bp_centros
from controllers.funcionarios import bp_funcionarios
from controllers.responsables import bp_responsables
from controllers.inspecciones import bp_inspecciones
from controllers.tipo_inspeccion import bp_tipos

app = Flask(__name__)
app.register_blueprint(bp_centros)
app.register_blueprint(bp_funcionarios)
app.register_blueprint(bp_responsables)
app.register_blueprint(bp_inspecciones)
app.register_blueprint(bp_tipos)

@app.route('/')
def index():
    return "API de Sernapesca en funcionamiento 🚀"