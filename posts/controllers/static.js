var express = require('express')
var router = express.Router()

router.use(express.static(__dirname + '/../assets'))
router.use('/templates', express.static(__dirname + '/../templates'))

router.get('/', function (req, res) {
   //res.sendfile('layouts/posts.html')
   //render/ejs is now easier to use since sendFile has security restrictions on pathing
   res.render('app.html.ejs')
})

module.exports = router
