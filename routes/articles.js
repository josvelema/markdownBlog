const express = require('express')
const router = express.Router()

router.get('/new', (req,res) => {
  res.render('articles/new')
})


router.post('/', (req,res) => {
  
})



// export so the app knows how to route

module.exports = router
