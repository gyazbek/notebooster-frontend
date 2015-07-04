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
       $scope.retrievePaymentDetails = nbApiService.getNotePaymentDetails(noteId)
        .then(function(data){
        	$scope.paymentDetails = noteId;
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
