// Minimal production server: serves the built Vite app and proxies /api
// requests to the backend container. Replaces nginx entirely.
import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3000
const BACKEND_URL = process.env.BACKEND_URL || 'http://backend:8000'

// Note: app.use('/api', middleware) would strip the /api prefix from
// req.url before the middleware ever sees it, so the backend (whose routes
// live under /api/*) would 404. pathFilter matches on the *original*
// request path and forwards it unmodified instead.
app.use(
  createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
    pathFilter: '/api',
  }),
)

const distDir = path.join(__dirname, 'dist')
app.use(express.static(distDir))

// SPA fallback: any non-API route serves index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`VELIN frontend listening on port ${PORT}, proxying /api -> ${BACKEND_URL}`)
})
