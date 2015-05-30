'use strict';

angular.module('angularNoteboosterApp')
  .controller('RegisterCtrl', function ($scope, nbApiService, Validate, $http) {
  	$scope.model = {'username':'','password1':'','password2':'','email':'', 'schooId':''};
    $scope.school = {};
  	$scope.complete = false;
    $scope.register = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
        if (angular.isDefined($scope.school.selected) && Object.keys($scope.school.selected).length > 0 && angular.isDefined($scope.school.selected.id)){
          nbApiService.register($scope.model.username,$scope.model.password1,$scope.model.password2,$scope.model.email, $scope.school.selected.id)
          .then(function(data){
          	// success case
          	$scope.complete = true;
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

    $scope.checkPasswordMatch = function(){
      $scope.isNotPasswordMatch = ($scope.model.password1 == $scope.model.password2) ? false: true;
      console.log($scope.isNotPasswordMatch);
    }

    $scope.searchSchool = function(school) {
      var params = {search: school, page: 1};
      return $http.get(
        'http://23.102.158.243/school',
        {params: params}
      ).then(function(response) {
        $scope.schools = response.data.results;
      });
    }
  });
