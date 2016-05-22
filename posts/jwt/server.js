var express = require('express')
var jwt = require('jwt-simple')
var _ = require('lodash')
var app = express()
app.use(require('body-parser').json())
var bcrypt = require('bcrypt')
var User = require('./user')

//var users = [{username: 'dickeyxxx', password: '$2a$10$vadjhMr94op96EfeMWrAqOick/tgtGmuD7Ghgq/omP4V9OOMGj/ri'}]
var secretKey = 'supersecretKey'

/*
function findUserByUsername(username){
   return _.find(users, {username: username})
}
function validateUser(user, password, cb){
   //return user.password === password
   bcrypt.compare(password, user.password, cb)
}
*/

app.post('/session', function (req, res, next) {
   User.findOne({username: req.body.username})
   .select('password')
   .exec(function(err, user){
      if (err) { return next(err)}
      if (!user) { return res.send(401)}
      bcrypt.compare(req.body.password, user.password, function (err, valid) {
         if (err) { return next(err)}
         if (!valid) { return res.send(401)}
         var token = jwt.encode({username: user.username}, secretKey)
         res.json(token)
      })
  })
})



app.post('/user', function (req, res, next){
    var user = new User({username: req.body.username})
    bcrypt.hash(req.body.password, 10, function(err, hash){
      user.password = hash
      user.save(function (err, user){
        if (err){ throw next(err)}
        res.send(201)
      })
    })
})

app.get('/user', function(req, res) {
    var token = req.headers['x-auth']
    var auth = jwt.decode(token, secretKey)
    User.findOne({username: auth.username}, function(err, user){
      res.json(user)
    })
})

app.listen(3000)

