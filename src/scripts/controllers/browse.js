'use strict';

angular.module('angularNoteboosterApp')
 .controller('BrowseCtrl', function ($scope, $state, $stateParams, nbApiService, $http) {

    $scope.schoolId = null;
    $scope.courseId = null;
    $scope.page = 1;
    $scope.pageOrder = "newest";

    $scope.itemsPerPage = 10; // Total number of items displayed per page in pagination
    $scope.maxSize = 5; // Selection size option for pagination (currently allowing max 5 #s to be shown)

    // Variable for performing new search
    $scope.school = {};
    $scope.course = {};
    $scope.itemCount = 0;
    $scope.courseName = 0;

    $scope.schoolName = "";
    $scope.courseName = "";
    $scope.complete = false;

    $scope.search = function(formData){
      // $scope.errors = [];
      // Validate.form_validation(formData,$scope.errors);
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
      nbApiService.getSchools(params)
        .then(function(data){
         // success case
         $scope.schools = data.results;
        },function(data){
          // error case
          $scope.errors = data.data;
      });
    };

   
    $scope.searchCourse = function(course) {
      if (angular.isDefined($scope.school.selected) && $scope.school.selected!==null  && angular.isDefined($scope.school.selected.id)){
        var params = {search: course, school: $scope.school.selected.id};
       nbApiService.getCourses(params
        ).then(function(data) {
          $scope.courses = data.results;
        });
      }
    };

    $scope.schoolSelected = function(item, model) {
      $scope.course = {};
    }

    $scope.getNotes = function(schoolId, courseId, page, pageOrder){
       $scope.browsePromise = nbApiService.browseNotes(schoolId,courseId,page, pageOrder)
        .then(function(data){
         // success case
          $scope.complete = true;
          $scope.results = data.results;
          $scope.itemCount = data.count;
        },function(data){
          // error case
          $scope.errors = data.data;
      });
    }
 


    
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


      // see if the school and course objects were passed along as parameters, if not we try to get any url parameters for display purposes
      if(angular.isDefined($stateParams.school)){
       // $scope.school = $stateParams.school;
      }else if($scope.schoolId && $scope.schoolName){
        $scope.school.selected = {'name':$scope.schoolName, 'id':$scope.schoolId}
      }

      if(angular.isDefined($stateParams.course)){
        //$scope.course = $stateParams.course;
      }else if($scope.courseId && $scope.courseName){
        $scope.course.selected = {'name':$scope.courseName, 'id':$scope.courseId}
      }
      

      $scope.getNotes($scope.schoolId,$scope.courseId,$scope.page,$scope.pageOrder);
    }


    init();
});
