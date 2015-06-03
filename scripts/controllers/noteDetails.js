'use strict';

angular.module('angularNoteboosterApp')
  .controller('NoteDetailsCtrl', function ($scope, $stateParams, nbApiService, Validate) {
    $scope.noteId = $stateParams.noteId;
  	$scope.complete = false;

    $scope.getNoteDetails = function(noteId){
      nbApiService.noteDetails(noteId)
      .then(function(data){
        // success case
        $scope.complete = true;
        $scope.note = data;

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
});
