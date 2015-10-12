'use strict';

angular.module('angularNoteboosterApp')
.controller('ReportViolationCtrl', function ($scope,$modalInstance,nbApiService, $location) {
  
  $scope.formSubmitted = false;

  $scope.send = function () {
    console.log('sent');
    $scope.formSubmitted = true;
    if ($scope.violationForm.$valid) {
      $scope.violationPromise = nbApiService.reportViolation($scope.email, $scope.message, $scope.subject,$location.path())
      .then(function(data) {
        $scope.msgSentResponse = 'Success';
        $modalInstance.close($scope.msgSentResponse);
      },function(data){
        $scope.msgSentResponse = 'Failed';
        //$modalInstance.close($scope.msgSentResponse);
      });
    }
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});