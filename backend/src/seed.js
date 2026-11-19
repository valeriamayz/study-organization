function seedData(db) {
  if (!db) {
    db = require('./database')
  }

  console.log('🌱 Cargando datos de ejemplo...')

  try {
    // 1. Insertar Materias
    const insertMateria = db.prepare('INSERT OR IGNORE INTO materias (nombre, color) VALUES (?, ?)')
    insertMateria.run('Programación Web', '#A9D6F5')
    insertMateria.run('Bases de Datos', '#A8E6C3')
    insertMateria.run('Diseño UX/UI', '#F5B8C4')
    insertMateria.run('Arquitectura de Software', '#D4B8F5')

    // Eliminar Matemática Discreta si existía
    db.prepare("DELETE FROM materias WHERE nombre LIKE '%Matemática Discreta%'").run()
    db.prepare("DELETE FROM tareas WHERE titulo LIKE '%grafos%'").run()

    // Obtener IDs de materias
    const materias = db.prepare('SELECT id, nombre FROM materias').all()
    const matMap = {}
    materias.forEach(m => { matMap[m.nombre] = m.id })

    // 2. Insertar Evaluaciones
    const insertEval = db.prepare(`
      INSERT INTO evaluaciones (materia_id, titulo, fecha, tipo, estado, notas)
      VALUES (?, ?, ?, ?, ?, ?)
    `)

    // Verificar si ya hay evaluaciones para no duplicar en cada reinicio
    const totalEvals = db.prepare('SELECT count(*) as total FROM evaluaciones').get().total
    if (totalEvals < 3) {
      if (matMap['Programación Web']) {
        insertEval.run(
          matMap['Programación Web'],
          'Entrega Proyecto Final - Frontend & Backend',
          '2026-11-24',
          'Entrega',
          'En preparación',
          'Revisar responsive en celular y que no falten los docs'
        )
      }

      if (matMap['Bases de Datos']) {
        insertEval.run(
          matMap['Bases de Datos'],
          'Segundo Parcial - SQL & Modelado',
          '2026-11-27',
          'Parcial',
          'Pendiente',
          'Capítulos 4 al 7: subconsultas y transacciones'
        )
        insertEval.run(
          matMap['Bases de Datos'],
          'TP 1: Normalización de Tablas',
          '2026-11-05',
          'Trabajo Práctico',
          'Rendido/Entregado',
          'Aprobado con 9'
        )
      }

      if (matMap['Diseño UX/UI']) {
        insertEval.run(
          matMap['Diseño UX/UI'],
          'Defensa de Prototipo Interactivo',
          '2026-12-01',
          'Trabajo Práctico',
          'Listo',
          'Llevar presentación en diapositivas'
        )
      }

      if (matMap['Arquitectura de Software']) {
        insertEval.run(
          matMap['Arquitectura de Software'],
          'Coloquio Integrador Final',
          '2026-12-08',
          'Examen',
          'Pendiente',
          'Preguntan sobre patrones MVC, microservicios y REST'
        )
      }
    }

    // 3. Insertar Tareas
    const totalTareas = db.prepare('SELECT count(*) as total FROM tareas').get().total
    if (totalTareas < 3) {
      const insertTarea = db.prepare(`
        INSERT INTO tareas (titulo, prioridad, fecha_limite, completada)
        VALUES (?, ?, ?, ?)
      `)

      insertTarea.run('Repasar conceptos de hooks en React (useEffect, useState)', 'Alta', '2026-11-21', 0)
      insertTarea.run('Completar ejercicios prácticos de SQL JOINs', 'Alta', '2026-11-22', 0)
      insertTarea.run('Ajustar paleta de colores y márgenes mobile en CSS', 'Media', '2026-11-23', 0)
      insertTarea.run('Resumir texto de Arquitectura Limpia', 'Media', '2026-11-26', 0)
      insertTarea.run('Buscar bibliografía sobre grafos planares', 'Baja', '2026-11-30', 0)
      insertTarea.run('Instalar dependencias y configurar Git local', 'Alta', '2026-11-12', 1)
      insertTarea.run('Diseñar wireframe de pantallas principales', 'Media', '2026-11-14', 1)
    }

    // 4. Insertar Notas
    const totalNotas = db.prepare('SELECT count(*) as total FROM notas').get().total
    if (totalNotas < 2) {
      const insertNota = db.prepare('INSERT INTO notas (materia_id, titulo, contenido) VALUES (?, ?, ?)')
      if (matMap['Programación Web']) {
        insertNota.run(
          matMap['Programación Web'],
          'Apuntes de React & Vite',
          'Para desplegar en Netlify, acordarse de configurar el redirect en _redirects: /* /index.html 200'
        )
      }
      if (matMap['Bases de Datos']) {
        insertNota.run(
          matMap['Bases de Datos'],
          'Tips de SQLite',
          'Activar siempre PRAGMA foreign_keys = ON para que funcionen las claves foráneas en cascada.'
        )
      }
    }

    console.log('✅ Datos de ejemplo cargados con éxito')
  } catch (err) {
    console.error('Error al insertar seed:', err)
  }
}

module.exports = seedData
