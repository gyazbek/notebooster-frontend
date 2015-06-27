'use strict';

angular.module('angularNoteboosterApp')
  .controller('NoteDetailsCtrl', function ($scope, $stateParams, nbApiService, Validate,$modal) {
    $scope.noteId = $stateParams.noteId;
  	$scope.complete = false;

    $scope.getNoteDetails = function(noteId){
      $scope.notePromise = nbApiService.noteDetails(noteId)
      .then(function(data){
        // success case
        $scope.complete = true;
        $scope.note = data;

        
        $scope.noteFeedbackPromise = nbApiService.noteFeedbackList(noteId)
         .then(function(data){
          $scope.noteFeedback = data;

        },function(data){
          // error case
          $scope.errors = data;
        });  
      },function(data){
        // error case
        $scope.errors = data;
      });  
    }
    
    function init(){
      $scope.getNoteDetails($scope.noteId);
      // console.log($scope.noteId);
    }

    init();


    $scope.purchaseModal = function(size) {
    
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: '/views/partials/purchasenote_modal.html',
      controller: 'PurchaseNoteModalCtrl',
      size: size,
      resolve: {
      noteId: function () {
          return $scope.noteId;
      }
    }
   
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
