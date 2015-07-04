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
angular.module('angularNoteboosterApp').controller('MasterCtrl', function($scope, $rootScope, $location, $state, nbApiService, $modal, $log, $timeout) {
    var refreshNotificationCountData = function() {
        nbApiService.messageCount().then(function(data) {
            //alert(JSON.stringify(data));
            $scope.notificationCount = (data.count ? data.count : 0)
        });
    };
    var refreshNotificationCountDataPromise = null;
    // Assume user is not logged in until we hear otherwise

    $scope.authenticated = false; //nbApiService.authenticated;

    if (nbApiService.authPromise != null && angular.isDefined(nbApiService.authPromise)) {
        nbApiService.authPromise.then(function(data) {
            $scope.authenticated = true;
            nbApiService.identity().then(function(data) {
                $scope.user = data;
            });
            refreshNotificationCountDataPromise = $timeout(refreshNotificationCountData, 1000);
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
        if (angular.isDefined(refreshNotificationCountDataPromise)) {
            $timeout.cancel(refreshNotificationCountDataPromise);
            refreshNotificationCountDataPromise = undefined;
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
    $scope.signinModal = function(size) {
        var modalInstance = $modal.open({
            animation: true,
            templateUrl: '/views/partials/signin_modal.html',
            controller: 'LoginCtrl',
            size: size
        });
        modalInstance.result.then(function() {
            //TODO: disable account and log user out
            console.log('disable it');
        }, function(reason) {
            // Modal closed.
            console.log(reason);
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
                $('li.profile>span').fadeIn('slow');
            });
        } else {
            $('li.profile>span').fadeIn('slow');
        }
    }

    function closeDropdown() {
        $('.dropdown').data('open', false);
        $('.overlay-trans').removeClass('visible');
        if ($(window).width() > 768) {
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
        if (open) {
            openDropdown();
        } else {
            closeDropdown();
        }
    };
});