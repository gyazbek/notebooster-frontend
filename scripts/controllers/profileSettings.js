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
      nbApiService.getSchools(params)
        .then(function(data){
         // success case
         $scope.schools = data.results;
        },function(data){
          // error case
          $scope.errors = data;
      });
    };

    $scope.saveSettings = function(){
    	$scope.data = {
        'username': $scope.username,
        'email': $scope.email,
        'profile': {
          'school': $scope.school,
          'email_notification': $scope.notifyByEmail,
          'bio': $scope.bio
        }
      }

    	nbApiService.updateProfile($scope.data)
    	.then(function(data){

    	},function(data){
        
    	});
    };

  	$scope.disableAccount = function(size) {
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
  
  $scope.onFileSelect = function($flow) {
    console.log($files);
    //$files: an array of files selected, each file has name, size, and type.
    // for (var i = 0; i < $files.length; i++) {
    //   var $file = $files[i];
    //   $upload.upload({
    //     url: 'my/upload/url',
    //     file: $file,
    //     progress: function(e){}
    //   }).then(function(data, status, headers, config) {
    //     // file is uploaded successfully
    //     console.log(data);
    //   }); 
    // }
  }

  init();
  function init() {
    getUserProfile();
  }

  function getUserProfile(){
    nbApiService.profile()
    .then(function(data){
      $scope.bio = data.profile.bio;
      $scope.username = data.username;
      $scope.school = {selected: data.profile.school};
      $scope.email = data.email;
      $scope.notifyByEmail = data.profile.email_notification;
    },function(data){

    });
  }
  
});
