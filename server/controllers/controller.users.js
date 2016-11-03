'use strict'

const User = require('../models/model.users');
const passport = require('passport');

module.exports = {
  create: (req, res) => {
    console.log(req.body);
    User.register(new User({
      sureName  : req.body.sureName,
      username  : req.body.username,
      // password  : req.body.password,
      email     : req.body.email,
      phoneNumber : req.body.phoneNumber
    }),
    req.body.password,
    (err) => {
      if (err) {
        console.log(err);
        return res.redirect('/signup')
      } else {
        passport.authenticate('local')(req, res, () => {
          req.session.save((err) => {
            if (err) {
              return next(err);
            } else {
              res.redirect('/home')
            }
          })
        })
      }
    })
  },

  list: (req, res) => {
    User.find({}, (err, user) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!user) res.status(404).json({ 'message': 'Failed to get all User Accounts' })
      res.status(200).json(user)
    })
  },

  find: (req, res) => {
    console.log(req.params.username);
    User.findOne({
      username : req.params.username
    }, (err, user) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!user) res.status(404).json({ 'message': `User with ${res.params.username} is't found` })
      console.log(user);
      res.status(200).json(user)
    })
  },

  delete: (req, res) => {
    User.findOneAndRemove({
      username : req.params.username
    }, (err, user) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!user) res.status(404).json({ 'message': `No ${req.params.username} is found` })
      res.status(200).json({ 'message': `Book ${req.params.username} has been deleted`
    })
  })
},

  update: (req, res) => {
    console.log(req.body);
    User.findOneAndUpdate({
      username : req.params.username
    }, {
      sureName    : req.body.sureName,
      email       : req.body.email,
      password    : req.body.password,
      phoneNumber : req.body.phoneNumber
    }, {
      new : true,
      upsert : true
    }, (err, user) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!user) res.status(404).json({ 'message': 'Failed to update user by user name' })
      res.status(200).json(user)
    })
  }

}
