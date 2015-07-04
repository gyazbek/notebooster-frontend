'use strict';

angular.module('angularNoteboosterApp')
  .controller('OrganizationDonationsCtrl', function ($scope,$state,$modal,nbApiService,Validate) {
    $scope.donationsCount = 0;
    $scope.totalEarnings = 0;
    $scope.page = 1;
    $scope.donations = {};
    $scope.order = "date";

    // Pagination
    $scope.maxSize = 10;

     

    $scope.getDonations = function(page,order){
        $scope.donationsPromise = nbApiService.getDonations(page, order)
        .then(function(data){
            $scope.donationsCount = data.count;
            $scope.donations = data.results;
            $scope.totalDonationAmount = data.totalDonationAmount;
        },function(data){
            // Request failed
        });
    }

    $scope.getNoteDetails = function(event){
      var noteId = event.target.id;
      $state.go('app.note-details', {'noteId': noteId});
    }

    $scope.getUserProfile = function(event){
        var username = event.target.id;
        $state.go('app.viewprofile', {'username': username});   
    };

  function init() {
    $scope.getDonations($scope.page,$scope.listOrder);
  }
  

init();
  });