'use strict';

angular.module('angularNoteboosterApp')
.controller('WatchlistCtrl', function ($scope,$http) {
  init();

  function init(){
    $http.get('app/watchlist/watchlist.json').success(function(data) {
      $scope.results = data;
      $scope.itemCount = data.length;
    });
  }
});
// .controller('WatchlistCtrl', function ($scope,$stateParams, nbApiService, Validate) {
//   $scope.model = {'email':'', 'message':'', 'name':'', 'subject':''};
//   $scope.complete = false;

//   if(typeof $stateParams.noteId !== 'undefined') {
//     alert('note id is here');
//   }

//   nbApiService.browseNotes( '','')
//   .then(function(data){
//     // success case
//     $scope.complete = true;
//     $scope.results = data.results;
//   }, function(data){
//     // error case
//     $scope.errors = data;
//   });
