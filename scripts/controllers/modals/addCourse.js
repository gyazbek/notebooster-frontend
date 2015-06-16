'use strict';

angular.module('angularNoteboosterApp')
.controller('AddCourseCtrl', function ($scope,$modalInstance,nbApiService,school) {
  $scope.school = school;

  $scope.addCourse = function () {
    console.log('adding course...');
    $modalInstance.close('Added');
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});