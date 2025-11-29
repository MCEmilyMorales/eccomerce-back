# 🛒 Backend de Ecommerce con NestJS

Este proyecto es un backend desarrollado con **NestJS**, utilizando **PostgreSQL** como base de datos y **TypeORM** como ORM. Está preparado para comunicación segura con un frontend mediante CORS, documentado con Swagger y organizado con una arquitectura modular clara.

---

---

## 🚀 Tecnologías principales

- **NestJS** — Framework modular para Node.js
- **PostgreSQL** — Base de datos relacional
- **TypeORM** — ORM para manejar entidades, repositorios y migraciones
- **Swagger** — Documentación interactiva de la API
- **CORS** — Gestión de comunicación entre frontend y backend
- **Cookies** — Manejo de autenticación basada en tokens

---

---

## 📁 Estructura del proyecto

El backend se encuentra en el directorio **`back/`**.

### Archivos raíz

```
back/
 ├── .env
 ├── .eslintrc.js
 ├── .gitignore
 ├── .prettierrc
 ├── nest-cli.json
 ├── package.json
 ├── readme.md
 └── tsconfig.json
```

### Directorio principal `src/`

```
src/
 ├── main.ts
 ├── app.module.ts
 ├── auth/
 ├── categories/
 ├── config/
 ├── decorators/
 ├── file-upload/
 ├── guards/
 ├── interceptors/
 ├── middleware/
 ├── migrations/
 ├── orderDetails/
 ├── orders/
 ├── products/
 ├── types/
 ├── users/
 └── utils/
```

## Cada módulo contiene su **controller**, **service**, **dto**, y **entity** para mantener una arquitectura limpia y escalable.

### Claves del archivo .env

```
NODE_ENV=# entorno en el que corre la app. ej:local
FRONTEND_ORIGIN=# puerto front
PORT=# puerto en el que corre el back

DATA_BASE=# POSTGRESQL
HOST=# POSTGRESQL
DB_PORT=# POSTGRESQL
PASSWORD=# POSTGRESQL
USER=# POSTGRESQL

CLOUDINARY_CLOUD_NAME=# cloudinary
CLOUDINARY_API_KEY=# cloudinary
CLOUDINARY_API_SECRET=# cloudinary

JWT_SECRET=# firma de json

```

## 🧩 Diagrama de arquitectura

## ![Arquitectura del Backend](../back/src/utils/DERdb.png)

## ⚙️ main.ts — Configuración principal

En este archivo se inicializa la aplicación Nest y se definen las configuraciones principales.

### 🔹 Puerto

La API corre por defecto en:

```
http://localhost:4000
```

### 🔹 CORS como gestor de comunicación

Se habilita CORS para permitir la comunicación con el cliente:

```ts
app.enableCors({
  origin: 'http://localhost:4000',
  credentials: true,
});
```

### 🔹 Parseo de cookies

Se usa `cookie-parser` para poder leer cookies enviadas desde el cliente:

```ts
app.use(cookieParser());
```

### 🔹 Transformación automática de JSON

Se usa PipeTransform que transforma los strings enviados por el cliente a JSON antes de llegar al controlador.

```ts
app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
```

---

---

## 📚 Swagger — Documentación interactiva

Swagger está integrado y disponible en:

```
http://localhost:4000/api
```

Provee documentación automática de todos los endpoints.

---

---

## 🗄️ Base de datos — PostgreSQL + TypeORM

Este backend utiliza **TypeORM** para gestionar:

- Conexión a PostgreSQL
- Entidades
- Repositorios
- Migraciones

La configuración está en el módulo `config/`.

Ejemplo de conexión:

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  autoLoadEntities: true,
  synchronize: false,
});
```

Las migraciones viven en:

```
src/migrations/
```

---

---

## 🛠️ Arquitectura modular

Cada módulo del sistema representa un recurso del ecommerce:

- **auth/** — Registro, login, autenticación por JWT y cookies
- **users/** — Gestión de usuarios
- **products/** — CRUD de productos
- **categories/** — Categorías de productos
- **orders/** — Órdenes
- **orderDetails/** — Productos de una orden
- **file-upload/** — Subida de archivos/imágenes

Además:

- **guards/** — Autorización y protección de rutas
- **interceptors/** — Transformación de respuestas y requests
- **middleware/** — Lógica previa al controlador
- **utils/** — Helpers y funciones útiles

---

---

## 📦 Scripts principales

En `package.json`:

```json
{
  "start:dev": "nest start --watch",
  "start:prod": "node dist/main.js",
  "build": "nest build",
  "migration:run": "typeorm migration:run"
}
```

---

---

## 🧪 Estado actual

Backend en funcionamiento como API REST completa para un ecommerce, con módulos bien definidos, documentación, autenticación con cookies y comunicación segura con frontend.

---

---

## 📌 Autor

Proyecto desarrollado por _Emily Morales_.
