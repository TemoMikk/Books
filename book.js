const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
  author: String,
  title: {
    type: String,
    unique: true,
  },
})

module.exports = mongoose.model('books', bookSchema)
