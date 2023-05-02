const express = require('express')
const router = express.Router()
const controller = require('../../controllers/front/tasks.controller')

router.post('/create', controller.create)
router.put('/edit', controller.edit)
router.delete('/delete/:id', controller.delete)
router.get('/get/:id', controller.get)
router.get('/list', controller.list)

module.exports = router