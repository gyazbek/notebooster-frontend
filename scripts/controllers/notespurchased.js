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
          	$scope.notesCount = data.count;
        },function(data){
          	// error case
          	$scope.errors = data;
      });
	};


  	$scope.rateNote = function(noteSale) {
  		$scope.msgSentResponse = "";
  		
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'views/partials/rate_this_note_modal.html',
			controller: 'RateNoteCtrl',
			resolve: {
				noteSale: function () {
		  			return noteSale;
				}
			}
		});

		modalInstance.result.then(function (msgResponse) {
			$scope.msgSentResponse = msgResponse;
		}, function (reason) {
			// Modal closed.
		});
	};


    $scope.fileListingModal = function(id) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/partials/note_file_listing_modal.html',
            controller: 'DownloadFileListingCtrl',
            resolve: {
	         noteId: function () {
	           return id;
	         }
	       }
        });
        modalInstance.result.then(function() {
            //TODO: disable account and log user out
            console.log('disable it');
        }, function(reason) {
            // Modal closed.
            console.log(reason);
        });
    };

	
  
	init();
	function init(){
		$scope.getNotesPurchased($scope.order);
	};
});



angular.module('angularNoteboosterApp')
.controller('DownloadFileListingCtrl', function ($scope,$state,$modalInstance,nbApiService,$http, noteId) {



	$scope.cancel = function () {
   		$modalInstance.dismiss('cancel');
  	};

	$scope.downloadFile = function (id) {
   		var url = nbApiService.getBaseApiUrl() + '/note/file/' + id + '/download';
   		var hiddenElement = document.createElement('a');

	    hiddenElement.href = url;
	    hiddenElement.target = '_blank';
	    hiddenElement.download = '';
	    hiddenElement.click();
  	};

	$scope.downloadAllFiles = function () {
   		var url = nbApiService.getBaseApiUrl() + '/note/' + noteId + '/download';
   		var hiddenElement = document.createElement('a');

	    hiddenElement.href = url;
	    hiddenElement.target = '_blank';
	    hiddenElement.download = '';
	    hiddenElement.click();
  	};


	if (angular.isDefined(noteId)){
		$scope.listingRetrievalPromise = nbApiService.getNoteFileListing(noteId)
        .then(function(data){
        	// success case
          	$scope.fileListing = data;
        },function(data){
          	// error case
          	$scope.errors = data;
      });
	}
});