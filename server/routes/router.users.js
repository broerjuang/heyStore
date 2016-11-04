const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller.users.js')
//const books = require('../data/books.js')

// -----------------------------------------------------------------------------
// ROUTING
// -----------------------------------------------------------------------------

router.get('/user',  controller.list)
router.get('/user/:username', controller.find)
router.post('/user', controller.create)
router.delete('/user/:username', controller.delete)
router.put('/user/:username', controller.update)


module.exports = router
