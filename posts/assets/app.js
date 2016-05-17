//create our app module
var app = angular.module('app', [])

//create the PostsCtrl module
//dependecy inject $scope
app.controller('PostsCtrl', function ($scope, PostSvc){
 //the function runs when the "Add Post" button is clicked
 $scope.addPost = function(){
   //only add a post if there is a body
   if($scope.postBody){
     PostScv.create({
       username: 'dickeyxxx',
       body:     $scope.postBody
     })
     .success(function (post){
       $scope.posts.unshift(post)
       $scope.postBody = null
     })
   }
 }

 PostSvc.fetch()
 .success(function (posts){
   $scope.posts = posts
 })
})



app.service('PostSvc', function($http){
   this.fetch = function(){
        return $http.get('/api/posts')
   }
   this.create = function(){
        return $http.post('/api/posts', post)
   }
})
