'use strict';

angular.module('angularNoteboosterApp')
  .controller('PaymentSettingsCtrl', function ($scope,nbApiService,Validate) {
    $scope.paypal_email="";

    $scope.saveSettings = function(email){
      nbApiService.setPaymentSettings(email)
      .then(function(data){
      	console.log('Success');
      },function(data){
      	console.log('Failed');
      });
    };
  });
