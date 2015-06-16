'use strict';

angular.module('angularNoteboosterApp')
  .controller('UpdateNoteCtrl', function ($scope,$http,$modal,$stateParams,nbApiService,Validate) {
    $scope.noteId = "";
    $scope.numOfPages = 1;
    $scope.notePreview = "firstOnly";
    $scope.notePrice;
    $scope.free = false;
    $scope.charitySplit = "10";
    $scope.noteTitle = "";
    $scope.noteDesc = "";
    $scope.school = {};
    $scope.course = {};
    $scope.semester = "Spring";
    $scope.semesterYear = "2015";
    $scope.professor;
    $scope.paypalEmail;

    var kind = "";

    $scope.updateNote = function(){
      var data = buildData();
      nbApiService.updateNote($scope.noteId, data)
      .then(function(data){

      },function(data){

      });
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


    $scope.getNoteDetails = function(noteId){
      nbApiService.noteDetails(noteId)
      .then(function(data){
        // success case
        setValues(data);
      },function(data){
        // error case
        $scope.errors = data;
      });  
    }

    function setValues(data) {
      //TODO missing variables in data
      $scope.numOfPages = data.page_count;
      $scope.notePreview = "firstOnly";
      $scope.notePrice = data.price;
      $scope.free = false;
      $scope.charitySplit = data.charity_split;
      $scope.noteTitle = data.title;
      $scope.noteDesc = data.description;
      $scope.school = {selected: data.school};
      $scope.course = {selected: data.course};
      $scope.semester = data.term;
      $scope.semesterYear = data.year;
      $scope.professor = data.instructor.name;
      $scope.paypalEmail = data.user.profile.paypal_email;
      kind = data.kind;
    }

    function buildData(){
      //TODO Still missing professor, free, and note preview 
      return {
        "kind": kind,
        "page_count": $scope.numOfPages,
        "price": $scope.notePrice,
        "charity_split": $scope.charitySplit,
        "title": $scope.noteTitle,
        "description": $scope.noteDesc,
        "school": $scope.school,
        "course": $scope.course,
        "term": $scope.semester,
        "year": $scope.semesterYear,
        "user": {
          "profile" : {
            "paypal_email": $scope.paypalEmail
          }
        }
      }
    };

    init();
    function init(){
      if(typeof $stateParams.noteId !== 'undefined') {
        $scope.noteId = $stateParams.noteId;

        $scope.getNoteDetails($scope.noteId);
      }
    };
  });