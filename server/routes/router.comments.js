const express = require('express')
const router = express.Router()

const controller = require('../controllers/controller.comments.js')
//const books = require('../data/books.js')

// -----------------------------------------------------------------------------
// ROUTING
// -----------------------------------------------------------------------------


router.get('/comment',  controller.newComment)
router.post('/comment/:id', controller.createComment)
// router.post('/comment', controller.create)
// router.delete('/comment/:username', controller.delete)
// router.put('/comment/:username', controller.update)


module.exports = router
