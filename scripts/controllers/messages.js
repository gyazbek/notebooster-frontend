'use strict';

angular.module('angularNoteboosterApp')
.controller('MessagesCtrl', function ($scope,$modal,nbApiService) {
  	$scope.page = 1;
  	$scope.listOrder = "newest";
  	$scope.itemCount = 0;

  	// Error variables
  	$scope.unableToGetList = false;

	// Total number items displayed per page in pagination
	$scope.itemsPerPage = 10;
	$scope.maxSize = 5;

  	$scope.getUserInbox = function(order,page){
  		nbApiService.getInbox()
  	 	.then(function(data){
  	 		$scope.itemCount = data.count;
  	 		$scope.messages = data.results;
  	 		console.log(data.results)
  	 	},function(data) {
  	 		$scope.unableToGetList = true;
  	 	});
  	};

  	$scope.open = function(size) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/views/partials/new_msg_modal.html',
			controller: 'NewMsgCtrl',
			size: size,
			resolve: {
				items: function () {
		  			return $scope.items;
				}
			}
		});

		modalInstance.result.then(function (selectedItem) {
			$scope.selected = selectedItem;
		}, function (reason) {
			console.log('Modal dismissed at: ' + new Date() + '\t' + reason);
		});
	};

  	function init(){
    	$scope.getUserInbox($scope.listOrder, $scope.page);
  	};

  	init();
});