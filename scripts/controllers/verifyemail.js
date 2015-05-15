'use strict';

angular.module('angularNoteboosterApp')
  .controller('VerifyemailCtrl', function ($scope, $routeParams, nbApiService) {
    nbApiService.verify($routeParams["emailVerificationToken"]).then(function(data){
    	$scope.success = true;
    },function(data){
    	$scope.failure = false;
    });
  });
