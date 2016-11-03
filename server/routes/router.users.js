const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller.users.js')
//const books = require('../data/books.js')

// -----------------------------------------------------------------------------
// ROUTING
// -----------------------------------------------------------------------------

// req.body   >>> /data + { id: 0 }
// req.params >>> /data/:id
// req.query  >>> /data?q={id}

router.get('/user', controller.list)
router.get('/user/:userName', controller.find)
router.post('/user', controller.create)
router.delete('/user/:userName', controller.delete)
router.put('/user/:userName', controller.update)

module.exports = router
