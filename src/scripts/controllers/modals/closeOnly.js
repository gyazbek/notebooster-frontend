'use strict';

angular.module('angularNoteboosterApp')
.controller('CloseOnlyCtrl', function ($scope,$modalInstance) {  
  $scope.close = function () {
    $modalInstance.close();
  };
});