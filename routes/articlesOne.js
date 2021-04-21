const express = require('express')
const Article = require('./../models/article')
const router = express.Router()

router.get('/new', (req,res) => {
  res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req,res) => {
  const article = await Article.findById(req.params.id)
  res.render('articles/edit', { article : article})
})

router.get('/:slug' , async(req ,res) => {
  const article = await Article.findOne({slug : req.params.slug })

  if (article == null) res.redirect('/')
  res.render('articles/show', {article: article})
  // res.send(req.params.id)
})
 

router.post('/', async (req,res) => {
  let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  })

  try {
    article = await article.save()
  res.redirect(`/articles/${article.slug}`)
  } catch (error) {
    console.log('error !!!!!' + error);
    res.render('articles/new', { article: article })
  }
})

router.put('/:id', (req,res) => {

})


router.delete('/:id', async (req,res) => {
  await Article.findByIdAndDelete(req.params.id)
  res.redirect('/')
})

function saveArticleAndRedirect(path) {
  return (req,res) => {
    
  }
}

// export so the app knows how to route

module.exports = router
