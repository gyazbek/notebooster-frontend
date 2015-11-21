'use strict';

angular.module('angularNoteboosterApp').controller('GoalCalculatorCtrl', function($scope) {
	$scope.calc_donation_total = 2000;
	$scope.calc_note_price = 10;
	$scope.calc_donation_split = 50;

	$scope.salesRequired = function() { return $scope.calc_donation_total / ($scope.calc_note_price * ($scope.calc_donation_split/100)) };

	$scope.calc_avg_note_sales = 12;
	$scope.uploadsRequired = function () { return $scope.salesRequired() / $scope.calc_avg_note_sales };

});