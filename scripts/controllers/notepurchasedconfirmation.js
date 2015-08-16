'use strict';

angular.module('angularNoteboosterApp')
.controller('NotePurchasedConfirmationCtrl', function ($q,$scope,$state,$modal,nbApiService,$http,$timeout, $stateParams) {

  $scope.noteId = $stateParams.noteId;
  $scope.purchasedConfirmed = false;
  $scope.purchasedConfirmedFailed = false;
  $scope.detailsRetrievalFailure = false;
	$scope.notesPurchased = {};
	$scope.notesCount = 0;
	$scope.order = 'newest';
  $scope.fetchAttemps = 0;

  $scope.purchasedConfirmationPromise = null; 

  $scope.note = null;
    
    function fakePromise(){
    var deferred = $q.defer();

    $timeout(function() {
      if(Math.floor((Math.random() * 3) + 1) == 1){
        deferred.resolve('bla');
      }else{
        deferred.reject();
      }
    }, 2000);
      return deferred.promise;
    }



  function retryAction(action, numTries) {
    return $q.when().then(action)
    .catch(function (error) {
        if (numTries <= 0) {
            throw error;

        }
          console.log('attempt: ' + numTries)
          // console.log('wait 500 miliseconds')
          // return retryAction(action, numTries - 1);
        
         return  $timeout(function() {
            console.log('wait 5000 miliseconds')
           return retryAction(action, numTries - 1);
        }, 5000);
       
    });
  }


$scope.attemptVerification = function(){ 
  $scope.purchasedConfirmed = false;
  $scope.purchasedConfirmedFailed = false;
  $scope.detailsRetrievalFailure = false;
  $scope.note = null;
    $scope.purchasedConfirmationPromise = retryAction(function () { return nbApiService.notePurchaseConfirmation($scope.noteId) }, 2)
  .then(function (data) {
    $scope.purchasedConfirmed = true;
    return retryAction(function () { return nbApiService.getNotePaymentDetails($scope.noteId) }, 2);
 },function(data){
  $scope.purchasedConfirmedFailed = true;
}).then(function (data) {
   $scope.note = data;
 },function(data){
      $scope.detailsRetrievalFailure = true;
  });

}

	$scope.getNotesPurchased = function(page,order){
		$scope.notesPurchasedPromise = nbApiService.getNotesPurchased(page,order)
        .then(function(data){
        	// success case
          	$scope.notesPurchased = data.results;
          	$scope.notesCount = data.count;
        },function(data){
          	// error case
          	$scope.errors = data.data;
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

	
 $scope.attemptVerification();
});