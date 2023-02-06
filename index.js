const dotenv = require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const app = express()
const bodyParser = require('body-parser')
const books = require('./book')

const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const MONGO_KEY = process.env.MONGO_KEY

mongoose.connect(
  MONGO_KEY,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB')
  }
)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/books', async (req, res) => {
  try {
    const newBook = new books({
      author: req.body.author,
      title: req.body.title,
    })

    await newBook.save()

    res.status(201).send({ message: 'Book successfully added' })
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

app.get('/getbook', async (req, res) => {
  var found = await books.find({ title: req.query.title })
  console.log(found)
  res.send(found)
})

app.get('/bookslist', (req, res) => {
  books.find({}, (err, books) => {
    res.send(books)
  })
})

app.listen(port, () => {
  console.log(`Book library app listening on port ${port}`)
})
