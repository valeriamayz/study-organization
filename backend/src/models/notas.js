const db = require('../database')

const NotasModel = {
  getByMateria(materia_id) {
    return db.prepare('SELECT * FROM notas WHERE materia_id = ? ORDER BY creado_en DESC').all(materia_id)
  },

  getAll() {
    return db.prepare(`
      SELECT n.*, m.nombre AS materia_nombre, m.color AS materia_color
      FROM notas n
      JOIN materias m ON n.materia_id = m.id
      ORDER BY n.creado_en DESC
    `).all()
  },

  getById(id) {
    return db.prepare('SELECT * FROM notas WHERE id = ?').get(id)
  },

  create({ materia_id, titulo, contenido = '' }) {
    const stmt = db.prepare('INSERT INTO notas (materia_id, titulo, contenido) VALUES (?, ?, ?)')
    const result = stmt.run(materia_id, titulo, contenido)
    return this.getById(result.lastInsertRowid)
  },

  update(id, { titulo, contenido }) {
    db.prepare('UPDATE notas SET titulo = ?, contenido = ? WHERE id = ?').run(titulo, contenido, id)
    return this.getById(id)
  },

  delete(id) {
    return db.prepare('DELETE FROM notas WHERE id = ?').run(id)
  }
}

module.exports = NotasModel
