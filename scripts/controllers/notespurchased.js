'use strict';

angular.module('angularNoteboosterApp')
.controller('NotesPurchasedCtrl', function ($scope,$http) {
  init();
  
  function init(){
    $http.get('app/notes/notesPurchased.json').success(function(data) {
      $scope.notesPurchased = data;
      $scope.itemCount = data.length;
    });
  }
});
