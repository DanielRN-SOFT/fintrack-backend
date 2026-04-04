# 🚀 FinTrack Backend API

![Node.js](https://img.shields.io/badge/Node.js-18+-green)
![Express](https://img.shields.io/badge/Express.js-Framework-black)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![License](https://img.shields.io/badge/License-MIT-lightgrey)

API REST para **FinTrack**, un sistema de gestión de finanzas personales que permite a los usuarios controlar ingresos, egresos y visualizar su información financiera.

---

## 📌 Descripción

FinTrack Backend es una API desarrollada con **Node.js + Express**, basada en una arquitectura por capas:

- Models
- Controllers
- Routes
- Middlewares
- Helpers

---

## 🧱 Arquitectura del proyecto
src/
│
├── models/ # Acceso a base de datos
├── controllers/ # Lógica de negocio
├── routes/ # Definición de endpoints
├── middlewares/ # Autenticación, validaciones
├── helpers/ # Funciones auxiliares
├── config/ # Configuración (DB, JWT)
└── app.js # Inicialización del servidor

---

## 🔄 Flujo de una petición
Cliente → Routes → Middlewares → Controllers → Models → Base de Datos


---

## ⚙️ Tecnologías utilizadas

- Node.js
- Express.js
- MySQL / PostgreSQL
- JWT (Autenticación)
- bcrypt (Encriptación)
- dotenv

---

## 🔐 Autenticación

Se utiliza JWT para proteger rutas.

### Ejemplo de header:

```http
Authorization: Bearer tu_token_aqui
```
## 📡 Endpoints

### 👤 Auth

| Método | Endpoint              |
|--------|----------------------|
| POST   | /api/auth/register   |
| POST   | /api/auth/login      |

---

### 💳 Cuentas

| Método | Endpoint              |
|--------|----------------------|
| GET    | /api/cuentas         |
| POST   | /api/cuentas         |
| PUT    | /api/cuentas/:id     |
| DELETE | /api/cuentas/:id     |

---

### 🗂️ Categorías

| Método | Endpoint                  |
|--------|---------------------------|
| GET    | /api/categorias           |
| POST   | /api/categorias           |
| PUT    | /api/categorias/:id       |
| DELETE | /api/categorias/:id       |

---

### 🧩 Conceptos

| Método | Endpoint                 |
|--------|--------------------------|
| GET    | /api/conceptos           |
| POST   | /api/conceptos           |
| PUT    | /api/conceptos/:id       |
| DELETE | /api/conceptos/:id       |

---

### 💸 Transacciones

| Método | Endpoint                     |
|--------|------------------------------|
| GET    | /api/transacciones           |
| POST   | /api/transacciones           |
| PUT    | /api/transacciones/:id       |
| DELETE | /api/transacciones/:id       |
🛠️ Instalación
1. Clonar repositorio
```bash
git clone https://github.com/tu-usuario/fintrack-backend.git
cd fintrack-backend
```
2. Instalar dependencias
```bash
npm install
```
3. Variables de entorno

Crear archivo .env:
```bash
PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=fintrack

JWT_SECRET=supersecretkey
```
4. Ejecutar servidor
```bash
npm run dev
```
o
```bash
npm start
```
🧪 Ejemplo de código
📌 Ruta
```javascript
import express from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
📌 Controlador
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as User from "../models/user.model.js";

export const register = async (req, res) => {
  const { nombre, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    nombre,
    email,
    password: hashedPassword
  });

  res.json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findByEmail(email);

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Credenciales inválidas" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

  res.json({ token });
};
```
📌 Modelo
```javascript
import db from "../config/db.js";

export const create = async (user) => {
  const [result] = await db.query(
    "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
    [user.nombre, user.email, user.password]
  );

  return { id: result.insertId, ...user };
};

export const findByEmail = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );

  return rows[0];
};
```
📌 Middleware
```javascript
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const header = req.headers["authorization"];

  if (!header) {
    return res.status(403).json({ message: "Token requerido" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};
```
## 🗄️ Modelo de datos

### Relaciones

- Un **Usuario** puede tener múltiples **Cuentas**
- Una **Categoría** puede tener múltiples **Conceptos**
- Un **Concepto** pertenece a una sola **Categoría**
- Una **Transacción** pertenece a:
  - Un **Usuario**
  - Una **Cuenta**
  - Un **Concepto**
  - 
 ## 🚧 Mejoras futuras

- 📄 Documentación con Swagger
- 🧪 Implementación de tests (unitarios e integración)
- 🐳 Contenerización con Docker
- ⚡ Cache con Redis
- 🧠 Implementación de Service Layer
## 👨‍💻 Autor

**Daniel Felipe Ramírez Navarro**

- 💼 Desarrollador Backend
- 🎓 Tecnólogo en ADSO
- 📧 daniel20ramirez06@gmail.com
