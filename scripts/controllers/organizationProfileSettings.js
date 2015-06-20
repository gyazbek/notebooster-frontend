'use strict';

angular.module('angularNoteboosterApp')
  .controller('OrganizationProfileSettingsCtrl', function ($scope,$modal,nbApiService,Validate) {
  	$scope.orgname = "";
  	$scope.email = "";
  	$scope.emailnotification = false;
  	$scope.website = "";
  	$scope.contact = "";
  	$scope.contactEmail = "";
  	$scope.shortbio = "";
  	$scope.fullbio = "";
  	$scope.onefact = "";

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

  	$scope.whatsthis = function(descriptor,size) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/views/partials/'+ descriptor +'_modal.html',
			controller: 'WhatsThisCtrl',
			size: size
		});
	};

    function getOrgProfile(){
	    nbApiService.orgProfile()
	    .then(function(data){

	    },function(data){

	    });
    }

    init();
    function init(){
    	// getOrgProfile();
    }
  });