'use strict';

angular.module('angularNoteboosterApp')
  .controller('NewNoteCtrl', function ($scope,$http,$modal,nbApiService,$stateParams,Validate,$cookies, FileUploader) {

    
    $scope.note = {};
    $scope.note.course = {};
    $scope.note.instructor = {};
    $scope.note.file = [];

    var uploader = $scope.uploader = new FileUploader({
            url: nbApiService.getBaseApiUrl() + '/note/file/upload',
            autoUpload: true,

            headers: {'X-CSRFToken': $cookies['csrftoken'],
                'Authorization': 'Token ' + $cookies.token},
        });

        // FILTERS

      uploader.filters.push({
          name: 'customFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
              return this.queue.length < 5;
          }
      });

       // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {

            uploader.headers =  {'X-CSRFToken': $cookies['csrftoken'],
                'Authorization': 'Token ' + $cookies.token};

            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {

            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);

          if(status==200 || status == 200){
            if(angular.isDefined(response.id)){
              $scope.note.file.push(response);
              fileItem.remove();
            }
          }
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
            //alert(JSON.stringify($scope.note.file));

        };

        console.info('uploader', uploader);




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
    
    $scope.school = {};
    $scope.organization = {};
    $scope.organizationList = [];
    $scope.organizationListRetrieval = nbApiService.getSimpleOrgnizationList().then(function(data) {
          $scope.organizationList = data;
          if(data && data.length > 0){
            $scope.organization.selected = data[0];
          }
    });

    $scope.removeFile = function(item) {
       var index = $scope.note.file.indexOf(item);
        $scope.note.file.splice(index, 1);     
    };

    $scope.loadOrganization = function(item, model) {
      if(item.user.username){
        $scope.organizationPromise = nbApiService.getOrganizationProfile(item.user.username)
        .then(function(data){
          $scope.organizationInfo = data;
        },function(data){
          $scope.error;
        });
      }
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
      $scope.note.course = {};
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




    $scope.saveNote = function(type){

      $scope.success = false;
      $scope.errors = {};
      // {edit out}
      // we copy the note to do some basic transformation
      // this won't be needed when we match the model on API side as well as view side
      // we use course_id and instructor_id right now, purely due to time constraints when pouring over the documentation for api framework when it comes to deserializing existing nested objects
      // var noteObj = {};
      // angular.copy($scope.note, noteObj)
      
      // alert(JSON.stringify(noteObj));
      // if(angular.isDefined(noteObj.course.id)){

      //   alert(noteObj.course.id)
      //   delete noteObj.course;
      //   alert(JSON.stringify(noteObj));
      // }

      if(type == 'draft'){

        $scope.note.status = 'draft';
        $scope.noteSaveSuccess = false;
   
      }else {
        $scope.note.status = 'active';
        //delete $scope.note.draft;
      }

 
      if(angular.isDefined($scope.note.id)){


        $scope.saveNotePromise = nbApiService.updateNote($scope.note.id, $scope.note)
        .then(function(data){
           $scope.noteSaveSuccess = true;
        },function(data){
           if(angular.isDefined(data.non_field_errors)){
              data = data.non_field_errors;
            }
        
            $scope.errors = data;
      
        });
      }else{
        $scope.saveNotePromise = nbApiService.newNote($scope.note)
        .then(function(data){
           if(type == 'draft'){
            $state.go('app.new-note.draft-confirmation');
           }else{
             $state.go('app.new-note.confirmation');
           }
        },function(data){
          
         if(angular.isDefined(data.non_field_errors)){
              data = data.non_field_errors;
            }
        
            $scope.errors = data;
      
        });
      }
    };
      // $scope.create = function(){
      //   $scope.openSaveNoteModal();
      // }

    init();
    function init(){
      $scope.paypalEmailUpdate = $scope.user.paypal_email;
       if(typeof $stateParams.noteId !== 'undefined') {
        $scope.noteId = $stateParams.noteId;

         $scope.existingNoteRetrievalPromise = nbApiService.noteEditDetails($scope.noteId)
        .then(function(data){
          // success case
          $scope.note = data;
        },function(data){
          // error case
          $scope.errors = data;
        });  
        
      }
    };



  });

