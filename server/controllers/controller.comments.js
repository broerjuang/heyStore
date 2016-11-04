const express = require ('express')
const Comment = require('../models/model.comments');
const Album = require('../models/model.albums');
const User = require('../models/model.users');

var accountSid = 'AC4af3c0ea6da4ad7d208b3ba20b7b484b'; // Your Account SID from www.twilio.com/console
var authToken = '4fcd64210f110071d866b0c66df12c66';   // Your Auth Token from www.twilio.com/console

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);


function sms(text, phoneNumber) {
  client.messages.create({
      to: phoneNumber,
      from: "+18435646523",
      body: text,
      //mediaUrl: "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg",
  }, function(err, message) {
    err? console.log(err) : console.log(message.sid);;
  });
}


module.exports = {
  create : (req, res) => {
    // lookup Album using ID
    Album.findOne({_id : req.params.id}, (err, album) => {
      //console.log(`ddddd`);
      if (err) {
        res.json(err)
      } else {
        //console.log(album);
        Comment.create({
          title : req.body.title,
          text : req.body.text,
          account : {
            id : album.account.id
          }
        }, (err, album) => {
          console.log(album.account);
          User.findOne({_id : album.account.id}, (err, user) => {
            console.log(user);
            console.log(album.text, user.phoneNumber);
            sms(album.text, user.phoneNumber)
          })
          err? res.json(err) : res.json(album);;
        })
      }
    })
  },

  update: (req, res) => {
    // update album by its id
    Album.findOne({_id : req.params.id}, (err, album) => {
      if (err) {
        res.json(err)
      } else {
        Comment.update({_id : album.account.id}, {
          title : req.body.title,
          text  : req.body.text,
        }, (err, comment) => {
          err ? res.json(err) : res.json(comment);
        })
      }
    })
  },

  delete : (req, res) => {
    Album.findOne({_id : req.params.id}, (err, album) => {
      if (err) {
        res.json(err)
      } else {
        Comment.remove({_id : album.account.id}, (err, album) => {
          err? res.json(err) : res.json(album)
        })
      }
    })
  }

}
