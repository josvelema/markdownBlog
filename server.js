const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const app = express()

// database connect via mongoose

mongoose.connect('mongodb://localhost/blog' ,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true
 })

// views

app.set('view engine','ejs')

//routes

app.use('/articles', articleRouter)

app.get('/', (req,res) => {
  const articles = [{
    title: 'test art',
    created: new Date(),
    description: 'test description'
  },{
    title: 'test art2',
    created: new Date(),
    description: 'test description'
  }]
  res.render('articles/index', { articles })
})

app.listen(5000)