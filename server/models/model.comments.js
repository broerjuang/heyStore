'use strict'
const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
    title : String,
    text: String,
    account: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    }
});

module.exports = mongoose.model("Comment", commentSchema);
