'use strict';

angular.module('angularNoteboosterApp')
.controller('RateNoteCtrl', function ($scope,$modalInstance,nbApiService,noteTitle) {
  $scope.noteTitle = noteTitle;
  $scope.feedback = "";
  
  $scope.send = function () {
    $modalInstance.close();
  };
  
  $scope.close = function () {
    $modalInstance.close();
  };
});