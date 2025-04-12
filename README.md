# 📑 Proyecto: Sistema de Consulta y Fiscalización de Centros de Cultivo

Este sistema permite registrar, consultar y gestionar inspecciones realizadas a centros de cultivo por parte de fiscalizadores de una institución pública.

Incluye:
- Backend en Flask + SQLAlchemy + Alembic + CORS
- Base de datos MySQL
- Adminer para exploración visual
- Frontend en React + Vite
- Docker + Docker Compose para despliegue

---

## ⚡ Tecnologías utilizadas

- Python 3.10+
- Flask
- Flask-CORS
- SQLAlchemy
- Alembic
- MySQL 8
- Adminer
- Docker / Docker Compose
- React
- Vite
- Nginx (para servir frontend en producción)

---

## ♻ Estructura del proyecto

```
INTERFAZ GRAFICA CONSULTA CENTROS/
├── backend/
│   ├── models/
│   ├── alembic/
│   ├── database.py
│   ├── app.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── vite.config.js
├── docker-compose.yml
├── .env
└── README.md
```

---

## 🔄 Instalación y uso

1. Clona el proyecto y entra a la carpeta:
   ```bash
   git clone <repo-url>
   cd INTERFAZ GRAFICA CONSULTA CENTROS
   ```

2. Asegúrate de tener un archivo `.env` con:
   ```env
   DB_HOST=db
   DB_USER=user
   DB_PASS=secret
   DB_NAME=sernapesca
   ```

3. Construye y levanta los contenedores:
   ```bash
   docker compose build
   docker compose up -d
   ```

4. Aplica las migraciones Alembic:
   ```bash
   docker compose exec backend bash
   alembic upgrade head
   ```

5. Visita:
   - Adminer: [http://localhost:8080](http://localhost:8080)
   - API/backend: [http://localhost:8000](http://localhost:8000)
   - Frontend React: [http://localhost:3000](http://localhost:3000) o [http://localhost:5173](http://localhost:5173) en desarrollo

---

## 🖥 Frontend en React + Vite

Este proyecto utiliza **React** como framework de interfaz y **Vite** como herramienta de desarrollo y empaquetado.

- Desarrollo local: `npm run dev`
- Despliegue en producción: `npm run build`
- Servido mediante Nginx en el contenedor `frontend`

```
frontend/
├── public/
├── src/
│   ├── components/
│   └── App.jsx
├── Dockerfile
└── vite.config.js
```

---

## 🔌 Comunicación API-Frontend

El backend utiliza Flask-CORS para permitir la comunicación desde el frontend. Esta configuración está implementada en `app.py`:

```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Habilitar CORS para toda la aplicación
```

Esto permite que el frontend (en localhost:5173 o localhost:3000) pueda hacer peticiones a la API (localhost:8000) sin problemas de CORS.

---

## 📃 Documentación

Consulta el checklist completo para despliegue en:
- [`checklist_despliegue.md`](./checklist_despliegue.md)

---

## 🚀 En desarrollo futuro...
- Creación de endpoints RESTful
- Autenticación y autorización de usuarios
- Subida de documentos de inspecciones
- Visualización de reportes e históricos

---

## ✉ Contacto
Autor: @Traukit0  
Licencia: MIT (o la que definas más adelante)
