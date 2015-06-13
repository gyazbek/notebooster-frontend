'use strict';

angular.module('angularNoteboosterApp')
.controller('MessagesThreadCtrl', function ($scope,$state,$stateParams,nbApiService) {
  	$scope.threadId = "";
  	$scope.msg = "";

	$scope.getThread = function(threadId){
  		nbApiService.getThread(threadId)
  	 	.then(function(data){
  	 		$scope.thread = data;
  			$scope.msg = "";
  	 	},function(data) {
  	 		
  	 	});
	}

	$scope.threadReply = function () {
    nbApiService.threadReply($scope.threadId, $scope.msg)
    .then(function(data) {
      	$scope.getThread($scope.threadId);
    },function(data){
      
    });
  };

  $scope.getUserProfile = function(event){
      var username = event.target.id;
      $state.go('app.viewprofile', {'username': username});   
      console.log(username);
  };

	init();
	function init(){
		$scope.threadId = $stateParams.threadId;
		$scope.getThread($scope.threadId);
	};
});