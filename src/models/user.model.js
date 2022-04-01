const mongoose = require("mongoose")

const User = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  mumbaiReqs: {
    type: Number,
    default: 0
  },
  rinkebyReqs: {
    type: Number,
    default: 0
  },
})

module.exports = mongoose.model("user", User)
