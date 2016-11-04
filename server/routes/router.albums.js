const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller.albums.js')

// -----------------------------------------------------------------------------
// ROUTING
// -----------------------------------------------------------------------------


router.get('/album',  controller.list)
router.get('/album/:id', controller.find)
router.post('/album', controller.create)
router.delete('/album/:id', controller.delete)
router.put('/album/:id', controller.update)


module.exports = router
