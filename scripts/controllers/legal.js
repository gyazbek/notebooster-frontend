'use strict';

angular.module('angularNoteboosterApp').controller('LegalCtrl', function($scope, $location, $anchorScroll) {
   $scope.scrollTo = function(id) {
      $location.hash(id);
      $anchorScroll();
   }
});