'use strict';

angular.module('angularNoteboosterApp')
.controller('WatchlistCtrl', function ($scope,$state,nbApiService,$http) {
	$scope.orderSelect = "dateAdded";

	// Pagination
	$scope.watchlistCount = 0;
	$scope.page = 1;
	$scope.maxSize = 10;

	$scope.getWatchlist = function(order,page){
		console.log(order);
		console.log(page);
	};

	$scope.removeFromWatchlist = function(event){
		var username = event.target.id;
		console.log('removed ' + username);
	};

	$scope.getUserProfile = function(event){
	  	var username = event.target.id;
      	$state.go('app.viewprofile', {'username': username});		
	};

	function init(){
		$http.get('app/watchlist/watchlist.json').success(function(data) {
		  $scope.results = data;
		  $scope.itemCount = data.length;
		});
	}
	init();
});
