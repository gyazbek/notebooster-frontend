'use strict';
angular.module('angularNoteboosterApp').controller('NotesForSaleCtrl', function($scope, $state, nbApiService, Validate, $modal) {
    $scope.notesCount = 0;
    $scope.page = 1;
    $scope.order = 'newest';
    $scope.results = {};
    $scope.totalEarnings = 0;
    $scope.success = false;
    // Pagination
    $scope.maxSize = 10;
    $scope.getMyNotesForSale = function(page, order) {
        $scope.forsalePromise = nbApiService.getMyNotesForSale(page, order).then(function(data) {
            $scope.results = data.results;
            $scope.notesCount = data.count;
            $scope.success = true;           
        }, function(data) {});
    }
    $scope.updateNote = function(note) {
        var noteId = note.id;
        $state.go('app.update-note', {
            'noteId': noteId
        });
    }
    $scope.setNoteStatus = function(note) {
        var noteId = note.id;
        var noteStatus = note.status;//event.target.value;
      
       $scope.noteUpdatePromise = nbApiService.setNoteStatus(noteId, noteStatus)
        .then(function(data){
         
        }, function(data){
            if(angular.isDefined(data.non_field_errors)){
                data = data.non_field_errors;
            }
            note.status = 'draft';
            var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/partials/note_update_error_modal.html',
            controller: 'NoteUpdateErrorModalCtrl',
            resolve: {
            noteId: function () {
            return noteId;
            },
            issues: function(){
                return data;
            }
            }
            });
        });
    }
    $scope.getNoteDetails = function(event) {
        var noteId = event.target.id;
        $state.go('app.note-details', {
            'noteId': noteId
        });
    }
    $scope.getUserProfile = function(event) {
        var username = event.target.id;
        $state.go('app.viewprofile', {
            'username': username
        });
    };
    $scope.promote = function(event, size) {
        $scope.title = event.target.id;
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/partials/promote_modal.html',
            controller: 'PromoteCtrl',
            size: size,
            resolve: {
                title: function() {
                    return $scope.title;
                }
            }
        });
        modalInstance.result.then(function(msgResponse) {
            $scope.msgSentResponse = msgResponse;
        }, function(reason) {
            // Modal closed.
        });
    };

    function getTotalEarnings() {

        $scope.earningsRetrievalPromise = nbApiService.getNoteEarnings()
        .then(function(data){
            if(angular.isDefined(data.total_earnings)){
                $scope.totalEarnings =  data.total_earnings;
            }
        }, function(data){
    
        });
    }
    init()

    function init() {
        $scope.getMyNotesForSale($scope.page, $scope.order);
        $scope.totalEarnings = getTotalEarnings($scope.results);
    };
});




angular.module('angularNoteboosterApp')
.controller('NoteUpdateErrorModalCtrl', function ($scope,$state,$modalInstance,nbApiService,$http, noteId, issues) {



    $scope.cancel = function () {
   
        $modalInstance.dismiss('cancel');

    };

  
    
    $scope.updateNote = function() {
        $state.go('app.update-note', {
            'noteId': noteId
        });
        $modalInstance.dismiss('cancel');
    }

    if (angular.isDefined(noteId) && angular.isDefined(issues)){
        $scope.errors = issues;
    }
});