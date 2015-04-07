'use strict';

/* Controllers */
var noteboosterApp = angular.module('noteboosterApp', []);

noteboosterApp.controller('HelloNoteboosterCtrl', function($scope) {
	$scope.hello = 'One small step for Nino, one giant leap for NoteBooster!';
});
