const EvaluacionesModel = require('../models/evaluaciones')
const TareasModel = require('../models/tareas')
const MateriasModel = require('../models/materias')

const DashboardController = {
  getResumen(req, res) {
    try {
      const proximasEvaluaciones = EvaluacionesModel.getProximas(14)
      const tareasUrgentes = TareasModel.getUrgentes(7)
      const materias = MateriasModel.getAll()
      const todasTareas = TareasModel.getAll()

      const tareasPendientes = todasTareas.filter(t => !t.completada)
      const tareasCompletadas = todasTareas.filter(t => t.completada)

      res.json({
        metricas: {
          totalMaterias: materias.length,
          totalEvaluacionesProximas: proximasEvaluaciones.length,
          totalTareasPendientes: tareasPendientes.length,
          totalTareasCompletadas: tareasCompletadas.length
        },
        proximasEvaluaciones,
        tareasUrgentes,
        materias
      })
    } catch (error) {
      res.status(500).json({ error: 'Error al generar el resumen del dashboard' })
    }
  }
}

module.exports = DashboardController
