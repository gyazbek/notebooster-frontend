'use strict';

angular.module('angularNoteboosterApp')
.controller('FollowCtrl', function ($scope,$modalInstance,nbApiService,username) {
  $scope.username = username;
  
  $scope.close = function () {
    console.log('follow closed');
    $modalInstance.close();
  };
});