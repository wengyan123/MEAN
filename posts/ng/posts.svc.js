angular.module('app')
.service('PostSvc', function($http){
   this.fetch = function(){
        return $http.get('/api/posts')
   }
   this.create = function(){
        return $http.post('/api/posts', post)
   }
})

