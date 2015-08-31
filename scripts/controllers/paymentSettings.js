'use strict';

angular.module('angularNoteboosterApp')
  .controller('PaymentSettingsCtrl', function ($scope,nbApiService) {
    $scope.paypal_email="";

    $scope.saveSettings = function(email){
      $scope.paymentPromise = nbApiService.setPaymentSettings(email)
      .then(function(data){
      	console.log('Success');
      },function(data){
      	console.log('Failed');
      });
    };

    $scope.getPaypalEmail = function(){
      $scope.paymentPromise =  nbApiService.profile()
      .then(function(data){
        $scope.paypal_email = data.profile.paypal_email;
      },function(data){

        });
    };

    init();
    function init(){
      $scope.getPaypalEmail();
    };
  });
