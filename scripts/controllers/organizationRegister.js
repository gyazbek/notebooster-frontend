'use strict';

angular.module('angularNoteboosterApp')
  .controller('OrganizationRegisterCtrl', function ($scope,$modal,nbApiService,Validate) {

    $scope.eulaCheck = false;



  	$scope.whatsthis = function(descriptor,size) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/views/partials/'+ descriptor +'_modal.html',
			controller: 'WhatsThisCtrl',
			size: size
		});
	};

    $scope.model = {'username':'','password1':'','password2':'','email':''};
    $scope.organizationModel = {'name':'','contact_email':'','contact_person':'','fact':'', 'tax_exemption_number' : ''};
    $scope.profileModel = {'paypal_email':'', 'short_bio': '', 'bio':'', 'user_type':'ORGANIZATION'};

    $scope.complete = false;
    $scope.register = function(formData){
      $scope.errors = [];
      Validate.form_validation(formData,$scope.errors);
      if(!formData.$invalid){
            
            var moreData = {};
            moreData = angular.extend(moreData, {
                'profile': $scope.profileModel,
                'organization': $scope.organizationModel,
            });


          nbApiService.register($scope.model.username,$scope.model.password1,$scope.model.password2,$scope.model.email, moreData)
          .then(function(data){
            // success case
            $scope.complete = true;
          },function(data){
            // error case
            $scope.errors = data;
          }); 
    

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