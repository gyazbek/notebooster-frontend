'use strict';

angular.module('angularNoteboosterApp')
  .controller('PasswordresetconfirmCtrl', function ($scope, $stateParams, nbApiService) {
    $scope.model = {'new_password1':'','new_password2':''};
  	$scope.complete = false;
    $scope.confirmReset = function(formData){
      //$scope.errors = [];
      //Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        $scope.confirmResetPromise = nbApiService.confirmReset($stateParams['firstToken'], $stateParams['passwordResetToken'], $scope.model.new_password1, $scope.model.new_password2)
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
