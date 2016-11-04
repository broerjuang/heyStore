const express = require ('express')
const Comment = require('../models/model.comments');
const Album = require('../models/model.albums');

module.exports = {
  create : (req, res) => {
    // lookup Album using ID
    Album.findOne({_id : req.params.id}, (err, album) => {
      if (err) {
        res.json(err)
      } else {
        Comment.create({
          title : req.body.title,
          text : req.body.text,
          account : {
            id : album.account.id
          }
        }, (err, album) => {
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
