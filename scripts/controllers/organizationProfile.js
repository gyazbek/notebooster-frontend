'use strict';

angular.module('angularNoteboosterApp')
  .controller('OrganizationProfileCtrl', function ($scope,$modal,$state,$stateParams, nbApiService,Validate) {


    $scope.getProfile = function(username){
      $scope.profileLoadPromise = nbApiService.getOrganizationProfile(username)
      .then(function(data){
        $scope.profile = data;
      },function(data){
        $scope.error;
      });
    };



    $scope.contactUser = function(size){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/partials/contact_user_modal.html',
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
     

    }

    init();
  });