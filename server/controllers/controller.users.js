'use strict'

const User = require('../models/model.users');
const localMongoose = require('passport-local-mongoose');

module.exports = {
  create : (req, res) => {
    User.create({
      sureName  : req.body.sureName,
      userName  : req.body.userName,
      password  : req.body.password,
      email     : req.body.email
      phoneNumber : req.body.phoneNumber
    })
  }
}
