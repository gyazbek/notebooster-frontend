'use strict';

angular.module('angularNoteboosterApp')
.controller('RateNoteCtrl', function ($scope,$modalInstance,nbApiService,noteSale) {

$scope.success = false;
  
  $scope.send = function () {
    $modalInstance.close();
  };
  
  $scope.close = function () {
    $modalInstance.close();
  };


  $scope.rateNote = function () {
   		$scope.submitNoteRatingPromise = nbApiService.leaveNoteFeedback(noteSale.id, $scope.feedback)
        .then(function(data){
        	// success case
          	$scope.success = true;
        },function(data){
          	// error case
          	$scope.errors = data;
      });
  	};

});