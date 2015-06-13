'use strict';

angular.module('angularNoteboosterApp')
  .controller('ProfileSettingsCtrl', function ($scope,$modal,$stateParams,$http,nbApiService,Validate) {
  	$scope.img = "";
  	$scope.bio = "";
  	$scope.username = "";
  	$scope.school = {};
  	$scope.email = "";
  	$scope.notifyByEmail = false;

    $scope.searchSchool = function(school) {
      var params = {search: school, page: 1};
      return $http.get(
        'http://23.102.158.243/school',
        {params: params}
      ).then(function(response) {
        $scope.schools = response.data.results;
      });
    };

    $scope.saveSettings = function(){
    	$scope.data = {};

    	nbApiService.updateProfile($scope.data)
    	.then(function(data){
    		console.log("success");
    	},function(data){
    		console.log("failed");
    	});
    };

  	$scope.disableAccount = function(size) {
  		console.log('hi');
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/views/partials/disable_account_modal.html',
			controller: 'DisableAccountCtrl',
			size: size
		});

		modalInstance.result.then(function () {
			//TODO: disable account and log user out
			console.log('disable it');
		}, function (reason) {
			// Modal closed.
			console.log(reason);
		});
	};
  
  });
