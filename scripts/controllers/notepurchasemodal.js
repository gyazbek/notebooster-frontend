'use strict';

angular.module('angularNoteboosterApp')
  .controller('PurchaseNoteModalCtrl', function ($scope, $location,$state, nbApiService, Validate,$modalInstance,noteId) {


     $scope.isCollapsed = true;


    $scope.model = {'username':'','password':''};
  	$scope.complete = false;

    $scope.login = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
       $scope.loginPromise = nbApiService.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	// success case
        	//$location.path("/");
          $modalInstance.close();
          $state.go($state.current, {}, {reload: true});
        },function(data){
        	// error case
        	$scope.errors = data;
        });
      }
    }

      $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
  });
