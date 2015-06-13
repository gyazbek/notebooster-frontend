'use strict';

angular.module('angularNoteboosterApp')
.controller('DisableAccountCtrl', function ($scope,$modalInstance,nbApiService) {  
  $scope.disableConfirm = function(){
  	$modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});