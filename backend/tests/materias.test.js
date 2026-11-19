const test = require('node:test')
const assert = require('node:assert')
const MateriasModel = require('../src/models/materias')

test('Materias Model - CRUD básico', async (t) => {
  await t.test('debe crear una materia con nombre y color', () => {
    const creada = MateriasModel.create({ nombre: 'Test Materia', color: '#A9D6F5' })
    assert.ok(creada.id, 'Debe tener un id asignado')
    assert.strictEqual(creada.nombre, 'Test Materia')
    assert.strictEqual(creada.color, '#A9D6F5')
  })

  await t.test('debe obtener la materia creada por id', () => {
    const materias = MateriasModel.getAll()
    const encontrada = materias.find(m => m.nombre === 'Test Materia')
    assert.ok(encontrada)
    const porId = MateriasModel.getById(encontrada.id)
    assert.strictEqual(porId.nombre, 'Test Materia')
  })

  await t.test('no debe permitir nombre duplicado (RN03)', () => {
    assert.throws(() => {
      MateriasModel.create({ nombre: 'Test Materia', color: '#A8E6C3' })
    }, /UNIQUE/)
  })

  await t.test('debe actualizar una materia existente', () => {
    const materias = MateriasModel.getAll()
    const target = materias.find(m => m.nombre === 'Test Materia')
    const actualizada = MateriasModel.update(target.id, { nombre: 'Test Materia Editada', color: '#FFDAB3' })
    assert.strictEqual(actualizada.nombre, 'Test Materia Editada')
    assert.strictEqual(actualizada.color, '#FFDAB3')
  })

  await t.test('debe eliminar la materia creada', () => {
    const materias = MateriasModel.getAll()
    const target = materias.find(m => m.nombre === 'Test Materia Editada')
    MateriasModel.delete(target.id)
    const verificacion = MateriasModel.getById(target.id)
    assert.strictEqual(verificacion, undefined)
  })
})
