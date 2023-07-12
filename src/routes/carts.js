import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import cartManager from '../managers/cartManager.js';
import productManager from '../managers/productManager.js';

const router = express.Router();

// Crear un nuevo carrito
router.post('/', (req, res) => {
  const newCart = {
    id: uuidv4(),
    products: [],
  };

  cartManager.addCart(newCart);
  res.status(201).json(newCart);
});

// Listar los productos de un carrito
router.get('/:cid', (req, res) => {
  const cartId = req.params.cid;
  const cart = cartManager.getCartById(cartId);

  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).json({ message: 'Carrito no encontrado' });
  }
});

// Agregar un producto a un carrito
router.post('/:cid/product/:pid', (req, res) => {
  const cartId = req.params.cid;
  const productId = req.params.pid;

  const cart = cartManager.getCartById(cartId);
  const product = productManager.getProductById(productId);

  if (!cart) {
    res.status(404).json({ message: 'Carrito no encontrado' });
  } else if (!product) {
    res.status(404).json({ message: 'Producto no encontrado' });
  } else {
    const existingProduct = cart.products.find((p) => p.product === productId);

    if (existingProduct) {
      existingProduct.quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    res.json(cart.products);
  }
});

export default router;