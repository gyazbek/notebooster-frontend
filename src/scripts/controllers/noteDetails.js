'use strict';

angular.module('angularNoteboosterApp')
  .controller('NoteDetailsCtrl', function ($scope, $stateParams, nbApiService,$modal, $sce) {
    $scope.noteId = $stateParams.noteId;
  	$scope.complete = false;
    $scope.note = {};

    $scope.getPreviewLink = function(){
      if($scope.note && $scope.note.preview){
        return $sce.trustAsResourceUrl("//docs.google.com/viewer?embedded=true&url=" + encodeURIComponent($scope.note.preview));
      }
      return $sce.trustAsResourceUrl("//docs.google.com/viewer?embedded=true&url=");
    }

    $scope.getNoteDetails = function(noteId){
      $scope.notePromise = nbApiService.noteDetails(noteId)
      .then(function(data){
        // success case
        $scope.complete = true;
        $scope.note = data;

        
        $scope.noteFeedbackPromise = nbApiService.noteFeedbackList(noteId)
         .then(function(data){
          $scope.noteFeedback = data;

        },function(data){
          // error case
          $scope.errors = data.data;
        });  
      },function(data){
        // error case
        $scope.errors = data.data;
    
      });  
    }

      $scope.followUser = function(size){
      if($scope.note.user.id){
      nbApiService.followUser($scope.note.user.id)
      .then(function(data){
        var modalInstance = $modal.open({
          animation: true,
          templateUrl: '/views/partials/follow_modal.html',
          controller: 'FollowCtrl',
          size: size,
          resolve: {
            username: function () {
                return $scope.username;
            }
          }
        });

        modalInstance.result.then(function (msgResponse) {
          $scope.msgSentResponse = msgResponse;
        }, function (reason) {
          // Modal closed.
        });
      },function(reason){
    
         if(reason && reason.status==409){
          alert('You already follow this user');
         }
      });
    }
    };

    function init(){
      $scope.getNoteDetails($scope.noteId);
      // console.log($scope.noteId);
    }

    init();


    $scope.purchaseModal = function(size) {
    
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: '/views/partials/purchasenote_modal.html',
      controller: 'PurchaseNoteModalCtrl',
      size: size,
      resolve: {
      note: function () {
          return $scope.note;
      }
    }
   
    });

    modalInstance.result.then(function () {
      //TODO: disable account and log user out
      console.log('disable it');
    }, function (reason) {
      // Modal closed.
      console.log(reason);
    });
  };

    $scope.learnMoreOrganizationModal = function(username) {
     
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: '/views/partials/learn_more_organization_modal.html',
      controller: 'LearnMoreOrganization',
     // size: size,
      resolve: {
      username: function () {
          return username;
      }
    }
   
    });

    modalInstance.result.then(function () {
      //TODO: disable account and log user out
      console.log('disable it');
    }, function (reason) {
      // Modal closed.
      console.log(reason);
    });
  };


});