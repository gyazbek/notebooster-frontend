'use strict';

angular.module('angularNoteboosterApp')
  .controller('NewNoteCtrl', function ($scope,$http,nbApiService,Validate) {
    $scope.numOfPages = 1;
    $scope.notePreview = "firstOnly";
    $scope.notePrice;
    $scope.charitySplit = "20";
    $scope.noteTitle = "";
    $scope.noteDesc = "";
    $scope.school = {};
    $scope.course = {};
    $scope.semester = "spring";
    $scope.semesterYear = "2015";
    $scope.professor;
    $scope.paypalEmail;
    $scope.eula = false;

    $scope.searchSchool = function(school) {
      var params = {search: school, page: 1};
      return $http.get(
        'http://23.102.158.243/school',
        {params: params}
      ).then(function(response) {
        $scope.schools = response.data.results;
      });
    };

    $scope.schoolSelected = function(item, model) {
      $scope.course = {};
    };

    $scope.searchCourse = function(course) {
      if (angular.isDefined($scope.school.selected) && $scope.school.selected!==null  && angular.isDefined($scope.school.selected.id)){
        var params = {search: course, school: $scope.school.selected.id};
        return $http.get(
          'http://23.102.158.243/course',
          {params: params}
        ).then(function(response) {
          $scope.courses = response.data.results;
        });
      }
    };

    init();
    function init(){
      
    };
  });
