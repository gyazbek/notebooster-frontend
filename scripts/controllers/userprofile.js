'use strict';

angular.module('angularNoteboosterApp')
  .controller('UserprofileCtrl', function ($scope,$modal,$stateParams,nbApiService,Validate) {
    $scope.username = "";
    $scope.userInfo = "";

    $scope.getProfile = function(username){
      nbApiService.getProfile(username)
      .then(function(data){
        $scope.userInfo = data;
      },function(data){
        console.log(data);
        $scope.error;
      });
    };

    $scope.updateProfile = function(formData, model){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        nbApiService.updateProfile(model)
        .then(function(data){
        	// success case
        	$scope.complete = true;
        },function(data){
        	// error case
        	$scope.error = data;
        });
      }
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
      // nbApiService.followUser($scope.userInfo.id)
      // .then(function(data){
      //   // success case
      //   console.log(data);
      // },function(data){
      //   // error case
      //   $scope.error = data;
      //   console.log(data);
      // });
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

    init();
    function init() {
      $scope.username = $stateParams.username;
      $scope.getProfile($scope.username);
    }
  });
