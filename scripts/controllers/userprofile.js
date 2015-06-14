'use strict';

angular.module('angularNoteboosterApp')
  .controller('UserprofileCtrl', function ($scope,$state,$modal,$stateParams,nbApiService,Validate) {
    $scope.username = "";
    $scope.userInfo = "";
    $scope.notesForSale = {};
    $scope.comments = {};

    // Pagination
    $scope.notesCount = 0;
    $scope.commentsCount = 0;
    $scope.page = 1;
    $scope.maxSize = 10;

    //tab
    $scope.tab = "";

    $scope.getProfile = function(username){
      nbApiService.getProfile(username)
      .then(function(data){
        $scope.userInfo = data;
      },function(data){
        $scope.error;
      });
    };

    $scope.getUserProfile = function(event){
        var username = event.target.id;
        $state.go('app.viewprofile', {'username': username});   
    };

    $scope.getNotesForSale = function(){
      $scope.tab = "forsale";
      nbApiService.getNotesForSale($scope.username, $scope.page)
      .then(function(data){
        $scope.notesForSale = data;
        $scope.notesCount = $scope.notesForSale.length;
      },function(data){
        $scope.error;
      });
    };

    $scope.getNoteDetails = function(event){
      var noteId = event.target.id;
      $state.go('app.note-details', {'noteId': noteId});
    }

    $scope.getComments = function(){
      $scope.tab = "comments"; 
      nbApiService.getUserFeedback($scope.username, $scope.page)
      .then(function(data){
        $scope.comments = data;
        $scope.commentsCount = $scope.comments.length;
      },function(data){
        $scope.error;
      });
    };

    $scope.report = function(size) {
      $scope.msgSentResponse = "";
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/views/partials/report_violation_modal.html',
        controller: 'ReportViolationCtrl',
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
    };

    $scope.followUser = function(size){
      nbApiService.followUser($scope.userInfo.id)
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
      },function(data){
        // error case
        $scope.error = data;
        console.log(data);
      });
    };

    $scope.contactUser = function(size){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: '/views/partials/contact_user_modal.html',
        controller: 'ContactUserCtrl',
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
    };

    function init() {
      $scope.username = $stateParams.username;
      $scope.getProfile($scope.username);
      $scope.getNotesForSale();

      nbApiService.getUserFeedback($scope.username, $scope.page)
      .then(function(data){
        $scope.comments = data;
        $scope.commentsCount = $scope.comments.length;
      },function(data){
        $scope.error;
      });
    }

    init();
  });
