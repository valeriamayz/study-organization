const db = require('../database')

const MateriasModel = {
  // Obtener todas las materias
  getAll() {
    return db.prepare('SELECT * FROM materias ORDER BY nombre ASC').all()
  },

  // Obtener una materia por id
  getById(id) {
    return db.prepare('SELECT * FROM materias WHERE id = ?').get(id)
  },

  // Crear materia
  create({ nombre, color }) {
    const stmt = db.prepare('INSERT INTO materias (nombre, color) VALUES (?, ?)')
    const result = stmt.run(nombre, color)
    return this.getById(result.lastInsertRowid)
  },

  // Actualizar materia
  update(id, { nombre, color }) {
    db.prepare('UPDATE materias SET nombre = ?, color = ? WHERE id = ?').run(nombre, color, id)
    return this.getById(id)
  },

  // Eliminar materia
  delete(id) {
    return db.prepare('DELETE FROM materias WHERE id = ?').run(id)
  }
}

module.exports = MateriasModel
