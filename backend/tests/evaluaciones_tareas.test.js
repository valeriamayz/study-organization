const test = require('node:test')
const assert = require('node:assert')
const MateriasModel = require('../src/models/materias')
const EvaluacionesModel = require('../src/models/evaluaciones')
const TareasModel = require('../src/models/tareas')

test('Evaluaciones Model - CRUD y Reglas', async (t) => {
  let materiaTest = MateriasModel.getAll()[0]
  if (!materiaTest) {
    materiaTest = MateriasModel.create({ nombre: 'Materia para Evaluaciones', color: '#A9D6F5' })
  }

  await t.test('debe crear una evaluación con todos los campos válidos', () => {
    const ev = EvaluacionesModel.create({
      materia_id: materiaTest.id,
      titulo: 'Parcial 1',
      fecha: '2026-12-01',
      tipo: 'Parcial',
      estado: 'Pendiente',
      notas: 'Capítulos 1 al 4'
    })
    assert.ok(ev.id)
    assert.strictEqual(ev.titulo, 'Parcial 1')
    assert.strictEqual(ev.estado, 'Pendiente')
  })

  await t.test('debe actualizar el estado de la evaluación', () => {
    const evals = EvaluacionesModel.getAll()
    const target = evals.find(e => e.titulo === 'Parcial 1')
    assert.ok(target)
    const actualizada = EvaluacionesModel.update(target.id, {
      ...target,
      estado: 'En preparación'
    })
    assert.strictEqual(actualizada.estado, 'En preparación')
  })

  await t.test('debe listar evaluaciones próximas', () => {
    const proximas = EvaluacionesModel.getProximas(30)
    assert.ok(Array.isArray(proximas))
  })
})

test('Tareas Model - Prioridades y Completado', async (t) => {
  await t.test('debe crear una tarea con prioridad', () => {
    const t = TareasModel.create({
      titulo: 'Hacer TP de Base de Datos',
      prioridad: 'Alta',
      fecha_limite: '2026-11-30'
    })
    assert.ok(t.id)
    assert.strictEqual(t.completada, 0)
    assert.strictEqual(t.prioridad, 'Alta')
  })

  await t.test('debe alternar estado completada (toggle)', () => {
    const todas = TareasModel.getAll()
    const target = todas.find(t => t.titulo === 'Hacer TP de Base de Datos')
    assert.ok(target)
    const toggled = TareasModel.toggle(target.id)
    assert.strictEqual(toggled.completada, 1)
  })
})
