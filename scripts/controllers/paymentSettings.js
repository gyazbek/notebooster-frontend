'use strict';

angular.module('angularNoteboosterApp')
  .controller('PaymentSettingsCtrl', function ($scope, nbApiService, Validate) {
    $scope.paypal_email="";

    $scope.saveSettings = function(email){
      console.log('Email saved.');
    };
  });
