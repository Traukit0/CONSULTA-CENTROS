from logging.config import fileConfig
from sqlalchemy import create_engine, pool
from alembic import context

import os
import sys

from dotenv import load_dotenv

# Ruta al archivo .env en la raíz del proyecto
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)


# Añadir el path del proyecto para importar tus módulos
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Cargar Base y modelos
from database import Base
from models import centro, funcionario, responsable, tipo_inspeccion, inspeccion

# Alembic config object
config = context.config

# Logging
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# Base de metadatos para autogenerar migraciones
target_metadata = Base.metadata

# Construir la URL desde variables de entorno
DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://{DB_USER}:{DB_PASS}@{DB_HOST}/{DB_NAME}"


def run_migrations_offline():
    """Ejecutar migraciones en modo offline (genera SQL sin ejecutarlo)."""
    context.configure(
        url=SQLALCHEMY_DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Ejecutar migraciones en modo online (aplica cambios a la DB)."""
    connectable = create_engine(SQLALCHEMY_DATABASE_URL, poolclass=pool.NullPool)

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True  # detecta cambios en tipos de columnas
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
