const NotasModel = require('../models/notas')

const NotasController = {
  getAll(req, res) {
    try {
      const { materia_id } = req.query
      if (materia_id) {
        return res.json(NotasModel.getByMateria(materia_id))
      }
      res.json(NotasModel.getAll())
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener notas' })
    }
  },

  create(req, res) {
    try {
      const { materia_id, titulo, contenido } = req.body
      if (!materia_id || !titulo) {
        return res.status(400).json({ error: 'Materia y título son obligatorios' })
      }
      const nota = NotasModel.create({ materia_id: Number(materia_id), titulo, contenido })
      res.status(201).json(nota)
    } catch (error) {
      res.status(500).json({ error: 'Error al crear nota' })
    }
  },

  update(req, res) {
    try {
      const { titulo, contenido } = req.body
      const existe = NotasModel.getById(req.params.id)
      if (!existe) return res.status(404).json({ error: 'Nota no encontrada' })
      const nota = NotasModel.update(req.params.id, {
        titulo: titulo || existe.titulo,
        contenido: contenido !== undefined ? contenido : existe.contenido
      })
      res.json(nota)
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar nota' })
    }
  },

  delete(req, res) {
    try {
      const existe = NotasModel.getById(req.params.id)
      if (!existe) return res.status(404).json({ error: 'Nota no encontrada' })
      NotasModel.delete(req.params.id)
      res.json({ message: 'Nota eliminada' })
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar nota' })
    }
  }
}

module.exports = NotasController
