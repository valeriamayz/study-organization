const db = require('../database')

const TareasModel = {
  getAll() {
    return db.prepare(`
      SELECT * FROM tareas
      ORDER BY completada ASC,
               CASE prioridad
                 WHEN 'Alta' THEN 1
                 WHEN 'Media' THEN 2
                 WHEN 'Baja' THEN 3
                 ELSE 4
               END,
               fecha_limite ASC
    `).all()
  },

  getUrgentes(dias = 7) {
    return db.prepare(`
      SELECT * FROM tareas
      WHERE completada = 0
        AND fecha_limite IS NOT NULL
        AND date(fecha_limite) <= date('now', '+' || ? || ' days')
      ORDER BY CASE prioridad
                 WHEN 'Alta' THEN 1
                 WHEN 'Media' THEN 2
                 WHEN 'Baja' THEN 3
               END,
               fecha_limite ASC
    `).all(dias)
  },

  getById(id) {
    return db.prepare('SELECT * FROM tareas WHERE id = ?').get(id)
  },

  create({ titulo, prioridad = 'Media', fecha_limite = null }) {
    const stmt = db.prepare(`
      INSERT INTO tareas (titulo, prioridad, fecha_limite, completada)
      VALUES (?, ?, ?, 0)
    `)
    const result = stmt.run(titulo, prioridad, fecha_limite)
    return this.getById(result.lastInsertRowid)
  },

  update(id, { titulo, prioridad, fecha_limite, completada }) {
    db.prepare(`
      UPDATE tareas
      SET titulo = ?, prioridad = ?, fecha_limite = ?, completada = ?
      WHERE id = ?
    `).run(titulo, prioridad, fecha_limite, completada ? 1 : 0, id)
    return this.getById(id)
  },

  toggle(id) {
    const actual = this.getById(id)
    if (!actual) return null
    const nuevoEstado = actual.completada ? 0 : 1
    db.prepare('UPDATE tareas SET completada = ? WHERE id = ?').run(nuevoEstado, id)
    return this.getById(id)
  },

  delete(id) {
    return db.prepare('DELETE FROM tareas WHERE id = ?').run(id)
  }
}

module.exports = TareasModel
