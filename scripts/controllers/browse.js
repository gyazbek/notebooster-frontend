'use strict';

angular.module('angularNoteboosterApp')
 .controller('BrowseCtrl', function ($scope, $stateParams, nbApiService, Validate, $http) {
    $scope.page = 1;
    $scope.schoolId = '';
    $scope.courseId = '';
    $scope.school = {};
    $scope.course = {};
    $scope.itemCount = 0;
    $scope.complete = false;

    $scope.search = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid && angular.isDefined($scope.school.selected) && $scope.school.selected!==null  && angular.isDefined($scope.school.selected.id)){
        $scope.schoolId = $scope.school.selected.id;
        console.log($scope.school.selected.id);
        $scope.courseId = angular.isDefined($scope.course.selected) ? $scope.course.selected.id : '';
        getNotes($scope.schoolId,$scope.courseId,$scope.page);
      } else {
        $scope.chooseSchool = "Must Select School.";
      }
    }

    $scope.searchSchool = function(school) {
      var params = {search: school, page: 1};
      return $http.get(
        'http://23.102.158.243/school',
        {params: params}
      ).then(function(response) {
        $scope.schools = response.data.results;
      });
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

    $scope.schoolSelected = function(item, model) {
      $scope.course = {};
    }

    $scope.getNotes = function(schoolId, courseId, page){
      nbApiService.browseNotes(schoolId,courseId,page)
        .then(function(data){
         // success case
          $scope.complete = true;
          $scope.results = data.results;
          $scope.itemCount = data.results.length;
        },function(data){
          // error case
          $scope.errors = data;
      });
    }
    
    function init(){
      if(typeof $stateParams.schoolId !== 'undefined') {
        $scope.schoolId = $stateParams.schoolId;
      }
      if(typeof $stateParams.courseId !== 'undefined') {
        $scope.courseId = $stateParams.courseId;
      }

      $scope.getNotes($scope.schoolId,$scope.courseId,$scope.page);

      // Pagination Settings Initialization
      $scope.maxSize = 5;
    }

    // Initialize settings 
    // This function was placed here because AngularJs can only reference a function if it has been previously defined.
    // And currently getNotes() is a scope function.
    init();
});
