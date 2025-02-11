import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { config } from '../config/index.js';
import { v4 as uuidv4 } from 'uuid';
import { validateInputProducts } from '../middlewares/validationMiddleware.js';
import { CartManager } from '../utils/CartManager.js';

export const ProductsRouter = Router();
const cartManager = new CartManager();

const pathToProducts = path.join(config.dirname, '/src/data/products.json');

ProductsRouter.get('/', async (req, res) => {
  let productsString = await fs.promises.readFile(pathToProducts, 'utf-8');
  const products = JSON.parse(productsString);
  res.send({ products });
});

ProductsRouter.post('/', validateInputProducts, async (req, res) => {
  let productsString = await fs.promises.readFile(pathToProducts, 'utf-8');
  const products = JSON.parse(productsString);

  const id = uuidv4();

  const {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  } = req.body;

  const product = {
    id,
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };

  products.push(product);
  await fs.promises.writeFile(pathToProducts, JSON.stringify(products, null, 2));

  // Agrega al carritp
  const carts = await cartManager.getCarts();
  if (carts.length === 0) {
    await cartManager.createCart();
  }

  const firstCart = carts[0];
  await cartManager.addProductToCart(firstCart.id, id);

  res.send({ message: 'Producto creado y agregado al carrito', data: product });
});