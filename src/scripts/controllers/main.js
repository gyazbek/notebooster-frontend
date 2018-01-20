'use strict';



angular.module('angularNoteboosterApp')
  .controller('MainCtrl', function ($http, $state, $scope, $cookies, $location, nbApiService) {

  $scope.searchSchool = function(school) {
      var params = {search: school, page: 1};      
      nbApiService.getSchools(params)
        .then(function(data){
         // success case
         $scope.schools = data.results;
        },function(data){
          // error case
          $scope.errors = data.data;
      });
  };

    $scope.school = {};
    $scope.course = {};

    $scope.searchNotes = function() {
      if (angular.isDefined($scope.school.selected) && Object.keys($scope.school.selected).length > 0 && angular.isDefined($scope.school.selected.id)){
          var schoolId = $scope.school.selected.id;
          var schoolName = $scope.school.selected.name;
          var courseId, courseName;

          if (angular.isDefined($scope.course.selected) && Object.keys($scope.course.selected).length > 0 && angular.isDefined($scope.course.selected.id)){
            courseId = $scope.course.selected.id;
            courseName = $scope.course.selected.name;
          }

          $state.go('app.browse', {"schoolId": schoolId, "schoolName": schoolName, "courseId": courseId, "courseName": courseName, "school": $scope.school, "course":$scope.course});
      } else {
        $scope.chooseSchool = "Must Select School.";
      }
    }

    $scope.schoolSelected = function(item, model) {
      $scope.course = {};
    }

    $scope.searchCourse = function(course) {
      if (angular.isDefined($scope.school.selected) && $scope.school.selected!==null  && angular.isDefined($scope.school.selected.id)){
        var params = {search: course,school: $scope.school.selected.id,page: 1};
        nbApiService.getCourses(
          params
        ).then(function(data) {
          $scope.courses = data.results
        });
      }
    };

    // $http.get('https://notebooster.com/api/organization/').success(function(data) {
    //   $scope.organizations = data;
    // });

  });



