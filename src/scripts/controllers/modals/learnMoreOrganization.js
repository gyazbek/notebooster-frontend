'use strict';

angular.module('angularNoteboosterApp')
.controller('LearnMoreOrganization', function ($scope,$modalInstance,nbApiService, username) {
  $scope.failedLoad = false;

  if(username){
        $scope.organizationPromise = nbApiService.getOrganizationProfile(username)
        .then(function(data){
          $scope.organizationInfo = data;
        },function(data){
          $scope.failedLoad = true;
        });
      }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
