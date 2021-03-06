'use strict';

angular.module('angularNoteboosterApp')
.controller('MessagesCtrl', function ($state,$scope,$modal,nbApiService) {
  	$scope.page = 1;
  	$scope.listOrder = "newest";
  	$scope.itemCount = 0;

  	// Error variables.
  	$scope.unableToGetList = false;

	// Total number items displayed per page in pagination.
	$scope.itemsPerPage = 10;
	$scope.maxSize = 5;

	// For when new message is create.
  	$scope.msgSentResponse = "";

  	// TODO: current arguments order and page is not being sent. 
  	$scope.getUserInbox = function(page,order){
  		$scope.inboxPromise = nbApiService.getInbox(page, order)
  	 	.then(function(data){
  	 		$scope.itemCount = data.count;
  	 		$scope.messages = data.results;
  	 	},function(data) {
  	 		$scope.unableToGetList = true;
  	 	});
  	};

  	$scope.open = function(size) {
  		$scope.msgSentResponse = "";
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/views/partials/contact_user_modal.html',
			controller: 'ContactUserCtrl',
			size: size,
			resolve: {
				msgSent: function () {
		  			return $scope.msgSentResponse;
				}
			}
		});

		modalInstance.result.then(function (msgResponse) {
			$scope.msgSentResponse = msgResponse;
		}, function (reason) {
			// Modal closed.
		});
	};

	$scope.deleteMsg = function(event) {
      	var threadId = event.target.id;
		nbApiService.deleteThread(threadId)
	 	.then(function(data){
	 		$scope.getUserInbox($scope.page,$scope.listOrder);
	 	},function(data) {

	 	});
	};

	$scope.view = function(event) {
      	var threadId = event.target.id;
      	$state.go('app.settings.messagethread', {'threadId': threadId});
	};

	$scope.getUserProfile = function(event){
	  	var username = event.target.id;
      	$state.go('app.viewprofile', {'username': username});		
	};

  	function init(){
    	$scope.getUserInbox($scope.page, $scope.listOrder);
  	};

  	init();
});