'use strict';
angular.module('angularNoteboosterApp').controller('NotesForSaleCtrl', function($scope, $state, nbApiService, Validate, $modal) {
    $scope.notesCount = 0;
    $scope.page = 1;
    $scope.order = 'newest';
    $scope.results = {};
    $scope.totalEarnings = 0;
    // Pagination
    $scope.maxSize = 10;
    $scope.getMyNotesForSale = function(page, order) {
        $scope.forsalePromise = nbApiService.getMyNotesForSale().then(function(data) {
            $scope.results = data.results;
            $scope.notesCount = data.results.length;
            $scope.totalEarnings = getTotalEarnings($scope.results);
        }, function(data) {});
    }
    $scope.updateNote = function(event) {
        var noteId = event.target.id;
        $state.go('app.update-note', {
            'noteId': noteId
        });
    }
    $scope.setNoteStatus = function(event) {
        var noteId = event.target.id;
        var noteStatus = event.target.value;
        console.log("note id:\t" + noteId);
        console.log("note status:\t" + noteStatus);
        // nbApiService.setNoteStatus(noteId, noteStatus)
        // .then(function(data){
        //     console.log();
        // }, function(data){
        // });
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
            templateUrl: '/views/partials/promote_modal.html',
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

    function getTotalEarnings(results) {
        var totalEarnings = 0;
        for (var i = 0; i < results.length; i++) {
            totalEarnings += results[i].sold_count * results[i].price;
        };
        return totalEarnings;
    }
    init()

    function init() {
        $scope.getMyNotesForSale($scope.page, $scope.order);
    };
});