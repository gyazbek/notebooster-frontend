'use strict';

angular.module('angularNoteboosterApp')
.controller('AddInstructorCtrl', function ($scope,$modalInstance,nbApiService) {
	$scope.name="";

  $scope.addInstructor = function () {
    console.log('adding instructor...');
    $modalInstance.close('Added');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});