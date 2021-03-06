'use strict';

angular.module('angularNoteboosterApp')
  .controller('ContactCtrl', function ($scope, nbApiService) {


    $scope.formSubmitted = false;

    $scope.model = {'email':'', 'message':'', 'name':'', 'subject':''};
  	$scope.complete = false;
    $scope.contact = function(formData){
      $scope.errors = [];
      //Validate.form_validation(formData,$scope.errors);
      $scope.formSubmitted = true;
      if(!formData.$invalid){
        
        $scope.contactPromise = nbApiService.contact( $scope.model.email,$scope.model.message,$scope.model.name,$scope.model.subject)
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
