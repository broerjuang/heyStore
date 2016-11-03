'use strict'

const User = require('../models/model.users');
const localMongoose = require('passport-local-mongoose');

module.exports = {
  create: (req, res) => {
    User.create({
      sureName  : req.body.sureName,
      userName  : req.body.userName,
      password  : req.body.password,
      email     : req.body.email
      phoneNumber : req.body.phoneNumber
    })
  },

  list: (req, res) => {
    User.find({}, (err, data) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': 'Failed to get all User Accounts' })
      res.status(200).json(data)
    })
  },

  find: (req, res) => {
    User.findOne({
      userName : req.params.userName
    }, (err, user) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': `User with ${res.params.userName} is't found` })
      res.status(200).json(data)
    })
  },

  delete: (req, res) => {
    User.findOneAndRemove({
      userName : req.params.userName
    }, (err, user) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': `No ${req.params.userName} is found` })
      res.status(200).json({ 'message': `Book ${req.params.userName} has been deleted`
    })
  },

  update: (req, res) => {
    User.findOneAndUpdate({
      userName : req.params.userName
    }, {
      sureName    : req.body.sureName,
      userName    : req.body.userName,
      email       : req.body.email,
      password    : req.body.password,
      phoneNumber : req.body.phoneNumber
    }, {
      new : true.
      upsert true
    }, (err, user) => {
      if (err) res.status(400).json({ 'error': `Error: ${err}` })
      if (!data) res.status(404).json({ 'message': 'Failed to update user by user name' })
      res.status(200).json(data)
    })
  }


}
