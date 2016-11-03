const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller.albums.js')
//const books = require('../data/books.js')

// -----------------------------------------------------------------------------
// ROUTING
// -----------------------------------------------------------------------------

// req.body   >>> /data + { id: 0 }
// req.params >>> /data/:id
// req.query  >>> /data?q={id}

// router.get('/album',  controller.list)
// router.get('/album/:username', controller.find)
router.post('/album', controller.create)
// router.delete('/album/:username', controller.delete)
// router.put('/album/:username', controller.update)


module.exports = router
