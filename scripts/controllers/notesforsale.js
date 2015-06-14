'use strict';

angular.module('angularNoteboosterApp')
.controller('NotesForSaleCtrl', function ($scope,$state,nbApiService,Validate) {
    $scope.noteCount = 0;
    $scope.page = 1;
    $scope.order = 'newest';
    $scope.results = {};

    $scope.getMyNotesForSale = function(page, order){
        nbApiService.getMyNotesForSale()
        .then(function(data){
            $scope.results = data.results;
            $scope.noteCount = data.results.length;
        }, function(data){

        });
    }

    $scope.setNoteStatus = function(event, noteStatus){
        var noteId = event.target.id;
        console.log("note id:\t" + noteId);
        console.log("note status:\t" + noteStatus);
        // nbApiService.setNoteStatus(noteId, noteStatus)
        // .then(function(data){
        //     console.log();
        // }, function(data){

        // });
    }

    $scope.getNoteDetails = function(event){
      var noteId = event.target.id;
      $state.go('app.note-details', {'noteId': noteId});
    }

    $scope.getUserProfile = function(event){
        var username = event.target.id;
        $state.go('app.viewprofile', {'username': username});   
    };

    init()
    function init(){
        $scope.getMyNotesForSale($scope.page, $scope.order);
    };
});
