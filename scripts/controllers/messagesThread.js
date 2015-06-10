'use strict';

angular.module('angularNoteboosterApp')
.controller('MessagesThreadCtrl', function ($scope,$stateParams,nbApiService) {
	
	$scope.getThread = function(threadId){
  		nbApiService.getThread(threadId)
  	 	.then(function(data){
  	 		$scope.itemCount = data.count;
  	 		$scope.messages = data.results;
  	 		console.log(data.results)
  	 	},function(data) {
  	 		$scope.unableToGetList = true;
  	 	});
	}

	init();
	function init(){
		console.log($stateParams.threadId);
		$scope.getThread($stateParams.threadId);
	};
});