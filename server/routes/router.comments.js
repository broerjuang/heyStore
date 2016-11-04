'use strict'

const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller.comments.js')

// -----------------------------------------------------------------------------
// ROUTING
// -----------------------------------------------------------------------------

router.post('/comment',  controller.create)
router.post('/comment/:id', controller.update)
router.delete('/comment/:id', controller.delete)

module.exports = router
