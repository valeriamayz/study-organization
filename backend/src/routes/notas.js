const express = require('express')
const router = express.Router()
const NotasController = require('../controllers/notas')

router.get('/', NotasController.getAll)
router.post('/', NotasController.create)
router.put('/:id', NotasController.update)
router.delete('/:id', NotasController.delete)

module.exports = router
