const db = require('../database')

const EvaluacionesModel = {
  getAll() {
    return db.prepare(`
      SELECT e.*, m.nombre AS materia_nombre, m.color AS materia_color
      FROM evaluaciones e
      JOIN materias m ON e.materia_id = m.id
      ORDER BY e.fecha ASC
    `).all()
  },

  getProximas(dias = 14) {
    return db.prepare(`
      SELECT e.*, m.nombre AS materia_nombre, m.color AS materia_color
      FROM evaluaciones e
      JOIN materias m ON e.materia_id = m.id
      WHERE e.estado != 'Rendido/Entregado'
        AND date(e.fecha) >= date('now')
        AND date(e.fecha) <= date('now', '+' || ? || ' days')
      ORDER BY e.fecha ASC
    `).all(dias)
  },

  getById(id) {
    return db.prepare(`
      SELECT e.*, m.nombre AS materia_nombre, m.color AS materia_color
      FROM evaluaciones e
      JOIN materias m ON e.materia_id = m.id
      WHERE e.id = ?
    `).get(id)
  },

  create({ materia_id, titulo, fecha, tipo, estado = 'Pendiente', notas = '' }) {
    const stmt = db.prepare(`
      INSERT INTO evaluaciones (materia_id, titulo, fecha, tipo, estado, notas)
      VALUES (?, ?, ?, ?, ?, ?)
    `)
    const result = stmt.run(materia_id, titulo, fecha, tipo, estado, notas)
    return this.getById(result.lastInsertRowid)
  },

  update(id, { materia_id, titulo, fecha, tipo, estado, notas }) {
    db.prepare(`
      UPDATE evaluaciones
      SET materia_id = ?, titulo = ?, fecha = ?, tipo = ?, estado = ?, notas = ?
      WHERE id = ?
    `).run(materia_id, titulo, fecha, tipo, estado, notas, id)
    return this.getById(id)
  },

  delete(id) {
    return db.prepare('DELETE FROM evaluaciones WHERE id = ?').run(id)
  }
}

module.exports = EvaluacionesModel
