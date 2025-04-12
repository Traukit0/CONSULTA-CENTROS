# ✅ Checklist de Despliegue para Producción

Este checklist resume los pasos recomendados para desplegar este sistema en un entorno de producción de forma segura y ordenada.

---

## 📒 1. Pre-requisitos en el servidor
- [ ] Docker y Docker Compose instalados
- [ ] Python 3.10+ instalado (solo si corres Alembic fuera de contenedor)
- [ ] Acceso al repositorio del proyecto (Git o copia directa)
- [ ] Archivo `.env` con variables correctas:
  ```env
  DB_HOST=db
  DB_USER=user
  DB_PASS=secret
  DB_NAME=sernapesca
  ```

---

## 💾 2. Copiar el proyecto al servidor
- [ ] Crear carpeta destino (por ejemplo: `/srv/app/consulta-centros`)
- [ ] Subir el código del proyecto completo (backend, docker-compose.yml, etc.)
- [ ] Verificar que esté el archivo `.env` en la ubicación correcta

---

## ⚙️ 3. Construcción de contenedores
- [ ] Ejecutar:
  ```bash
  docker compose build
  docker compose up -d
  ```

---

## 📁 4. Inicializar base de datos (Alembic)
- [ ] Ingresar al contenedor backend:
  ```bash
  docker compose exec backend bash
  ```
- [ ] Aplicar las migraciones:
  ```bash
  alembic upgrade head
  ```
- [ ] Verificar en Adminer (http://localhost:8080) que las tablas se hayan creado correctamente

---

## 🚀 5. Validación de la aplicación
- [ ] Verificar que Flask se esté ejecutando correctamente (http://localhost:8000)
- [ ] Consultar logs si es necesario:
  ```bash
  docker compose logs -f backend
  ```
- [ ] Probar creación o lectura de datos si ya hay endpoints activos

---

## 📌 6. Buenas prácticas adicionales
- [ ] Versionar el repositorio con Git
- [ ] Incluir `alembic/versions/` en el repo (excepto archivos autogenerados temporales)
- [ ] NO subir el archivo `.env` a Git (agregar a `.gitignore`)
- [ ] Hacer backup regular de la base (`/var/lib/mysql`)
- [ ] Crear script de despliegue automatizado si se desea

---

Este checklist puede ampliarse con pasos específicos según evolucione el sistema (por ejemplo: autenticación, HTTPS, backups automáticos, etc.).
