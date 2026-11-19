const express = require('express')
const router = express.Router()
const TareasController = require('../controllers/tareas')

router.get('/', TareasController.getAll)
router.get('/:id', TareasController.getById)
router.post('/', TareasController.create)
router.patch('/:id/toggle', TareasController.toggle)
router.put('/:id', TareasController.update)
router.delete('/:id', TareasController.delete)

module.exports = router
