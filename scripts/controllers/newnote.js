'use strict';

angular.module('angularNoteboosterApp')
  .controller('NewNoteCtrl', function ($scope,$http,$modal,nbApiService,Validate) {
    $scope.numOfPages = 1;
    $scope.notePreview = "firstOnly";
    $scope.notePrice;
    $scope.free = false;
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

    $scope.learnMore = function(size) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/views/partials/learn_more_modal.html',
        controller: 'CloseOnlyCtrl',
        size: size
      });
    };

    $scope.addCourse = function(size) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/views/partials/add_course_modal.html',
        controller: 'AddCourseCtrl',
        size: size, 
        resolve: {
            school: function () {
                return $scope.school;
            }
          }
        });
          

        modalInstance.result.then(function (msgResponse) {
          $scope.msgSentResponse = msgResponse;
        }, function (reason) {
          // Modal closed.
        });
      }

    $scope.addInstructor = function(size) {
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/views/partials/add_instructor_modal.html',
        controller: 'AddInstructorCtrl',
        size: size
      });
          

        modalInstance.result.then(function (msgResponse) {
          $scope.msgSentResponse = msgResponse;
        }, function (reason) {
          // Modal closed.
        });
      }

    init();
    function init(){
      
    };
    // $scope.errors = {
    //   'numOfPages':[],
    //   'notePreview':[],
    //   'notePrice':[],
    //   'charitySplit':[],
    //   'noteTitle':[],
    //   'noteDesc':[],
    //   'school':[],
    //   'course':[],
    //   'semester':[],
    //   'semesterYear':[],
    //   'professor':[],
    //   'paypalEmail':[],
    //   'eula':[]
    // };
  });