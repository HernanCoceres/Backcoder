export const validateInputProducts = (req, res, next) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body

  if (!title || !description || !code || !price || status === undefined || !stock || !category || !Array.isArray(thumbnails)) {
    return res.status(400).json({ message: 'Faltan parametros' })
  }

  next()
}