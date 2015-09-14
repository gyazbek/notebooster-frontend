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

angular.module('angularNoteboosterApp').controller('MasterCtrl', function($scope, $window, $rootScope, $location, $state, nbApiService, $modal, $log, $timeout, $interval) {

    $scope.siteStats = {}
    $scope.organizationFacts = [];
    $scope.noteFee = 0.99;
    $scope.notificationCountRefreshRate = 120000;
    // Assume user is not logged in until we hear otherwise
    $scope.authenticated = false; //nbApiService.authenticated;
    $scope.refreshNotificationCountDataPromise = null;

    $scope.refreshNotificationCountData = function() {
        
        nbApiService.messageCount().then(function(data) {
            //alert(JSON.stringify(data)); bla bla bla
            $scope.notificationCount = (data.count ? data.count : 0)
        });
    };
    
   
    if (nbApiService.authPromise != null && angular.isDefined(nbApiService.authPromise)) {
        nbApiService.authPromise.then(function(data) {
            $scope.authenticated = true;
            nbApiService.identity().then(function(data) {
                $scope.user = data;
            });

            $scope.refreshNotificationCountDataPromise = $interval($scope.refreshNotificationCountData, $scope.notificationCountRefreshRate);
        });
    }



    // if($scope.authenticated ){
    //   nbApiService.identity().then(function(data){
    //       $scope.user = data;
    //   });
    // }
    // Wait and respond to the logout event.
    $scope.$on('nbApiService.logged_out', function() {

        $scope.authenticated = false;
        $scope.user = {};
       
        if (angular.isDefined($scope.refreshNotificationCountDataPromise)) {
            $timeout.cancel($scope.refreshNotificationCountDataPromise);
            $scope.refreshNotificationCountDataPromise = undefined;
        }
    });
    // Wait and respond to the log in event.
    $scope.$on('nbApiService.logged_in', function() {
        $scope.authenticated = true;
        // nbApiService.identity().then(function(data){
        //   $scope.user = createUserObject(data);
        // });
        nbApiService.identity().then(function(data) {
            $scope.user = data;
        });
        $scope.refreshNotificationCountDataPromise = $interval($scope.refreshNotificationCountData, $scope.notificationCountRefreshRate);
    });
    // // Wait for the status of authentication, set scope var to true if it resolves
    // nbApiService.authenticationStatus(true).then(function(){
    //     $scope.authenticated = true;
    //     nbApiService.identity().then(function(data){
    //       //alert(JSON.stringify(data));
    //       $scope.user = createUserObject(data);
    //       refreshNotificationCountDataPromise =  $timeout(refreshNotificationCountData, 1000);
    //     });
    // },function(data) {
    //   });
    $scope.$on('nbApiService.profile_picture_changed', function() {
        if ($scope.authenticated && angular.isDefined($rootScope.newProfilePic)) {
            $scope.user.profile_picture = $rootScope.newProfilePic;
        }
    });
    // If the user attempts to access a restricted page, redirect them back to the main page.
    $scope.$on('$stateChangeError', function(ev, current, previous, rejection) {
        console.error("Unable to change routes.  Error: ", rejection)

        $rootScope.stateAfterLogin = current.name;
//        $location.path("/");

        $scope.signinModal();
        $state.go('app');
        //  $location.path('/authRequired').replace();
    });

    // global scroll to top when view change so that we include the header in the view
    $scope.$on("$stateChangeSuccess", function (event, currentState, previousState) {
        $window.scrollTo(0, 0);
    });

    $scope.signinModal = function(size) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/partials/signin_modal.html',
            controller: 'LoginCtrl',
            size: size,
            scope:$scope
        });
        modalInstance.result.then(function() {
            //TODO: disable account and log user out
            console.log('disable it');
        }, function(reason) {
            // Modal closed.
            console.log(reason);
        });
    };

    $scope.signupModal = function(size) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/partials/signup_modal.html',
            controller: 'RegisterCtrl',
            size: size,
            scope:$scope
        });
        modalInstance.result.then(function() {
            //TODO: disable account and log user out
            console.log('disable it');
        }, function(reason) {
            // Modal closed.
            console.log(reason);
        });
    };

    nbApiService.siteStats().then(function(data) {
        $scope.siteStats = data;
    });

    nbApiService.organizationFacts().then(function(data) {
        $scope.organizationFacts = data;
    });


    $scope.contactUser = function(username){
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/partials/contact_user_modal.html',
        controller: 'ContactUserCtrl',
        resolve: {
          username: function () {
              return username;
          }
        }
      });

      modalInstance.result.then(function (msgResponse) {
        $scope.msgSentResponse = msgResponse;
      }, function (reason) {
        // Modal closed.
      });
    };

    $scope.report = function(size) {
      $scope.msgSentResponse = "";
      var modalInstance = $modal.open({
        animation: true,
        templateUrl: 'views/partials/report_violation_modal.html',
        controller: 'ReportViolationCtrl',
        size: size,
        resolve: {
          username: function () {
              return $scope.username;
          }
        }
      });

      modalInstance.result.then(function (msgResponse) {
        $scope.msgSentResponse = msgResponse;
      }, function (reason) {
        // Modal closed.
      });
    };

    $scope.getRandomFact = function(){
        if($scope.organizationFacts.length>0){
            return $scope.organizationFacts[Math.floor(Math.random() * $scope.organizationFacts.length)].fact;
        }else{
            return "When snakes are born with two heads, they fight each other for food.";
        }
    }

    $scope.whatsthis = function(descriptor,size) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: 'views/partials/'+ descriptor +'_modal.html',
            controller: 'WhatsThisCtrl',
            size: size
        });
    };
});

angular.module('angularNoteboosterApp').controller('DropdownCtrl', function($http, $state, $scope, $cookies, $location, nbApiService) {
    function openDropdown() {
        $('.dropdown').data('open', true);
        $('.overlay-trans').addClass('visible');
        $('li.notification').fadeOut(0);
        if ($(window).width() > 768) {
            $('li.profile').animate({
                width: "260px"
            }, 400, function() {
                $('li.profile .user-info').fadeIn('slow');
            });
        } else {
            $('li.profile .user-info').fadeIn('slow');
        }
    }

    function closeDropdown() {
        $('.dropdown').data('open', false);
        $('.overlay-trans').removeClass('visible');
        if ($(window).width() > 768) {
            $('li.profile .user-info').fadeOut('fast', function() {
                $('li.profile').animate({
                    width: "79px"
                }, 400, function() {
                    $('li.notification').fadeIn('fast');
                });
            });
        } else {
            $('li.profile>span').hide();
            $('li.profile .user-info').hide();
            $('li.notification').fadeIn('fast');
        }
    }
    $scope.toggled = function(open) {
        if (open) {
            openDropdown();
        } else {
            closeDropdown();
        }
    };
});