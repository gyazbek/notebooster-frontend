'use strict';

angular.module('angularNoteboosterApp')
  .controller('PasswordSettingsCtrl', function ($scope, nbApiService, Validate) {
    $scope.model = {'new_password1':'','new_password2':''};
  	$scope.complete = false;
    $scope.failed = false;
    $scope.changePassword = function(formData){
      $scope.errors = null;
      $scope.complete = false;
      $scope.failed = false;

      if($scope.model.new_password1 != $scope.model.new_password2){
        $scope.errors = {'new_password2':['Password does not match']};
        return;
      }
    
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        $scope.passwordChangePromise = nbApiService.changePassword($scope.model.new_password1, $scope.model.new_password2, $scope.model.old_password)
        .then(function(data){
        	// success case
          console.log (data.success);
        	$scope.complete = true;
        },function(data){
        	// error case
  	         if(angular.isDefined(data.data.non_field_errors)){
              data.data = data.data.non_field_errors;
            }
            $scope.failed = true;
            $scope.errors = data.data;
        });
      }
    }
  });
