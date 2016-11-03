const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
   title: String,
   image: String,
   description: String,
   accountOwner: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Album", albumSchema);
