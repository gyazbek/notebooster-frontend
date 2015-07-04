'use strict';

angular.module('angularNoteboosterApp')
.controller('NotesPurchasedCtrl', function ($scope,$state,$modal,nbApiService,$http) {
	$scope.notesPurchased = {};
	$scope.notesCount = 0;
	$scope.order = 'newest';

	$scope.noteTitle = "";

    // Pagination
    $scope.page = 1;
    $scope.maxSize = 10;

	$scope.getNotesPurchased = function(page,order){
		$scope.notesPurchasedPromise = nbApiService.getNotesPurchased(page,order)
        .then(function(data){
        	// success case
          	$scope.notesPurchased = data.results;
          	$scope.notesCount = data.results.length;
        },function(data){
          	// error case
          	$scope.errors = data;
      });
	};

    $scope.getUserProfile = function(event){
        var username = event.target.id;
        $state.go('app.viewprofile', {'username': username});   
    };

    $scope.getNoteDetails = function(event){
      var noteId = event.target.id;
      $state.go('app.note-details', {'noteId': noteId});
    };

  	$scope.rateNote = function($event,size) {
  		$scope.msgSentResponse = "";
  		$scope.noteTitle = event.target.id;
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/views/partials/rate_this_note_modal.html',
			controller: 'RateNoteCtrl',
			size: size,
			resolve: {
				noteTitle: function () {
		  			return $scope.noteTitle;
				}
			}
		});

		modalInstance.result.then(function (msgResponse) {
			$scope.msgSentResponse = msgResponse;
		}, function (reason) {
			// Modal closed.
		});
	};
  
	init();
	function init(){
		$scope.getNotesPurchased($scope.order);
	};
});
