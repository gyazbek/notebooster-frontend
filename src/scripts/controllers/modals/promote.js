'use strict';

angular.module('angularNoteboosterApp')
.controller('PromoteCtrl', function ($scope,$modalInstance,nbApiService,title) {
  $scope.title = title;
  
  $scope.close = function () {
    $modalInstance.close();
  };
});