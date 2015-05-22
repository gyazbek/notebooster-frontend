'use strict';

angular.module('angularNoteboosterApp')
  .controller('UserprofileCtrl', function ($scope, nbApiService, Validate) {
    $scope.model = {'first_name':'','last_name':'','email':''};
  	$scope.complete = false;
  	nbApiService.profile().then(function(data){
  		$scope.model = data;
  	});
    $scope.updateProfile = function(formData, model){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        nbApiService.updateProfile(model)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.error = data;
        });
      }
    }
  });