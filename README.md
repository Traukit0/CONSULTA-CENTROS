# 📑 Proyecto: Sistema de Consulta y Fiscalización de Centros de Cultivo

Este sistema permite registrar, consultar y gestionar inspecciones realizadas a centros de cultivo por parte de fiscalizadores de una institución pública. 

Incluye:
- Backend en Flask + SQLAlchemy + Alembic
- Base de datos MySQL
- Adminer para exploración visual
- Docker + Docker Compose para despliegue

---

## ⚡ Tecnologías utilizadas

- Python 3.10+
- Flask
- SQLAlchemy
- Alembic
- MySQL 8
- Adminer
- Docker / Docker Compose

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

---

## 📃 Documentación

Consulta el checklist completo para despliegue en:
- [`checklist_despliegue.md`](./checklist_despliegue.md)

---

## 🚀 En desarrollo futuro...
- Creación de endpoints RESTful
- Incorporación de frontend con React
- Autenticación y autorización de usuarios
- Subida de documentos de inspecciones
- Visualización de reportes e históricos

---

## ✉ Contacto
Autor: @Traukit0  
Licencia: MIT (o la que definas más adelante)
