'use strict';

angular.module('angularNoteboosterApp')
  .controller('OrganizationRegisterCtrl', function ($scope,$modal,nbApiService,Validate) {
    $scope.orgname = "";
    $scope.taxExemptNum = "";
    $scope.orgemail = "";
    $scope.username = "";
    $scope.pw = "";
    $scope.pwConfirm = "";
    $scope.spoc = "";
    $scope.spocEmail = "";
    $scope.paypalAccount = "";
    $scope.shortBio = "";
    $scope.fullBio = "";
    $scope.oneFact = "";
    $scope.eulaCheck = false;

    $scope.regitster = function(){
        
    }

  	$scope.whatsthis = function(descriptor,size) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/views/partials/'+ descriptor +'_modal.html',
			controller: 'WhatsThisCtrl',
			size: size
		});
	};
  });