export const logger = (req, res, next) => {
  console.debug(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  console.debug('Body:', req.body)
  next()
}