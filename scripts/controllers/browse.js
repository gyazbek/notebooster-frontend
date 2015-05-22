'use strict';

angular.module('angularNoteboosterApp')
  .controller('BrowseCtrl', function ($scope,$stateParams, nbApiService, Validate) {
    $scope.model = {'email':'', 'message':'', 'name':'', 'subject':''};
  	$scope.complete = false;



        if(typeof $stateParams.schoolId !== 'undefined') {
        alert('school id is here');
    }


     if(typeof $stateParams.courseId !== 'undefined') {
        alert('course id is here');
    }

 


        
        nbApiService.browseNotes( '','')
        .then(function(data){
          // success case
          $scope.complete = true;
          $scope.results = data.results;
        },function(data){
          // error case
          $scope.errors = data;
        });
      
      


    $scope.search = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        
        nbApiService.browseNotes( '','')
        .then(function(data){
        	// success case
        	$scope.complete = true;
          $scope.result = data;
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      
      }

    }
  });