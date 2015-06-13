'use strict';

angular.module('angularNoteboosterApp')
.controller('ReportViolationCtrl', function ($scope,$modalInstance,nbApiService,username) {
  $scope.violator = username;
  $scope.name = "";
  $scope.email = "";
  $scope.reason = "";
  $scope.msg = "";

  $scope.send = function () {
    console.log('sent');
    $scope.msgSentResponse = 'Success';
    $modalInstance.close($scope.msgSentResponse);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});