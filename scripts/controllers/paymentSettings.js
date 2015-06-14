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

    $scope.getPaypalEmail = function(){
      nbApiService.profile()
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
