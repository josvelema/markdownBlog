const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

// database connect via mongoose

mongoose.connect('mongodb://127.0.0.1/blog' ,{ 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
 })

// views

app.set('view engine','ejs')

//routes

app.use(express.urlencoded({ extended: false }))

app.use(methodOverride('_method'))

app.use('/articles', articleRouter)


app.get('/', async (req,res) => {
  // const articles = [{
  //   title: 'test art',
  //   created: new Date(),
  //   description: 'test description'
  // },{
  //   title: 'test art2',
  //   created: new Date(),
  //   description: 'test description'
  // }]
  const articles = await Article.find().sort({created: 'desc'})

  res.render('articles/index', { articles })
})

app.listen(5000)