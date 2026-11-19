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

// Ruta de prueba y seed
const seedData = require('./seed')
app.get('/api/seed', (req, res) => {
  seedData(db)
  res.json({ status: 'ok', message: 'Datos de prueba cargados correctamente 🌱' })
})

// Ruta raíz amigable
app.get('/', (req, res) => {
  res.send(`
    <div style="font-family: sans-serif; text-align: center; padding: 40px; background: #F5F8FB; min-height: 100vh;">
      <h1 style="color: #14213D;">📚 Study Organization — Backend API</h1>
      <p style="color: #6B7A8D; font-size: 18px;">El servidor backend y la base de datos están funcionando correctamente en la nube 🚀</p>
      <div style="margin-top: 30px;">
        <a href="/health" style="display: inline-block; margin: 10px; padding: 10px 20px; background: #14213D; color: white; text-decoration: none; border-radius: 6px;">Ver /health</a>
        <a href="/api/materias" style="display: inline-block; margin: 10px; padding: 10px 20px; background: #A9D6F5; color: #111; text-decoration: none; border-radius: 6px;">Ver /api/materias</a>
        <a href="/api/dashboard" style="display: inline-block; margin: 10px; padding: 10px 20px; background: #A8E6C3; color: #111; text-decoration: none; border-radius: 6px;">Ver /api/dashboard</a>
      </div>
    </div>
  `)
})

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Study Organization API funcionando 🚀' })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})