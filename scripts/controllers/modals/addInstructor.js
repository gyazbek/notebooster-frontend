'use strict';

angular.module('angularNoteboosterApp')
.controller('AddInstructorCtrl', function ($scope,$modalInstance,nbApiService, masterScope) {
	$scope.name="";

  $scope.addInstructor = function () {
    console.log('adding instructor...');
     
	  $scope.addInstructorPromise = nbApiService.saveInstructor(masterScope.note.school.id, $scope.name)
        .then(function(data){
          // success case
          masterScope.note.instructor = data;
			$modalInstance.close('Added');
        },function(data){
          // error case

          $scope.errors = data;
        });  


  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});