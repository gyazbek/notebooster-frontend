'use strict';


angular.module('angularNoteboosterApp')
.controller('ContactUserCtrl', function ($scope,$modalInstance,nbApiService,$stateParams) {

  $scope.to = null;
  $scope.subject = "";
  $scope.msg = "";
  $scope.userTo = {};
  $scope.failed = false;
  
  $scope.send = function () {
   
    $scope.messageForm.submitted = true;
    
      var username = ($scope.to != null ? $scope.to : ($scope.userTo.selected != null && $scope.userTo.selected.username ? $scope.userTo.selected.username : null));
     if (username!=null && $scope.messageForm.$valid) {

      $scope.sendMessagePromise = nbApiService.sendMsg(username, $scope.subject, $scope.msg)
      .then(function(data) {
        $scope.msgSentResponse = 'Success';
        $modalInstance.close($scope.msgSentResponse);
      },function(data){
        $scope.msgSentResponse = 'Failed';
        $scope.failed = true;
       // $modalInstance.close($scope.msgSentResponse);
      });
    }
  };


  $scope.searchUsers = function(term) {
      return nbApiService.getUsers(term, 1).then(function(data) {
        $scope.users = data.results;
      });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

  if(typeof $stateParams.username !== 'undefined') {
    $scope.to = $stateParams.username;
    $scope.username;
  }else{

  }



});