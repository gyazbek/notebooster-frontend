'use strict';

angular.module('angularNoteboosterApp')
.controller('WatchlistCtrl', function ($scope,$state,nbApiService,$http) {
	$scope.order = "activity";

	// Pagination
	$scope.watchlistCount = 0;
	$scope.page = 1;
	$scope.maxSize = 10;

	$scope.getWatchlist = function(order,page){
		nbApiService.getWatchlist(order, page)
  	 	.then(function(data){
  	 		$scope.results = data;
			$scope.watchlistCount = data.length;
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
