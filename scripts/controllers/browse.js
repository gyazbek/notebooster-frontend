'use strict';

angular.module('angularNoteboosterApp')
 .controller('BrowseCtrl', function ($scope, $state, $stateParams, nbApiService, Validate, $http) {
    // Variables for getting notes
    $scope.schoolId = '';
    $scope.courseId = '';
    $scope.page = 1;
    $scope.listOrder = "newest";

    // Total number of items displayed per page in pagination
    $scope.maxSize = 10;

    // Variable for performing new search
    $scope.school = {};
    $scope.course = {};
    $scope.itemCount = 0;
    $scope.courseName = 0;

    $scope.schoolName = "";
    $scope.courseName = "";
    $scope.complete = false;

    $scope.search = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid && angular.isDefined($scope.school.selected) && $scope.school.selected!==null  && angular.isDefined($scope.school.selected.id)){
        
        $scope.schoolId = $scope.school.selected.id;
        $scope.schoolName = $scope.school.selected.name;
        $scope.courseId = angular.isDefined($scope.course.selected) ? $scope.course.selected.id : '';
        $scope.courseName = angular.isDefined($scope.course.selected) ? $scope.course.selected.name : '';
        
        $scope.getNotes($scope.schoolId,$scope.courseId,$scope.page,$scope.pageOrder);
      
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

    $scope.getNotes = function(schoolId, courseId, page, pageOrder){
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

    $scope.getNoteDetails = function(event){
      var noteId = event.target.id;
      $state.go('app.note-details', {'noteId': noteId});
    }

    $scope.getUserProfile = function(event){
        var username = event.target.id;
        $state.go('app.viewprofile', {'username': username});   
    };
    
    function init(){
      if(typeof $stateParams.schoolId !== 'undefined') {
        $scope.schoolId = $stateParams.schoolId;
      }
      if(typeof $stateParams.schoolName !== 'undefined') {
        $scope.schoolName = $stateParams.schoolName;
      }
      if(typeof $stateParams.courseId !== 'undefined') {
        $scope.courseId = $stateParams.courseId;
      }
      if(typeof $stateParams.courseName !== 'undefined') {
        $scope.courseName = $stateParams.courseName;
      }

      $scope.getNotes($scope.schoolId,$scope.courseId,$scope.page,$scope.pageOrder);
    }

    // Initialize settings 
    // This function was placed here because AngularJs can only reference a function if it has been previously defined.
    // And currently getNotes() is a scope function.
    init();
});
