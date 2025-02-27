import { Router } from 'express';
import { CartManager } from '../utils/CartManager.js';

export const CartsRouter = Router();
const cartManager = new CartManager();

CartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.createCart();
    res.status(201).send({ message: 'Carrito creado', cart: newCart });
  } catch (error) {
    res.status(500).send({ message: 'Error al crear el carrito', error: error.message });
  }
});

CartsRouter.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).send({ message: 'Carrito no encontrado' });
    }
    res.send(cart);
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener el carrito', error: error.message });
  }
});

CartsRouter.post('/:cid/product/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const updatedCart = await cartManager.addProductToCart(cid, pid);
    res.send({ message: 'Producto agregado al carrito', cart: updatedCart });
  } catch (error) {
    res.status(500).send({ message: 'Error al agregar producto al carrito', error: error.message });
  }
});