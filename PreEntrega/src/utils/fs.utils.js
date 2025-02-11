import fs from 'fs/promises'
import { config } from '../config/index.js'

export const readFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

export const writeFile = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  } catch (error) {
    console.error('Error al escribir el archivo', error)
  }
}