const express = require('express')
const router = express.Router()
const DashboardController = require('../controllers/dashboard')

router.get('/', DashboardController.getResumen)

module.exports = router
