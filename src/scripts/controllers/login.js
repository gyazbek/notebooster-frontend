'use strict';

angular.module('angularNoteboosterApp')
  .controller('LoginCtrl', function ($scope, $rootScope,$location,$state, nbApiService,$modalInstance) {
    $scope.model = {'username':'','password':''};
  	$scope.complete = false;
    $scope.login = function(formData){
      $scope.errors = [];
      //Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
       $scope.loginPromise = nbApiService.login($scope.model.username, $scope.model.password)
        .then(function(data){
        	// success case
        	//$location.path("/");
          $modalInstance.close();
          if(angular.isDefined($rootScope.stateAfterLogin)){
            $state.go($rootScope.stateAfterLogin,$rootScope.stateParamsAfterLogin);

            delete $rootScope.stateAfterLogin;
            delete $rootScope.stateParamsAfterLogin;
          }else{
            if($scope.user.account_type == 'organization'){
              $state.go('app.settings.organization-donations');
            }else{
              $state.go($state.current, {}, {reload: true});
            }
          }
          
        },function(data){
        	// error case
        	$scope.errors = data.data;
        });
      }
    }

    $scope.cancel = function () {
      delete $rootScope.stateAfterLogin;
      $modalInstance.dismiss('cancel');
  };

    $modalInstance.result.then(function () {
     
    }, function () {
      delete $rootScope.stateAfterLogin;
    });


  });
