'use strict';

angular.module('angularNoteboosterApp')
  .controller('OrganizationProfileCtrl', function ($scope,$state,nbApiService,Validate) {
    $scope.orgimg = "";
    $scope.orgname = "";
    $scope.website = "";
    $scope.fullbio = "";
    $scope.onefact = "";
  });