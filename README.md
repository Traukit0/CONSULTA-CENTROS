# Sernapesca - Sistema de Gestión de Inspecciones

Este proyecto es una aplicación web desarrollada para gestionar inspecciones en centros de cultivo, permitiendo el registro, consulta y archivo de información relevante como fiscalizadores, bitácoras, y centros. La idea principal es mantener un registro centralizado de las inspecciones realizadas por el departamento de Acuicultura oficina Castro, a fin de poder efectuar consultas rápidas acerca de las inspecciones realizadas.

---

## 🚀 Tecnologías utilizadas

- **Backend:** Python + Flask + SQLAlchemy
- **Base de datos:** MySQL 8 (contenedor Docker)
- **Contenerización:** Docker + Docker Compose
- **ORM y conexión:** SQLAlchemy
- **Frontend:** (Pendiente) React, Vue o plantilla HTML

---

## 📂 Estructura del proyecto

```
sernapesca-inspecciones/
├── backend/               # Código del backend Flask
│   ├── models/            # Modelos de base de datos (SQLAlchemy)
│   ├── controllers/       # Lógica del negocio
│   ├── routes/            # Endpoints API REST
│   ├── app.py             # Punto de entrada Flask
│   ├── Dockerfile         # Imagen del backend
│   └── requirements.txt   # Dependencias Python
├── frontend/              # (opcional) Interfaz de usuario
├── nginx/                 # Configuración proxy reverso (opcional)
├── uploads/               # Carpeta compartida para documentos
├── docker-compose.yml     # Orquestación de servicios Docker
├── .env                   # Variables de entorno (no versionar)
└── README.md              # Este archivo
```

---

## ⚙️ Requisitos

- Docker
- Docker Compose

---

## 📦 Instalación y ejecución

1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/sernapesca-inspecciones.git
cd sernapesca-inspecciones
```

2. Crear archivo `.env`

Ejemplo:
```env
DB_HOST=db
DB_USER=user
DB_PASS=secret
DB_NAME=sernapesca
FLASK_ENV=development
```

3. Levantar contenedores
```bash
docker-compose up --build
```

4. Acceder a la API:
- [http://localhost:8000](http://localhost:8000)

---

## 🧪 Endpoints disponibles (iniciales)

- `GET /` → Verifica estado del backend
- `GET /centros` → Lista todos los centros registrados
- `POST /centros` → Crea un nuevo centro

---

## 🗂️ Notas

- Asegúrate de no borrar los volúmenes al hacer `docker-compose down` para mantener tus datos.
- Los archivos de respaldo/documentos pueden ser almacenados en `/uploads/` o en una ruta externa (por ejemplo OneDrive, vinculada con symlink).

---

## 📌 Pendiente

- Migraciones controladas (Alembic)
- Implementación de Inspecciones y Fiscalizadores
- Sistema de subida de archivos
- Frontend visual o conexión a sistema externo

---

## 👨‍💻 Autor

Proyecto desarrollado por Manuel E. Cano Nesbet.
