'use strict';

angular.module('angularNoteboosterApp')
  .controller('OrganizationDonationsCtrl', function ($scope,$state,$modal,nbApiService,Validate) {
    $scope.itemsCount = 0;
    $scope.totalDonationAmount = 0;
    $scope.page = 1;
    $scope.donations = {};
    $scope.order = "date";

    // Pagination
    $scope.itemsPerPage = 10;
    $scope.maxSize = 5;

    $scope.getDonations = function(page,order){
        $scope.donationsPromise = nbApiService.getDonations(page, order)
        .then(function(data){
            $scope.itemsCount = data.count;
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