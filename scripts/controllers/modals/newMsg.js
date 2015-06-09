angular.module('angularNoteboosterApp')
.controller('NewMsgCtrl', function ($scope,$modalInstance,nbApiService) {
  $scope.to = "";
  $scope.subject = "";
  $scope.msg = "";

  $scope.send = function () {
    nbApiService.sendMsg($scope.to, $scope.subject, $scope.msg)
    .then(function(data) {
      $scope.msgSentResponse = 'Success';
      $modalInstance.close($scope.msgSentResponse);
    },function(data){
      $scope.msgSentResponse = 'Failed';
      $modalInstance.close($scope.msgSentResponse);
    });
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
