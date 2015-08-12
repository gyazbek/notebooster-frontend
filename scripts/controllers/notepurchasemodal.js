'use strict';

angular.module('angularNoteboosterApp')
  .controller('PurchaseNoteModalCtrl', function ($scope, $location,$state, nbApiService, Validate,$modalInstance,note) {

    $scope.note = note;
     $scope.isCollapsed = true;

      $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };



 
$scope.totalAmount = function() { return +$scope.note.price + ($scope.extraDonation ?  +$scope.extraDonation : 0) };
$scope.charityAmount = function() { return $scope.note.price ? (+$scope.note.charity_split/100) * +$scope.note.price + ($scope.extraDonation ?  +$scope.extraDonation : 0) : 0 };
// //setup the PayPal digital goods flow
var embeddedPPFlow = new PAYPAL.apps.DGFlow({trigger: null});

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

    $scope.initiatePurchase = function(){

      var sendData = {};
      if($scope.extraDonation && isNumber($scope.extraDonation)){
        sendData = {'additionalDonation':$scope.extraDonation};
      }

      $scope.purchaseDetailPromise = nbApiService.initialNotePurchase(note.id, sendData)
      .then(function(data){
        // success case
        $scope.initialPurchaseData = data;
        if($scope.initialPurchaseData.url && $scope.initialPurchaseData.url.length > 1){
          window.location.href = $scope.initialPurchaseData.url;
        }

        if($scope.initialPurchaseData.key && $scope.initialPurchaseData.key.length > 1){
            // var flowUrl = 'https://www.sandbox.paypal.com/webapps/adaptivepayment/flow/pay?paykey=' + $scope.initialPurchaseData.key;
            // embeddedPPFlow.startFlow( flowUrl );
        }
        
      },function(data){
        // error case
        if(data.status && data.status == 409){
          alert("It appears that you already own this note. If this is in error please contact us");
        }

        //$scope.errors= data;
      });  
    }

// //direct the dialog box for our digital goods pay flow to the correct place



// $scope.purchaseDetailPromise = nbApiService.getNotePaymentDetails(note.id)
//       .then(function(data){
//         $scope.notePaymentDetails = data;
 
//       },function(data){
//         // error case
//         $scope.errors = data;
//       });  

  });
