'use strict';

angular.module('angularNoteboosterApp')
.controller('AddCourseCtrl', function ($scope,$modalInstance,nbApiService, masterScope) {
  $scope.subject = {};

  $scope.addCourse = function () {
	// $scope.addSubjectPromise = nbApiService.saveCourse': function(school_id, name, title, subject_id)
    	console.log('adding course...');
      var subject_id = null;
		if (angular.isDefined($scope.subject) && $scope.subject!==null  && angular.isDefined($scope.subject.id)){
		subject_id = $scope.subject.id
		}
	  $scope.addSubjectPromise = nbApiService.saveCourse(masterScope.note.school.id, $scope.name, $scope.title, subject_id)
        .then(function(data){
          // success case
          masterScope.note.course = data;
           
			$modalInstance.close('Added');
        },function(data){
          // error case

          $scope.errors = data;
        });  


  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


    $scope.searchSubject = function(courseSub) {
      
        var params = {search: courseSub};
        return nbApiService.getCourseSubject(params).then(function(data) {
          $scope.subjects = data.results;
        });
    };
});