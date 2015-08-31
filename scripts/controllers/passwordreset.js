'use strict';

angular.module('angularNoteboosterApp')
  .controller('PasswordresetCtrl', function ($scope, nbApiService) {
    $scope.model = {'email':''};
  	$scope.complete = false;
    $scope.resetPassword = function(formData){
      //$scope.errors = [];
      //Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        $scope.resetPasswordPromise = nbApiService.resetPassword($scope.model.email)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.errors = data.data;
        });
      }
    }
  });
