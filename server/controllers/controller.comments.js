const express = require ('express')
const Comment = require('../models/model.comments');
const Album = require('../models/model.albums');
const User = require('../models/model.users');
const sms = require('./controller.twillio');

module.exports = {
  // create : (req, res) => {
  //   // lookup Album using ID
  //   Album.findOne({_id : req.params.id}, (err, album) => {
  //     //console.log(`ddddd`);
  //     if (err) {
  //       res.json(err)
  //     } else {
  //       //console.log(album);
  //       Comment.create({
  //         title : req.body.title,
  //         text : req.body.text,
  //         account : {
  //           id : album.account.id
  //         }
  //       }, (err, album) => {
  //         console.log(album.account);
  //         User.findOne({_id : album.account.id}, (err, user) => {
  //           console.log(user);
  //           console.log(album.text, user.phoneNumber);
  //           sms.notification(album.text, user.phoneNumber)
  //         })
  //         err? res.json(err) : res.json(album);;
  //       })
  //     }
  //   })
  // },

  create : (req, res) => {
    Album.findOne({_id : req.params.id}, (err, album) => {
      if (err) {
        res.json(err)
      } else {
          // console.log(album.account.id);
          Comment.create({
            title : req.body.title,
            text : req.body.text,
            account : {
              id : album.account.id
            }
          }, (err, comment) => {
            if(err){
              console.log(err);
            }else{
              // console.log('comment nih: ', comment);
              console.log('before update: ', album);
              console.log(comment);
              let result_comment = {
                _id: comment._id,
                title: comment.title,
                text: comment.text
              }
              album.account.comments.push(comment)
              album.save()
              res.json(album)
              console.log('after update: ', album);
            }
          })
      }
    })
  },

  list: (req, res) =>{
    Comment.find({}, (err, album) => {{
      err? res.json(err) : res.json(album);
    }})
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
