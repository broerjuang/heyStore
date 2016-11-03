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
        id : '581b5c6f1c06a74cd40da500'
      }
    }, (err, new_album) => {
      if(err){
        console.log(err);
      }else{
        console.log(`new album created`);
        res.json(new_album)
      }
    })
  }
}
