'use strict';

angular.module('angularNoteboosterApp')
  .controller('BrowseCtrl', function ($scope,$http,$stateParams) {
    init();
    
    console.log($stateParams.schoolId);
    console.log($stateParams.courseId);

    $scope.search = function(formData){
      $http.get('/app/notes/notes.json').success(function(data){
          $scope.data = data;
          $scope.itemCount = data.length;
      });      
    }
    
    function init(){
      $scope.model = {'email':'', 'message':'', 'name':'', 'subject':''};
  	  $scope.complete = false;

      $http.get('/app/notes/notes.json').success(function(data){
          $scope.data = data;
          $scope.itemCount = data.length;
      });
    }
 // .controller('BrowseCtrl', function ($scope,$stateParams, nbApiService, Validate) {
 //   init();

 //   if(typeof $stateParams.schoolId !== 'undefined') {
 //       alert('school id is here');
 //   }
 //   if(typeof $stateParams.courseId !== 'undefined') {
 //       alert('course id is here');
 //   }

 //   $scope.search = function(formData){
 //     $scope.errors = [];
 //     Validate.form_validation(formData,$scope.errors);
 //     if(!formData.$invalid){
 //       nbApiService.browseNotes('','')
 //       .then(function(data){
 //       	// success case
 //       	$scope.complete = true;
 //         $scope.result = data;
 //       },function(data){
 //       	// error case
 //       	$scope.errors = data;
 //       });
     
 //     }
 //   }
   
 //   function init(){
 //     $scope.model = {'email':'', 'message':'', 'name':'', 'subject':''};
 // 	  $scope.complete = false;
     
 //     nbApiService.browseNotes( '','')
 //     .then(function(data){
 //       // success case
 //       $scope.complete = true;
 //       $scope.results = data.results;
 //     },function(data){
 //       // error case
 //       $scope.errors = data;
 //     });
 //   }
  });
