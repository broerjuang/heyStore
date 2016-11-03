const express = require ('express')
const Comment = require('../models/model.comments');
const Album = require('../models/model.albums');
const account = require('../models/model.users');

module.exports = {

  create : (req, res) => {

    Album.create({
      title : req.body.title,
      text  : req.body.text,

    })
  },

  newComment :  function(req, res) {
    console.log(req.body);
    // find Album by id
    Album.findById(req.params.id, function(err, Album) {
      if(err) {
        console.log(err)
      } else {
        console.log(`ddddd`);
        res.json({Album: Album});
      }
    });
  },
  createComment : function(req, res) {
    // lookup Album using ID
    Album.findOne({_id : req.params.id}, function(err, data) {
      if (err) {
        res.json(err)
      } else {
        console.log(data.account.id);
        Comment.create({
          title : req.body.title,
          text : req.body.text,
          account : {
            id : data.account.id
          }
        }, (err, data) => {
          err? res.json(err) : res.json(data);;
        })
      }
    })
  }
    // Album.findById(req.params.id, function(err, data) {
    //   if(err) {
    //     console.log(err)
    //     console.log('hei');
    //     res.json(data);
    //   } else {
    //     Comment.create({
    //       title : req.body.title,
    //       text  : req.body.text,
    //       account :
    //     }, function(err, data) {
    //       if (err) {
    //         console.log(err);
    //       } else {
            // console.log(data);
            // add title and id to Comment
            // Comment.account.id = req.account._id;
            // Comment.account.title = req.account.title;
            // // save Comment
            // Comment.save();
            // Album.comments.push(Comment);
            // Album.save();
            // console.log(Comment);
            // res.redirect('/Albums/' + Album._id);
  //         }
  //       })
  //     }
  //   })

}
