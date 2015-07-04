'use strict';

angular.module('angularNoteboosterApp')
  .controller('NewNoteCtrl', function ($scope,$http,$modal,nbApiService,Validate) {

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
    $scope.eula = false;


    /*

    {

  "title": "",
  "description": "",
  "page_count": 0,
  "price": "",
  "kind": "",
  "term": "",
  "year": 0,
  "school": {
    "id": 0,
    "state": "",
    "name": "",
    "city": ""
  },
  "user": {
    "id": 0,
    "username": ""
  },
  "course": {
    "id": 0,
    "school": "",
    "subject": "",
    "name": "",
    "title": ""
  },
  "instructor": {
    "id": 0,
    "name": ""
  },
  "files": [
    ""
  ],
  "charity": {
    "name": "",
    "contact_email": "",
    "contact_person": "",
    "fact": "",
    "slug": "slug"
  },
  "charity_split": 0
}
*/
    
    $scope.yourAmount = function() { return $scope.price ? ( (1 - ($scope.charity_split/100)) * $scope.price) : 0 };
    $scope.charityAmount = function() { return $scope.price ? ( ($scope.charity_split/100) * $scope.price) : 0 };
    

    $scope.organization = {};
    $scope.organizationList = [];
    $scope.organizationListRetrieval = nbApiService.getSimpleOrgnizationList().then(function(data) {
          $scope.organizationList = data;
          if(data && data.length > 0){
            $scope.organization.selected = data[0];
          }
    });

    $scope.organizationSelected = function(item, model) {
      alert("I was selected")
    };

    $scope.searchSchool = function(school) {
      var params = {search: school, page: 1};      
      nbApiService.getSchools(params)
        .then(function(data){
         // success case
         $scope.schools = data.results;
        },function(data){
          // error case
          $scope.errors = data;
      });
    };

    $scope.schoolSelected = function(item, model) {
      $scope.course = {};
    };

    $scope.searchCourse = function(course) {
      if (angular.isDefined($scope.school.selected) && $scope.school.selected!==null  && angular.isDefined($scope.school.selected.id)){
        var params = {search: course, school: $scope.school.selected.id};

        return nbApiService.getCourses(params).then(function(data) {
          $scope.courses = data.results;
        });

      }
    };


        $scope.searchInstructor = function(course) {
      if (angular.isDefined($scope.school.selected) && $scope.school.selected!==null  && angular.isDefined($scope.school.selected.id)){

        return nbApiService.getInstructors($scope.school.selected.id,course ).then(function(data) {
          $scope.instructors = data.results;
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


      $scope.semesterYears = null;
      $scope.currentYear = new Date().getFullYear();

      $scope.availableSemesterYears = function(){
        
          if(!$scope.semesterYears){
            
            var semesters = [];
            var currentYear = $scope.currentYear;

            for (var i = (currentYear - 1); i <= (currentYear + 1); i++){
              var semester = {'year':i};
              semesters.push(semester);
            }
            $scope.semesterYears = semesters;
        }

        return $scope.semesterYears;

      }


      $scope.savePaypalSettings = function(){
      $scope.paypalUpdated = false;

      

      $scope.paypalQuickUpdatePromise = nbApiService.setPaymentSettings($scope.paypalEmailUpdate)
      .then(function(data){
        $scope.paypalUpdated = true;
        $scope.editorEnabled = false;
        $scope.paypalErrors = null;
      },function(data){
        if(data.profile.paypal_email){
          $scope.paypalErrors = data.profile.paypal_email;
        }else{
          $scope.paypalErrors = ['An error has occured, please try again.'];  
        }
      });
    };

    init();
    function init(){
      $scope.paypalEmailUpdate = $scope.user.paypal_email;
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