angular.module('angularNoteboosterApp')
.controller('NewMsgCtrl', function ($scope,$modalInstance,nbApiService) {
  $scope.to = "";
  $scope.subject = "";
  $scope.msg = "";

  $scope.send = function () {
    nbApiService.sendMsg($scope.to, $scope.subject, $scope.msg)
    .then(function(data) {
      console.log("success")
      console.log(data);
    },function(data){
      console.log("error");
      console.log(data);
    });
    console.log('sent');
    // $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('canel');
  };
});
