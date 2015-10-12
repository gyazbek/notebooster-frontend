'use strict';

angular.module('angularNoteboosterApp')
.controller('WhatsThisCtrl', function ($scope,$modalInstance) {  
  $scope.close = function () {
    $modalInstance.close();
  };
});