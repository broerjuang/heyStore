'use strict'

const mongoose = require('mongoose');
const localMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
  sureName : String,
  userName : String,
  password : String,
  email    : {
    type   : String,
    unique : true
  },
  phoneNumber : {
    type  : String,
    unique : true
  }
}, {
  timestamps  : true
})

UserSchema.plugin(localMongoose);
module.exports = mongoose.model('User', UserSchema)
