const express = require ('express')

const Comment = require('../models/model.comments');
const Album = require('../models/model.albums');
const User = require('../models/model.users');

module.exports = {
  create: (req, res) => {
    Album.create({
      title : req.body.title,
      image : req.body.image,
      description : req.body.description,
      account : {
        id : '581c320969ec315e11efb8e7'
      }
    }, (err, new_album) => {
      if(err){
        console.log(err);
      }else{
        console.log(`new album created`);
        res.json(new_album)
      }
    })
  },

  update: (req, res) => {
    Album.findOneAndUpdate({
      _id : req.params.id
    },{
      title       : req.body.title,
      image       : req.body.image,
      description : req.body.description
    }, {
      new : true
    }, (err, album) => {
      err ? res.json(err) : res.json(album)
    })
  },

  delete: (req, res) => {
    Album.findOneAndRemove({
      _id : req.params.id
    }, (err, data) => {
      err ? res.json(err) : res.json(data)
    })
  },

  list: (req, res) => {
    Album.find({}, (err, data) => {
      err ? res.json(err) : res.json(data)
    })
  },

  find: (req, res) => {
    Album.findOne({
      _id : req.params.id
    }, (err, album) => {
      // console.log(album.account.comments[0]);

      //==============================
      // ini buat liat list comment di 1 album tertentu
      let result_comment = []
      for (var i = 0; i < album.account.comments.length; i++) {
        Comment.find({
          _id: album.account.comments[i]
        }, (err, comment_in_this_album) => {
          console.log(comment_in_this_album);
          result_comment.push(comment_in_this_album)
        })
      }
      //==============================
      err? res.json(err) : res.json(album)
    })
  }

}
