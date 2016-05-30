angular.module('app')
.controller('PostsCtrl', function ($scope, PostSvc){
 //the function runs when the "Add Post" button is clicked
 $scope.addPost = function(){
   //only add a post if there is a body
   if($scope.postBody){
     PostSvc.create({
       username: 'dickeyxxx',
       body:     $scope.postBody
     })
     .success(function (post){
       $scope.posts.unshift(post)
       $scope.postBody = null
     })
   }
 }
 
 $scope.$on('ws:new_post', function(_, post){
   $scope.$apply(function(){
      $scope.posts.unshift(post)
   })
})
   

 
 PostSvc.fetch()
 .success(function (posts){
   $scope.posts = posts
 })
})

