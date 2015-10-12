'use strict';

angular.module('angularNoteboosterApp')
.controller('FollowCtrl', function ($scope,$modalInstance,nbApiService,username) {
  $scope.username = username;
  
  $scope.close = function () {
    $modalInstance.close();
  };
});