🚀 FinTrack Backend API

API REST para el sistema FinTrack, una aplicación de gestión de finanzas personales que permite administrar ingresos, egresos, cuentas, categorías, conceptos y reportes financieros.

📌 Descripción

FinTrack Backend es un servicio desarrollado con Node.js + Express, diseñado bajo una arquitectura por capas, que proporciona endpoints seguros para la gestión de información financiera de los usuarios.

Permite:

Autenticación de usuarios con JWT
Gestión de cuentas financieras
Administración de categorías y conceptos
Registro de transacciones
Generación de reportes financieros
🧱 Arquitectura

El proyecto sigue una arquitectura por capas sencilla y escalable:

src/
│
├── models/         # Acceso a base de datos (queries, ORM)
├── controllers/    # Lógica de negocio
├── routes/         # Definición de endpoints
├── middlewares/    # Autenticación, validaciones, manejo de errores
├── helpers/        # Funciones auxiliares
├── config/         # Configuración (DB, JWT, etc.)
└── app.js          # Inicialización de Express
🔄 Flujo de una petición
Cliente → Routes → Middlewares → Controllers → Models → Base de Datos
⚙️ Tecnologías utilizadas
Node.js
Express.js
MySQL / PostgreSQL
JWT (Autenticación)
bcrypt (Encriptación de contraseñas)
dotenv (Variables de entorno)
🔐 Autenticación

El sistema utiliza JWT (JSON Web Token) para proteger rutas privadas.

Flujo:
Usuario inicia sesión
El servidor genera un token JWT
El cliente envía el token en cada request:
Authorization: Bearer <token>
📡 Endpoints principales
👤 Autenticación
Método	Endpoint	Descripción
POST	/api/auth/register	Registrar usuario
POST	/api/auth/login	Iniciar sesión
💳 Cuentas
Método	Endpoint	Descripción
GET	/api/cuentas	Listar cuentas
POST	/api/cuentas	Crear cuenta
PUT	/api/cuentas/:id	Actualizar cuenta
DELETE	/api/cuentas/:id	Eliminar cuenta
🗂️ Categorías
Método	Endpoint	Descripción
GET	/api/categorias	
POST	/api/categorias	
PUT	/api/categorias/:id	
DELETE	/api/categorias/:id	
🧩 Conceptos
Método	Endpoint	Descripción
GET	/api/conceptos	
POST	/api/conceptos	
PUT	/api/conceptos/:id	
DELETE	/api/conceptos/:id	
💸 Transacciones
Método	Endpoint	Descripción
GET	/api/transacciones	
POST	/api/transacciones	
PUT	/api/transacciones/:id	
DELETE	/api/transacciones/:id	
📊 Reportes
Método	Endpoint	Descripción
GET	/api/reportes/mensual	
GET	/api/reportes/anual	
🛠️ Instalación
1. Clonar repositorio
git clone https://github.com/tu-usuario/fintrack-backend.git
cd fintrack-backend
2. Instalar dependencias
npm install
3. Configurar variables de entorno

Crear archivo .env:

PORT=3000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=fintrack

JWT_SECRET=supersecretkey
4. Ejecutar el proyecto
npm run dev

o

npm start
🗄️ Base de datos

El proyecto utiliza una base de datos relacional con entidades principales:

usuarios
cuentas
categorias
conceptos
transacciones
roles
Relaciones clave:
Un usuario tiene muchas cuentas
Una categoría tiene muchos conceptos
Un concepto pertenece a una categoría
Una transacción pertenece a:
usuario
cuenta
concepto
🧪 Buenas prácticas implementadas
Separación de responsabilidades (MVC simplificado)
Uso de middlewares para:
Autenticación
Validación
Manejo de errores
Encriptación de contraseñas
Uso de variables de entorno
Soft delete en transacciones
🚧 Futuras mejoras
Implementación de servicios (Service Layer)
Documentación con Swagger
Tests unitarios (Jest)
Rate limiting
Cache (Redis)
Despliegue en la nube (AWS / Docker)
👨‍💻 Autor

Daniel Felipe Ramírez Navarro
Tecnólogo en Análisis y Desarrollo de Software

📄 Licencia

Este proyecto está bajo la licencia MIT.
