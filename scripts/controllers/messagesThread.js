'use strict';

angular.module('angularNoteboosterApp')
.controller('MessagesThreadCtrl', function ($scope,$stateParams,nbApiService) {
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

	init();
	function init(){
		$scope.threadId = $stateParams.threadId;
		$scope.getThread($scope.threadId);
	};
});