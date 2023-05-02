const express = require('express')
const router = express.Router()

const tasksRoutes = require('./tasks.routes')

router.use('/tasks', tasksRoutes)

module.exports = router


