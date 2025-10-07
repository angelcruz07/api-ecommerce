# API E-commerce

API básica de e-commerce desarrollada con Express.js que proporciona endpoints para gestionar productos, categorías y carritos de compra.

## 🚀 Características

- Gestión de productos (CRUD completo)
- Gestión de categorías
- Sistema de carrito de compras
- Validación de stock
- Manejo de errores
- CORS habilitado

## 📋 Requisitos Previos

- Node.js (versión 12 o superior)
- npm o yarn

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/angelcruz07/api-ecommerce.git
cd api-ecommerce
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` basado en `.env.example`:
```bash
cp .env.example .env
```

4. Configura las variables de entorno en el archivo `.env`:
```
PORT=3000
```

## 🏃 Ejecución

```bash
npm start
```

El servidor se iniciará en `http://localhost:3000`

## 📚 Documentación de la API

### Ruta Principal

#### GET /
Obtiene información general de la API.

**Respuesta:**
```json
{
  "message": "Bienvenido a la API de Ecommerce",
  "endpoints": {
    "products": "/api/products",
    "categories": "/api/categories",
    "cart": "/api/cart"
  }
}
```

### Productos

#### GET /api/products
Obtiene todos los productos.

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Laptop",
    "description": "Laptop de alto rendimiento",
    "price": 999.99,
    "category": "Electrónica",
    "stock": 10
  }
]
```

#### GET /api/products/:id
Obtiene un producto específico por ID.

**Parámetros:**
- `id` (número): ID del producto

**Respuesta:**
```json
{
  "id": 1,
  "name": "Laptop",
  "description": "Laptop de alto rendimiento",
  "price": 999.99,
  "category": "Electrónica",
  "stock": 10
}
```

#### POST /api/products
Crea un nuevo producto.

**Body:**
```json
{
  "name": "Producto Nuevo",
  "description": "Descripción del producto",
  "price": 99.99,
  "category": "Categoría",
  "stock": 20
}
```

**Respuesta:**
```json
{
  "id": 4,
  "name": "Producto Nuevo",
  "description": "Descripción del producto",
  "price": 99.99,
  "category": "Categoría",
  "stock": 20
}
```

#### PUT /api/products/:id
Actualiza un producto existente.

**Parámetros:**
- `id` (número): ID del producto

**Body:**
```json
{
  "name": "Producto Actualizado",
  "price": 149.99
}
```

#### DELETE /api/products/:id
Elimina un producto.

**Parámetros:**
- `id` (número): ID del producto

**Respuesta:**
```json
{
  "message": "Producto eliminado exitosamente"
}
```

### Categorías

#### GET /api/categories
Obtiene todas las categorías.

**Respuesta:**
```json
[
  {
    "id": 1,
    "name": "Electrónica"
  }
]
```

#### GET /api/categories/:id
Obtiene una categoría específica.

**Parámetros:**
- `id` (número): ID de la categoría

#### POST /api/categories
Crea una nueva categoría.

**Body:**
```json
{
  "name": "Nueva Categoría"
}
```

### Carrito de Compras

#### GET /api/cart/:userId
Obtiene el carrito de un usuario.

**Parámetros:**
- `userId` (número): ID del usuario

**Respuesta:**
```json
{
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "name": "Laptop",
      "price": 999.99,
      "quantity": 2
    }
  ],
  "total": 1999.98
}
```

#### POST /api/cart/:userId/add
Agrega un producto al carrito.

**Parámetros:**
- `userId` (número): ID del usuario

**Body:**
```json
{
  "productId": 1,
  "quantity": 2
}
```

#### DELETE /api/cart/:userId/remove/:productId
Elimina un producto del carrito.

**Parámetros:**
- `userId` (número): ID del usuario
- `productId` (número): ID del producto

#### DELETE /api/cart/:userId
Limpia todo el carrito de un usuario.

**Parámetros:**
- `userId` (número): ID del usuario

## 🛠️ Tecnologías Utilizadas

- **Express.js**: Framework web para Node.js
- **CORS**: Middleware para habilitar CORS
- **dotenv**: Manejo de variables de entorno

## 📝 Notas

- Esta es una API básica que utiliza datos en memoria (no persiste datos en una base de datos)
- Los datos se reinician cada vez que se reinicia el servidor
- Para un entorno de producción, se recomienda implementar una base de datos real

## 📄 Licencia

ISC