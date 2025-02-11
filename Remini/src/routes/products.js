import { Router } from 'express'
import { v4 as uuidv4 } from 'uuid'
import { validateInputProducts } from '../middlewares/validationMiddleware.js'
import { readFile, writeFile } from '../utils/fs.utils.js'
import { config } from '../config/index.js'
import path from 'path'

export const ProductsRouter = Router()
const pathToProducts = path.join(config.dirname, 'src/data/products.json')

// Esto para tner todos los products
ProductsRouter.get('/', async (req, res) => {
  const products = await readFile(pathToProducts)
  res.json({ products })
})

// para obtener un producto por id
ProductsRouter.get('/:pid', async (req, res) => {
  const products = await readFile(pathToProducts)
  const product = products.find(p => p.id === req.params.pid)

  if (!product) return res.status(404).json({ message: 'Producto no encontrado' })
  res.json({ product })
})

// para crear un producto
ProductsRouter.post('/', validateInputProducts, async (req, res) => {
  const products = await readFile(pathToProducts)
  const newProduct = { id: uuidv4(), ...req.body }

  products.push(newProduct)
  await writeFile(pathToProducts, products)

  res.status(201).json({ message: 'Producto creado', product: newProduct })
})

// actualiza producto
ProductsRouter.put('/:pid', async (req, res) => {
  let products = await readFile(pathToProducts)
  const index = products.findIndex(p => p.id === req.params.pid)

  if (index === -1) return res.status(404).json({ message: 'Producto no encontrado' })

  products[index] = { ...products[index], ...req.body, id: products[index].id }
  await writeFile(pathToProducts, products)

  res.json({ message: 'Producto actualizado', product: products[index] })
})

// saca un producto
ProductsRouter.delete('/:pid', async (req, res) => {
  let products = await readFile(pathToProducts)
  products = products.filter(p => p.id !== req.params.pid)

  await writeFile(pathToProducts, products)
  res.json({ message: 'Producto eliminado' })
})