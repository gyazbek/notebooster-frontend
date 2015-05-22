'use strict';


angular.module('angularNoteboosterApp')
  .controller('MainCtrl', function ($http, $scope, $cookies, $location, nbApiService) {
    $scope.disabled = undefined;
    $scope.searchEnabled = undefined;
    $scope.searchRes = [];

    $scope.searchMedia = function($select) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: $select.search,
        sensor: false
      }
    }).then(function(response){
      $scope.searchRes = response.data.results;
    });
  };

    $scope.login = function(){
      nbApiService.login(prompt('Username'),prompt('password'))
      .then(function(data){
        handleSuccess(data);
      },handleError);
    }
    
    $scope.logout = function(){
      nbApiService.logout()
      .then(handleSuccess,handleError);
    }
    
    $scope.resetPassword = function(){
      nbApiService.resetPassword(prompt('Email'))
      .then(handleSuccess,handleError);
    }
    
    $scope.register = function(){
      nbApiService.register(prompt('Username'),prompt('Password'),prompt('Email'))
      .then(handleSuccess,handleError);
    }
    
    $scope.verify = function(){
      nbApiService.verify(prompt("Please enter verification code"))
      .then(handleSuccess,handleError);
    }
    
    $scope.goVerify = function(){
      $location.path("/verifyEmail/"+prompt("Please enter verification code"));
    }
    
    $scope.changePassword = function(){
      nbApiService.changePassword(prompt("Password"), prompt("Repeat Password"))
      .then(handleSuccess,handleError);
    }
    
    $scope.profile = function(){
      nbApiService.profile()
      .then(handleSuccess,handleError);
    }
    
    $scope.updateProfile = function(){
      nbApiService.updateProfile({'first_name': prompt("First Name"), 'last_name': prompt("Last Name"), 'email': prompt("Email")})
      .then(handleSuccess,handleError);
    }
    
    $scope.confirmReset = function(){
      nbApiService.confirmReset(prompt("Code 1"), prompt("Code 2"), prompt("Password"), prompt("Repeat Password"))
      .then(handleSuccess,handleError);
    }

    $scope.goConfirmReset = function(){
      $location.path("/passwordResetConfirm/"+prompt("Code 1")+"/"+prompt("Code 2"))
    }
    
    var handleSuccess = function(data){
      $scope.response = data;
    }
    
    var handleError = function(data){
      $scope.response = data;
    }

    $scope.show_login = true;
    $scope.$on("nbApiService.logged_in", function(data){
      $scope.show_login = false;
    });
    $scope.$on("nbApiService.logged_out", function(data){
      $scope.show_login = true;
    });

  });
