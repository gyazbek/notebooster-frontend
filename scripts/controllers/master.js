'use strict';

angular.module('angularNoteboosterApp')
  .controller('MasterCtrl', function ($scope, $location, $state, nbApiService,$modal, $log) {


// we can put this method in the service class
// we make use of it as to create a 'dto' so that if we change variable names on the backend, the frontend uses a consistent naming scheme
 function createUserObject(data){
      var newObj = {};

      if(data){

        if(data.id) newObj.id = data.id;
        if(data.username) newObj.username = data.username;
        if(data.email) newObj.email = data.email;
        if(data.profile.profile_picture) newObj.profile_picture = data.profile.profile_picture;
        if(data.profile.user_type){ newObj.account_type = data.profile.user_type.toLowerCase(); }else{ newObj.account_type = 'student'}


      }

      return newObj;
    }


    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false;
    $scope.user = {}

    // Wait for the status of authentication, set scope var to true if it resolves
    nbApiService.authenticationStatus(true).then(function(){
        $scope.authenticated = true;
        nbApiService.identity().then(function(data){
          //alert(JSON.stringify(data));
          $scope.user = createUserObject(data);
        });
    });
    // Wait and respond to the logout event.
    $scope.$on('nbApiService.logged_out', function() {
      $scope.authenticated = false;
    });
    // Wait and respond to the log in event.
    $scope.$on('nbApiService.logged_in', function() {
      $scope.authenticated = true;
        nbApiService.identity().then(function(data){
          $scope.user = createUserObject(data);
        });
    });
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$routeChangeError', function(ev, current, previous, rejection){
      console.error("Unable to change routes.  Error: ", rejection)

       $state.go('authRequired');
      // $location.path('/authRequired').replace();
    });
  

   

    $scope.signinModal = function(size) {
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: '/views/partials/signin_modal.html',
      controller: 'LoginCtrl',
      size: size
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
