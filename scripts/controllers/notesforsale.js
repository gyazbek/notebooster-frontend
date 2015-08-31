'use strict';
angular.module('angularNoteboosterApp').controller('NotesForSaleCtrl', function($scope, $state, nbApiService, $modal) {
    $scope.notesCount = 0;
    $scope.page = 1;
    $scope.order = '-created';
    $scope.results = {};
    $scope.totalEarnings = 0;
    $scope.success = false;
    // Pagination
    $scope.maxSize = 5;
    $scope.itemsPerPage = 10;
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
            if(angular.isDefined(data.data.non_field_errors)){
                data.data = data.data.non_field_errors;
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
                return data.data;
            }
            }
            });
        });
    }
  
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