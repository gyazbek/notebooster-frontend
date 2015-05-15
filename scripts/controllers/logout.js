'use strict';

angular.module('angularNoteboosterApp')
  .controller('LogoutCtrl', function ($scope, $location, nbApiService) {
    nbApiService.logout();
  });
