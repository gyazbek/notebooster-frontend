'use strict';

angular.module('angularNoteboosterApp')
  .controller('RegisterCtrl', function ($scope, nbApiService, Validate, $http,$modalInstance) {
  	$scope.model = {'username':'','password1':'','password2':'','email':''};


 
    $scope.school = {};
  	$scope.complete = false;
    $scope.register = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        if (angular.isDefined($scope.school.selected) && Object.keys($scope.school.selected).length > 0 && angular.isDefined($scope.school.selected.id)){
          $scope.profileModel = {'school_id':$scope.school.selected.id, 'user_type':'STUDENT'};
           var moreData = {};
            moreData = angular.extend(moreData, {
                'profile': $scope.profileModel,
            });

          nbApiService.register($scope.model.username,$scope.model.password1,$scope.model.password2,$scope.model.email,moreData )
          .then(function(data){
          	// success case
          	$scope.complete = true;
            $modalInstance.close();
          },function(data){
          	// error case
          	$scope.errors = data;
          }); 
        } else {
            $scope.chooseSchool = "Must Select School.";
        }
      }
    }

    $scope.signupForm = function() {
      console.log('signed up.');
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
          $scope.errors = data;
      });
    }
  });
