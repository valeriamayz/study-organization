const express = require('express')
const router = express.Router()
const EvaluacionesController = require('../controllers/evaluaciones')

router.get('/', EvaluacionesController.getAll)
router.get('/:id', EvaluacionesController.getById)
router.post('/', EvaluacionesController.create)
router.put('/:id', EvaluacionesController.update)
router.delete('/:id', EvaluacionesController.delete)

module.exports = router
