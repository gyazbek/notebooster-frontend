'use strict';

angular.module('angularNoteboosterApp')
  .controller('LogoutCtrl', function($scope, nbApiService){
    $scope.logout = function(){
      nbApiService.logout();
    }
  });
