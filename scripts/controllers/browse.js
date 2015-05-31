'use strict';

angular.module('angularNoteboosterApp')
 .controller('BrowseCtrl', function ($scope, $stateParams, nbApiService, Validate, $http) {
    $scope.page = 1;
    $scope.school = {};
    $scope.course = {};
    $scope.complete = false;
    
    init();

    $scope.search = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid && angular.isDefined($scope.school.selected) && $scope.school.selected!==null  && angular.isDefined($scope.school.selected.id)){
        var courseId = angular.isDefined($scope.course.selected) ? $scope.course.selected.id : '';
        getNotes($scope.school.selected.id,courseId,$scope.page);
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

    $scope.getNumber = function(num) {
      --num;
      return new Array(num);   
    }

    function getNotes(schoolId, courseId, page){
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
      var schoolId = '';
      var courseId = '';
      if(typeof $stateParams.schoolId !== 'undefined') {
        schoolId = $stateParams.schoolId;
      }
      if(typeof $stateParams.courseId !== 'undefined') {
        courseId = $stateParams.courseId;
      }

      getNotes(schoolId,courseId,$scope.page);
    }

    // Pagination Section
    $scope.maxSize = 5;
    $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1;
    $scope.totalItems = 64;
    $scope.currentPage = 4;

    $scope.setPage = function (pageNo) {
      $scope.currentPage = pageNo;
    };

    $scope.pageChanged = function() {
      // Make browseNote call
    };
});
