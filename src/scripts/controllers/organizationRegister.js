'use strict';

angular.module('angularNoteboosterApp')
  .controller('OrganizationRegisterCtrl', function ($scope,$state,$modal,nbApiService) {

    $scope.eulaCheck = false;
    $scope.model = {'username':'','password1':'','password2':'','email':''};
    $scope.organizationModel = {'name':'','contact_email':'','contact_person':'','fact':'', 'tax_exemption_number' : ''};
    $scope.profileModel = {'paypal_email':'', 'short_bio': '', 'bio':'', 'user_type':'ORGANIZATION'};

    $scope.complete = false;
    $scope.register = function(formData){
     
      if(!formData.$invalid){
            
            var moreData = {};
            moreData = angular.extend(moreData, {
                'profile': $scope.profileModel,
                'organization': $scope.organizationModel,
            });


         $scope.orgSignupPromise = nbApiService.register($scope.model.username,$scope.model.password1,$scope.model.password2,$scope.model.email, moreData)
          .then(function(data){
            // success case
            $scope.complete = true;

             $state.go('app.organization-register.confirmation');
          },function(data){
            // error case
            $scope.errors = data.data;
            window.scrollTo(0, 0);
          }); 
    

      }else{
        $scope.registerForm.submitted = true;
      }
    }

    $scope.signupForm = function() {
      console.log('signed up.');
    }

    $scope.checkPasswordMatch = function(){
      $scope.isNotPasswordMatch = ($scope.model.password1 == $scope.model.password2) ? false: true;
      console.log($scope.isNotPasswordMatch);
    }

  });