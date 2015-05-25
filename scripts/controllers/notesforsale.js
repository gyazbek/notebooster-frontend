'use strict';

angular.module('angularNoteboosterApp')
.controller('NotesForSaleCtrl', function ($scope,$http) {
  init();

  function init(){
    $http.get('app/notes/notesPurchased.json').success(function(data) {
      $scope.notes = data;
      $scope.itemCount = data.length;
    });
  };

// .controller('NotesForSaleCtrl', function ($scope,$stateParams, nbApiService, Validate) {
  // $scope.model = {'email':'', 'message':'', 'name':'', 'subject':''};
  // $scope.complete = false;

  // if(typeof $stateParams.noteId !== 'undefined') {
  //   alert('note id is here');
  // }

  // nbApiService.browseNotes( '','')
  // .then(function(data){
  //         // success case
  //         $scope.complete = true;
  //         $scope.results = data.results;
  //       },function(data){
  //         // error case
  //         $scope.errors = data;
  //       });
});
