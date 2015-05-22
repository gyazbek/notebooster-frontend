'use strict';

angular.module('angularNoteboosterApp')
  .controller('MasterCtrl', function ($scope, $location, $state, nbApiService) {
    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false;
    // Wait for the status of authentication, set scope var to true if it resolves
    nbApiService.authenticationStatus(true).then(function(){
        $scope.authenticated = true;
    });
    // Wait and respond to the logout event.
    $scope.$on('nbApiService.logged_out', function() {
      $scope.authenticated = false;
    });
    // Wait and respond to the log in event.
    $scope.$on('nbApiService.logged_in', function() {
      $scope.authenticated = true;
    });
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      console.error("Unable to change routes.  Error: ", rejection)

       $state.go('authRequired');
      // $location.path('/authRequired').replace();
    });
  });
