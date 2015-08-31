'use strict';

angular.module('angularNoteboosterApp')
  .controller('RegisterCtrl', function ($scope, $rootScope, $state, nbApiService, $http,$modalInstance) {
  	$scope.model = {'username':'','password1':'','password2':'','email':''};


    $scope.school = {};
  
    $scope.register = function(formData){
      $scope.errors = [];
      //Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        if (angular.isDefined($scope.school.selected) && Object.keys($scope.school.selected).length > 0 && angular.isDefined($scope.school.selected.id)){
          $scope.profileModel = {'school_id':$scope.school.selected.id, 'user_type':'STUDENT'};
           var moreData = {};
            moreData = angular.extend(moreData, {
                'profile': $scope.profileModel,
            });

          $scope.signupPromise = nbApiService.register($scope.model.username,$scope.model.password1,$scope.model.password2,$scope.model.email,moreData )
          .then(function(data){
          	// success case
            nbApiService.login($scope.model.username, $scope.model.password1)
            .then(function(data){
              // success case
              //$location.path("/");
              $modalInstance.close();
                if(angular.isDefined($rootScope.stateAfterLogin)){
                  $state.go($rootScope.stateAfterLogin);
                  delete $rootScope.stateAfterLogin;
                }else{
                    $state.go($state.current, {}, {reload: true});
                }
                  $modalInstance.close();
                },function(data){
                $modalInstance.close();
             });
            
          },function(data){
          	// error case
          	$scope.errors = data.data;
          }); 
        } else {
            $scope.chooseSchool = "Must Select School.";
        }
      }
    }



      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.checkPasswordMatch = function(){
      $scope.isNotPasswordMatch = ($scope.model.password1 == $scope.model.password2) ? false: true;
      console.log($scope.isNotPasswordMatch);
    }

    $scope.searchSchool = function(school) {
      var params = {search: school, page: 1};      
      nbApiService.getSchools(params)
        .then(function(data){
         // success case
         $scope.schools = data.results;
        },function(data){
          // error case
          $scope.errors = data.data;
      });
    }
  });
