const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Datos de ejemplo (simulando una base de datos)
let products = [
  {
    id: 1,
    name: 'Laptop',
    description: 'Laptop de alto rendimiento',
    price: 999.99,
    category: 'Electrónica',
    stock: 10
  },
  {
    id: 2,
    name: 'Mouse',
    description: 'Mouse inalámbrico',
    price: 29.99,
    category: 'Electrónica',
    stock: 50
  },
  {
    id: 3,
    name: 'Teclado',
    description: 'Teclado mecánico',
    price: 79.99,
    category: 'Electrónica',
    stock: 30
  }
];

let categories = [
  { id: 1, name: 'Electrónica' },
  { id: 2, name: 'Ropa' },
  { id: 3, name: 'Hogar' }
];

let carts = [];

// Rutas básicas
app.get('/', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de Ecommerce',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      cart: '/api/cart'
    }
  });
});

// Endpoints de Productos
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }
  res.json(product);
});

app.post('/api/products', (req, res) => {
  const { name, description, price, category, stock } = req.body;
  
  if (!name || !price) {
    return res.status(400).json({ error: 'Nombre y precio son requeridos' });
  }

  const newProduct = {
    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    name,
    description: description || '',
    price: parseFloat(price),
    category: category || 'Sin categoría',
    stock: stock || 0
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  const { name, description, price, category, stock } = req.body;
  
  products[productIndex] = {
    ...products[productIndex],
    name: name || products[productIndex].name,
    description: description || products[productIndex].description,
    price: price !== undefined ? parseFloat(price) : products[productIndex].price,
    category: category || products[productIndex].category,
    stock: stock !== undefined ? parseInt(stock) : products[productIndex].stock
  };

  res.json(products[productIndex]);
});

app.delete('/api/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  products.splice(productIndex, 1);
  res.json({ message: 'Producto eliminado exitosamente' });
});

// Endpoints de Categorías
app.get('/api/categories', (req, res) => {
  res.json(categories);
});

app.get('/api/categories/:id', (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.id));
  if (!category) {
    return res.status(404).json({ error: 'Categoría no encontrada' });
  }
  res.json(category);
});

app.post('/api/categories', (req, res) => {
  const { name } = req.body;
  
  if (!name) {
    return res.status(400).json({ error: 'Nombre es requerido' });
  }

  const newCategory = {
    id: categories.length > 0 ? Math.max(...categories.map(c => c.id)) + 1 : 1,
    name
  };

  categories.push(newCategory);
  res.status(201).json(newCategory);
});

// Endpoints de Carrito
app.get('/api/cart/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userCart = carts.find(c => c.userId === userId);
  
  if (!userCart) {
    return res.json({ userId, items: [], total: 0 });
  }
  
  res.json(userCart);
});

app.post('/api/cart/:userId/add', (req, res) => {
  const userId = parseInt(req.params.userId);
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ error: 'productId y quantity son requeridos' });
  }

  const product = products.find(p => p.id === parseInt(productId));
  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  if (product.stock < quantity) {
    return res.status(400).json({ error: 'Stock insuficiente' });
  }

  let userCart = carts.find(c => c.userId === userId);
  
  if (!userCart) {
    userCart = {
      userId,
      items: [],
      total: 0
    };
    carts.push(userCart);
  }

  const existingItem = userCart.items.find(item => item.productId === parseInt(productId));
  
  if (existingItem) {
    existingItem.quantity += parseInt(quantity);
  } else {
    userCart.items.push({
      productId: parseInt(productId),
      name: product.name,
      price: product.price,
      quantity: parseInt(quantity)
    });
  }

  userCart.total = userCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  res.json(userCart);
});

app.delete('/api/cart/:userId/remove/:productId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const productId = parseInt(req.params.productId);

  const userCart = carts.find(c => c.userId === userId);
  
  if (!userCart) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  userCart.items = userCart.items.filter(item => item.productId !== productId);
  userCart.total = userCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  res.json(userCart);
});

app.delete('/api/cart/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const cartIndex = carts.findIndex(c => c.userId === userId);
  
  if (cartIndex === -1) {
    return res.status(404).json({ error: 'Carrito no encontrado' });
  }

  carts.splice(cartIndex, 1);
  res.json({ message: 'Carrito limpiado exitosamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
