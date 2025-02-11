import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { readFile, writeFile } from '../utils/fileManager.js'
import { config } from '../config/index.js'
import path from 'path'

export const CartsRouter = Router()
const pathToCarts = path.join(config.dirname, 'src/data/carts.json')

// para crear carrito
CartsRouter.post('/', async (req, res) => {
  const carts = await readFile(pathToCarts)
  const newCart = { id: uuidv4(), products: [] }

  carts.push(newCart)
  await writeFile(pathToCarts, carts)

  res.status(201).json({ message: 'Carrito creado', cart: newCart })
})

// obtiene un prodcto del carrtio
CartsRouter.get('/:cid', async (req, res) => {
  const carts = await readFile(pathToCarts)
  const cart = carts.find(c => c.id === req.params.cid)

  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' })
  res.json({ cart })
})

// agrega un producto al caarrito
CartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const carts = await readFile(pathToCarts)
  const cart = carts.find(c => c.id === req.params.cid)

  if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' })

  const existingProduct = cart.products.find(p => p.product === req.params.pid)
  if (existingProduct) {
    existingProduct.quantity++
  } else {
    cart.products.push({ product: req.params.pid, quantity: 1 })
  }

  await writeFile(pathToCarts, carts)
  res.json({ message: 'Producto agregado al carrito', cart })
})