'use strict';

angular.module('angularNoteboosterApp')
.controller('WatchlistCtrl', function ($scope,$state,nbApiService,$http) {
	$scope.order = "activity";

	// Pagination
	$scope.items = 0;
	$scope.page = 1;
	$scope.maxSize = 5;
	$scope.itemsPerPage = 10;
	$scope.success = false;
	$scope.getWatchlist = function(order,page){
		$scope.watchListPromise = nbApiService.getWatchlist(order, page)
  	 	.then(function(data){
  	 		$scope.results = data.results;
			$scope.items = data.count;
			$scope.success = true;
  	 	},function(data) {
  	 		$scope.unableToGetList = true;
  	 	});
	};

	$scope.removeFromWatchlist = function(event){
		var username = event.target.id;
		nbApiService.removeFromWatchlist(username)
  	 	.then(function(data){
  	 		$scope.removed = true;
  	 	},function(data) {
  	 		$scope.removed = false;
  	 	});
	};

	$scope.getUserProfile = function(event){
	  	var username = event.target.id;
      	$state.go('app.viewprofile', {'username': username});		
	};

	function init(){
		$scope.getWatchlist($scope.order,$scope.page);
	}
	init();
});
