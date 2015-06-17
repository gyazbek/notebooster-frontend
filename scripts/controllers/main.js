'use strict';

angular.module('angularNoteboosterApp').filter('propsFilter', function() {
  return function(items, props) {
    var out = [];

    if (angular.isArray(items)) {
      items.forEach(function(item) {
        var itemMatches = false;

        var keys = Object.keys(props);
        for (var i = 0; i < keys.length; i++) {
          var prop = keys[i];
          var text = props[prop].toLowerCase();
          if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
            itemMatches = true;
            break;
          }
        }

        if (itemMatches) {
          out.push(item);
        }
      });
    } else {
      // Let the output be the input untouched
      out = items;
    }

    return out;
  };
});

angular.module('angularNoteboosterApp')
  .controller('MainCtrl', function ($http, $state, $scope, $cookies, $location, nbApiService) {

  $scope.searchSchool = function(school) {
    var params = {search: school, page: 1};
    return $http.get(
      'http://23.102.158.243/school',
      {params: params}
    ).then(function(response) {
      $scope.schools = response.data.results;
    });
  };

    $scope.school = {};
    $scope.course = {};

    $scope.searchNotes = function() {
      if (angular.isDefined($scope.school.selected) && Object.keys($scope.school.selected).length > 0 && angular.isDefined($scope.school.selected.id)){
          var schoolId = $scope.school.selected.id;
          var schoolName = $scope.school.selected.name;
          var courseId, courseName;

          if (angular.isDefined($scope.course.selected) && Object.keys($scope.course.selected).length > 0 && angular.isDefined($scope.course.selected.id)){
            courseId = $scope.course.selected.id;
            courseName = $scope.course.selected.name;
          }

          $state.go('app.browse', {"schoolId": schoolId, "schoolName": schoolName, "courseId": courseId, "courseName": courseName});
      } else {
        $scope.chooseSchool = "Must Select School.";
      }
    }

    $scope.schoolSelected = function(item, model) {
      $scope.course = {};
    }

    $scope.searchCourse = function(course) {
      if (angular.isDefined($scope.school.selected) && $scope.school.selected!==null  && angular.isDefined($scope.school.selected.id)){
        var params = {search: course,school: $scope.school.selected.id,page: 1};
        return $http.get(
          'http://23.102.158.243/course',
          {params: params}
        ).then(function(response) {
          $scope.courses = response.data.results
        });
      }
    };

    $scope.login = function(){
      nbApiService.login(prompt('Username'),prompt('password'))
      .then(function(data){
        handleSuccess(data);
      },handleError);
    }

    $scope.logout = function(){
      nbApiService.logout()
      .then(handleSuccess,handleError);
    }

    $scope.resetPassword = function(){
      nbApiService.resetPassword(prompt('Email'))
      .then(handleSuccess,handleError);
    }

    $scope.register = function(){
      nbApiService.register(prompt('Username'),prompt('Password'),prompt('Email'))
      .then(handleSuccess,handleError);
    }

    $scope.verify = function(){
      nbApiService.verify(prompt("Please enter verification code"))
      .then(handleSuccess,handleError);
    }

    $scope.goVerify = function(){
      $location.path("/verifyEmail/"+prompt("Please enter verification code"));
    }

    $scope.changePassword = function(){
      nbApiService.changePassword(prompt("Password"), prompt("Repeat Password"))
      .then(handleSuccess,handleError);
    }

    $scope.profile = function(){
      nbApiService.profile()
      .then(handleSuccess,handleError);
    }

    $scope.updateProfile = function(){
      nbApiService.updateProfile({'first_name': prompt("First Name"), 'last_name': prompt("Last Name"), 'email': prompt("Email")})
      .then(handleSuccess,handleError);
    }

    $scope.confirmReset = function(){
      nbApiService.confirmReset(prompt("Code 1"), prompt("Code 2"), prompt("Password"), prompt("Repeat Password"))
      .then(handleSuccess,handleError);
    }

    $scope.goConfirmReset = function(){
      $location.path("/passwordResetConfirm/"+prompt("Code 1")+"/"+prompt("Code 2"))
    }

    var handleSuccess = function(data){
      $scope.response = data;
    }

    var handleError = function(data){
      $scope.response = data;
    }

    $scope.show_login = true;
    $scope.$on("nbApiService.logged_in", function(data){
      $scope.show_login = false;
    });
    $scope.$on("nbApiService.logged_out", function(data){
      $scope.show_login = true;
    });

    $http.get('http://23.102.158.243:80/organizations/').success(function(data) {
      $scope.organizations = data;
    });




  //   $('.dropdown').data('open', false);



  //   $('.dropdown-toggle').click(function() {

  //       if($('.dropdown').data('open')) {
  //           closeDropdown();
  //       } else {
  //           openDropdown();

  //   }

  //    $('.overlay-trans.visible').click(function() {
  //     if($('.dropdown').data('open')) {
  //             closeDropdown();
  //     }


  //   });




  // });






  });




angular.module('angularNoteboosterApp')
  .controller('DropdownCtrl', function ($http, $state, $scope, $cookies, $location, nbApiService) {


 function openDropdown() {

            $('.dropdown').data('open', true);
        $('.overlay-trans').addClass('visible');

        $('li.notification').fadeOut(0);
        if($(window).width() > 768) {
            $('li.profile').animate({
                width: "260px"
            }, 400, function() {
                $('li.profile>span').fadeIn('slow');
            });
        } else {
            $('li.profile>span').fadeIn('slow');
        }
    }
    function closeDropdown() {
      $('.dropdown').data('open', false);
        $('.overlay-trans').removeClass('visible');

        if($(window).width() > 768) {
            $('li.profile>span').fadeOut('fast', function() {
                $('li.profile').animate({
                    width: "79px"
                }, 400, function() {
                    $('li.notification').fadeIn('fast');
                });
            });
        } else {
            $('li.profile>span').hide();
            $('li.notification').fadeIn('fast');
        }
    }


  $scope.toggled = function(open) {
    if(open){
      openDropdown();
    }else{
      closeDropdown();
    }
  };


});

