import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import productManager from '../managers/productManager.js';

const router = express.Router();

// Listar todos los productos
router.get('/', (req, res) => {
  const products = productManager.getAllProducts();
  res.json(products);
});

// Obtener un producto por su id
router.get('/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Agregar un nuevo producto
router.post('/', (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;

  const newProduct = {
    id: uuidv4(),
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  productManager.addProduct(newProduct);
  res.status(201).json(newProduct);
});

// Actualizar un producto por su id
router.put('/:pid', (req, res) => {
  const productId = req.params.pid;
  const updatedProduct = req.body;

  const product = productManager.updateProduct(productId, updatedProduct);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

// Eliminar un producto por su id
router.delete('/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.deleteProduct(productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
});

export default router;