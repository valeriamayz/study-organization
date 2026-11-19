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
const evaluacionesRouter = require('./routes/evaluaciones')
const tareasRouter = require('./routes/tareas')
const notasRouter = require('./routes/notas')
const dashboardRouter = require('./routes/dashboard')

app.use('/api/materias', materiasRouter)
app.use('/api/evaluaciones', evaluacionesRouter)
app.use('/api/tareas', tareasRouter)
app.use('/api/notas', notasRouter)
app.use('/api/dashboard', dashboardRouter)

// Ruta de prueba
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Study Organization API funcionando 🚀' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})