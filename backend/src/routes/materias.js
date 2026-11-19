const express = require('express')
const router = express.Router()
const MateriasController = require('../controllers/materias')

router.get('/', MateriasController.getAll)
router.get('/:id', MateriasController.getById)
router.post('/', MateriasController.create)
router.put('/:id', MateriasController.update)
router.delete('/:id', MateriasController.delete)

module.exports = router
