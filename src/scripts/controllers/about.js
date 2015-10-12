'use strict';

angular.module('angularNoteboosterApp').controller('AboutCtrl', function($scope, $http){
  $http.get('json/about_items/aboutItems.json').success(function(data) {
    $scope.aboutItems = data;
  });
});