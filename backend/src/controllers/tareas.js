const TareasModel = require('../models/tareas')

const PRIORIDADES_VALIDAS = ['Alta', 'Media', 'Baja']

const TareasController = {
  getAll(req, res) {
    try {
      const { urgentes } = req.query
      if (urgentes === 'true') {
        return res.json(TareasModel.getUrgentes(7))
      }
      res.json(TareasModel.getAll())
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener tareas' })
    }
  },

  getById(req, res) {
    try {
      const t = TareasModel.getById(req.params.id)
      if (!t) return res.status(404).json({ error: 'Tarea no encontrada' })
      res.json(t)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener tarea' })
    }
  },

  create(req, res) {
    try {
      const { titulo, prioridad, fecha_limite } = req.body
      if (!titulo) return res.status(400).json({ error: 'El título es obligatorio' })
      if (prioridad && !PRIORIDADES_VALIDAS.includes(prioridad)) {
        return res.status(400).json({ error: 'Prioridad inválida' })
      }
      const t = TareasModel.create({
        titulo,
        prioridad: prioridad || 'Media',
        fecha_limite: fecha_limite || null
      })
      res.status(201).json(t)
    } catch (error) {
      res.status(500).json({ error: 'Error al crear tarea' })
    }
  },

  update(req, res) {
    try {
      const existe = TareasModel.getById(req.params.id)
      if (!existe) return res.status(404).json({ error: 'Tarea no encontrada' })
      const { titulo, prioridad, fecha_limite, completada } = req.body
      const t = TareasModel.update(req.params.id, {
        titulo: titulo || existe.titulo,
        prioridad: prioridad || existe.prioridad,
        fecha_limite: fecha_limite !== undefined ? fecha_limite : existe.fecha_limite,
        completada: completada !== undefined ? completada : existe.completada
      })
      res.json(t)
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar tarea' })
    }
  },

  toggle(req, res) {
    try {
      const t = TareasModel.toggle(req.params.id)
      if (!t) return res.status(404).json({ error: 'Tarea no encontrada' })
      res.json(t)
    } catch (error) {
      res.status(500).json({ error: 'Error al cambiar estado' })
    }
  },

  delete(req, res) {
    try {
      const existe = TareasModel.getById(req.params.id)
      if (!existe) return res.status(404).json({ error: 'Tarea no encontrada' })
      TareasModel.delete(req.params.id)
      res.json({ message: 'Tarea eliminada' })
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar tarea' })
    }
  }
}

module.exports = TareasController
