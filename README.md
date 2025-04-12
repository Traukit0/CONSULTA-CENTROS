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

### Entorno de desarrollo

Para desarrollo, es recomendable ejecutar el frontend directamente en la máquina local y el backend en Docker:

1. Clonar el proyecto y entrar a la carpeta:
   ```bash
   git clone <repo-url>
   cd INTERFAZ GRAFICA CONSULTA CENTROS
   ```

2. Iniciar el backend y base de datos con Docker:
   ```bash
   docker compose up -d db backend adminer
   ```

3. Ejecutar las migraciones Alembic:
   ```bash
   docker compose exec backend bash
   alembic upgrade head
   ```

4. Iniciar el frontend en desarrollo:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Acceder a las distintas interfaces:
   - Adminer: [http://localhost:8080](http://localhost:8080)
   - API/backend: [http://localhost:8000](http://localhost:8000)
   - Frontend (desarrollo): [http://localhost:5173](http://localhost:5173)

### Entorno de producción

Para producción, se recomienda usar Docker Compose para todos los servicios:

1. Construir y levantar todos los contenedores:
   ```bash
   docker compose build
   docker compose up -d
   ```

2. Acceder a las distintas interfaces:
   - Adminer: [http://localhost:8080](http://localhost:8080)
   - API/backend: [http://localhost:8000](http://localhost:8000)
   - Frontend (producción): [http://localhost:3000](http://localhost:3000)

### 🔄 Flujo de trabajo diario

Este es el flujo de trabajo recomendado para el desarrollo día a día:

#### Iniciar sesión de desarrollo
1. Inicia Docker Desktop en tu máquina Windows
2. Desde la terminal, en la raíz del proyecto, levanta los servicios de backend:
   ```bash
   docker compose up -d db backend adminer
   ```
3. En una terminal separada, inicia el servidor de desarrollo del frontend:
   ```bash
   cd frontend
   npm run dev
   ```
4. Trabaja con el frontend accediendo a [http://localhost:5173](http://localhost:5173)
5. Todos los cambios que realices se reflejarán automáticamente gracias al hot-reloading

#### Probar versión de producción
Cuando quieras verificar cómo se verá tu trabajo en producción:

1. Construye la versión de producción del frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Reconstruye y reinicia el contenedor de frontend:
   ```bash
   # Desde la raíz del proyecto
   docker compose build frontend
   docker compose up -d frontend
   ```
3. Visualiza la versión de producción en [http://localhost:3000](http://localhost:3000)

#### Terminar sesión de desarrollo
Al finalizar tu sesión de trabajo:

1. Detén el servidor de desarrollo de Vite con `Ctrl+C`
2. Si lo deseas, puedes detener los contenedores:
   ```bash
   docker compose down
   ```

---

## 🖥 Frontend en React + Vite

Este proyecto utiliza **React** como framework de interfaz y **Vite** como herramienta de desarrollo y empaquetado.

### Flujo de trabajo recomendado

#### Desarrollo
- Ejecuta el frontend con `npm run dev` directamente en tu máquina local
- Vite usa el puerto 5173 por defecto para servir la aplicación
- Beneficios: Hot-reloading más rápido y mejor experiencia de debugging

#### Producción
- Construye el frontend con `npm run build`
- La aplicación se sirve a través de Nginx en el puerto 3000 (configurable)
- El contenedor Docker incluye la configuración necesaria para el despliegue

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
