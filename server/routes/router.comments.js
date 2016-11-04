'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller.comments.js')

// -----------------------------------------------------------------------------
// ROUTING
// -----------------------------------------------------------------------------

router.post('/comment/:id',  controller.create)
router.post('/comment/:id', controller.update)
router.delete('/comment/:id', controller.delete)
router.get('/comment', controller.list)

module.exports = router
