'use strict';

angular.module('angularNoteboosterApp')
.controller('MessagesDetailCtrl', function ($scope,$stateParams,nbApiService) {
	
	$scope.getThread(threadId){
		
	}

	init();
	function init(){
		console.log($stateParams.threadId);
	};
});