const MateriasModel = require('../models/materias')

const MateriasController = {
  // GET /api/materias
  getAll(req, res) {
    try {
      const materias = MateriasModel.getAll()
      res.json(materias)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las materias' })
    }
  },

  // GET /api/materias/:id
  getById(req, res) {
    try {
      const materia = MateriasModel.getById(req.params.id)
      if (!materia) return res.status(404).json({ error: 'Materia no encontrada' })
      res.json(materia)
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener la materia' })
    }
  },

  // POST /api/materias
  create(req, res) {
    try {
      const { nombre, color } = req.body
      if (!nombre || !color) {
        return res.status(400).json({ error: 'El nombre y el color son obligatorios' })
      }
      const materia = MateriasModel.create({ nombre, color })
      res.status(201).json(materia)
    } catch (error) {
      if (error.message.includes('UNIQUE')) {
        return res.status(400).json({ error: 'Ya existe una materia con ese nombre' })
      }
      res.status(500).json({ error: 'Error al crear la materia' })
    }
  },

  // PUT /api/materias/:id
  update(req, res) {
    try {
      const { nombre, color } = req.body
      if (!nombre || !color) {
        return res.status(400).json({ error: 'El nombre y el color son obligatorios' })
      }
      const existe = MateriasModel.getById(req.params.id)
      if (!existe) return res.status(404).json({ error: 'Materia no encontrada' })

      const materia = MateriasModel.update(req.params.id, { nombre, color })
      res.json(materia)
    } catch (error) {
      if (error.message.includes('UNIQUE')) {
        return res.status(400).json({ error: 'Ya existe una materia con ese nombre' })
      }
      res.status(500).json({ error: 'Error al actualizar la materia' })
    }
  },

  // DELETE /api/materias/:id
  delete(req, res) {
    try {
      const existe = MateriasModel.getById(req.params.id)
      if (!existe) return res.status(404).json({ error: 'Materia no encontrada' })

      MateriasModel.delete(req.params.id)
      res.json({ message: 'Materia eliminada correctamente' })
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar la materia' })
    }
  }
}

module.exports = MateriasController
