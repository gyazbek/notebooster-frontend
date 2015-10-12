'use strict';

angular.module('angularNoteboosterApp').controller('GoalCalculatorCtrl', function($scope) {
	$scope.calc_donation_total = 300;
	$scope.calc_note_price = 5;
	$scope.calc_donation_split = 24;

	$scope.salesRequired = function() { return $scope.calc_donation_total / ($scope.calc_note_price * ($scope.calc_donation_split/100)) };
});