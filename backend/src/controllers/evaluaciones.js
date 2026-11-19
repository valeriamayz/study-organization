const EvaluacionesModel = require('../models/evaluaciones')

const TIPOS_VALIDOS = ['Examen', 'Parcial', 'Trabajo Práctico', 'Entrega']
const ESTADOS_VALIDOS = ['Pendiente', 'En preparación', 'Listo', 'Rendido/Entregado']

const EvaluacionesController = {
  getAll(req, res) {
    try {
      const { proximas, dias } = req.query
      if (proximas === 'true') {
        const evals = EvaluacionesModel.getProximas(dias ? parseInt(dias) : 14)
        return res.json(evals)
      }
      res.json(EvaluacionesModel.getAll())
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener evaluaciones' })
    }
  },

  getById(req, res) {
    try {
      const ev = EvaluacionesModel.getById(req.params.id)
      if (!ev) return res.status(404).json({ error: 'Evaluación no encontrada' })
      res.json(ev)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener evaluación' })
    }
  },

  create(req, res) {
    try {
      const { materia_id, titulo, fecha, tipo, estado, notas } = req.body
      if (!materia_id || !titulo || !fecha || !tipo) {
        return res.status(400).json({ error: 'Materia, título, fecha y tipo son obligatorios' })
      }
      if (!TIPOS_VALIDOS.includes(tipo)) {
        return res.status(400).json({ error: `Tipo inválido. Válidos: ${TIPOS_VALIDOS.join(', ')}` })
      }
      if (estado && !ESTADOS_VALIDOS.includes(estado)) {
        return res.status(400).json({ error: `Estado inválido. Válidos: ${ESTADOS_VALIDOS.join(', ')}` })
      }

      const ev = EvaluacionesModel.create({
        materia_id: Number(materia_id),
        titulo,
        fecha,
        tipo,
        estado: estado || 'Pendiente',
        notas: notas || ''
      })
      res.status(201).json(ev)
    } catch (error) {
      res.status(500).json({ error: error.message || 'Error al crear evaluación' })
    }
  },

  update(req, res) {
    try {
      const { materia_id, titulo, fecha, tipo, estado, notas } = req.body
      const existe = EvaluacionesModel.getById(req.params.id)
      if (!existe) return res.status(404).json({ error: 'Evaluación no encontrada' })

      const ev = EvaluacionesModel.update(req.params.id, {
        materia_id: materia_id ? Number(materia_id) : existe.materia_id,
        titulo: titulo || existe.titulo,
        fecha: fecha || existe.fecha,
        tipo: tipo || existe.tipo,
        estado: estado || existe.estado,
        notas: notas !== undefined ? notas : existe.notas
      })
      res.json(ev)
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar evaluación' })
    }
  },

  delete(req, res) {
    try {
      const existe = EvaluacionesModel.getById(req.params.id)
      if (!existe) return res.status(404).json({ error: 'Evaluación no encontrada' })
      EvaluacionesModel.delete(req.params.id)
      res.json({ message: 'Evaluación eliminada correctamente' })
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar evaluación' })
    }
  }
}

module.exports = EvaluacionesController
