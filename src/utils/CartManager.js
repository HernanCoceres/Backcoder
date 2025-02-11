import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config/index.js';

const cartFilePath = path.join(config.dirname, '/src/data/cart.json');

export class CartManager {
  constructor(filePath = cartFilePath) {
    this.filePath = filePath;
  }

  async getCarts() {
    try {
      if (!fs.existsSync(this.filePath)) {
        return [];
      }
      const data = await fs.promises.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error al obtener los carritos:', error);
      return [];
    }
  }

  async saveCarts(carts) {
    try {
      await fs.promises.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    } catch (error) {
      console.error('Error al guardar los carritos:', error);
    }
  }

  async createCart() {
    const carts = await this.getCarts();
    const newCart = { id: uuidv4(), products: [] };
    carts.push(newCart);
    await this.saveCarts(carts);
    return newCart;
  }

  async getCartById(cartId) {
    const carts = await this.getCarts();
    return carts.find(cart => cart.id === cartId) || null;
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.getCarts();
    const cartIndex = carts.findIndex(cart => cart.id === cartId);

    if (cartIndex === -1) {
      throw new Error('Carrito no encontrado');
    }

    const cart = carts[cartIndex];
    const productIndex = cart.products.findIndex(p => p.product === productId);

    if (productIndex !== -1) {
      cart.products[productIndex].quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    carts[cartIndex] = cart;
    await this.saveCarts(carts);
    return cart;
  }
}