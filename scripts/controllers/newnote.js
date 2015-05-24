'use strict';

angular.module('angularNoteboosterApp')
  .controller('NewNoteCtrl', function ($scope, nbApiService, Validate) {
    $scope.model = {'email':'', 'message':'', 'name':'', 'subject':''};
  	$scope.complete = false;
    $scope.contact = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        
        nbApiService.contact( $scope.model.email,$scope.model.message,$scope.model.name,$scope.model.subject)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      
      }

    }
  });