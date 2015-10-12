'use strict';

angular.module('angularNoteboosterApp')
.controller('FaqCtrl', function($scope, $http){
	$scope.oneAtATime = true;
	$(".accordion").collapse();
});