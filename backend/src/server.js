const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const db = require('./database')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors({
  origin: true, // Permite cualquier localhost o puerto durante desarrollo
  credentials: true
}))
app.use(express.json())

// Rutas
const materiasRouter = require('./routes/materias')
app.use('/api/materias', materiasRouter)

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Study Organization API funcionando 🚀' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})