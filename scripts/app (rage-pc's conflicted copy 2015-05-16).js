'use strict';

angular.module('angularNoteboosterApp', [
  'ui.router',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.select'
  
])

.config(function($stateProvider, $urlRouterProvider){

//  .config(['$routeProvider', function ($routeProvider) {



    $stateProvider.state('users', {
  url: '/users',
  templateUrl: 'views/users.html'
});

     $urlRouterProvider.otherwise('/');
 
 


    $stateProvider
      .state('app', {
         url: '/',

         views: {
            'header': {
                templateUrl: 'views/header.html'
            },
            'content': {
                controller: 'MainCtrl',
                templateUrl: 'views/main.html'
            },
            'footer': {
                templateUrl: 'views/footer.html'
            }
        },
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })

        .state('app.about', {
         url: 'about',
         views: {
            'content@': {
                
                templateUrl: 'views/about.html'
            }
        },
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })

     .state('app.contact', {
         url: 'contact',
         views: {
            'content@': {
                controller: 'ContactCtrl',
                templateUrl: 'views/contact.html'
            }
        },
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })

          .state('app.legal', {
         url: 'legal',
         views: {
            'content@': {
                controller: 'LegalCtrl',
                templateUrl: 'views/legal.html'
            }
        },
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })

                    .state('app.faq', {
         url: 'faq',
         views: {
            'content@': {
                controller: 'FaqCtrl',
                templateUrl: 'views/faq.html'
            }
        },
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })

                    .state('app.organization-partnerships', {
         url: 'organization-partnerships',
         views: {
            'content@': {
                controller: 'OrganizationPartnershipsCtrl',
                templateUrl: 'views/organization-partnerships.html'
            }
        },
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })

      .state('register', {
         url: '/register',
        templateUrl: 'views/register.html',
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })
      .state('passwordReset', {
           url: '/passwordReset',
        templateUrl: 'views/passwordreset.html',
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })
      .state('passwordResetConfirm', {
           url: '/passwordResetConfirm/:firstToken/:passwordResetToken',
        templateUrl: 'views/passwordresetconfirm.html',
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })
      .state('login', {
           url: '/login',
        templateUrl: 'views/login.html',
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })
      .state('verifyEmail/:emailVerificationToken', {
           url: '/verifyEmail/:emailVerificationToken',
        templateUrl: 'views/verifyemail.html',
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })
      .state('logout', {
           url: '/logout',
        templateUrl: 'views/logout.html',
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })
      .state('userProfile', {
           url: '/userProfile',
        templateUrl: 'views/userprofile.html',
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })
      .state('passwordChange', {
           url: '/passwordChange',
        templateUrl: 'views/passwordchange.html',
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })
      .state('restricted', {
           url: '/restricted',
        templateUrl: 'views/restricted.html',
        controller: 'RestrictedCtrl',
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus();
          }],
        }
      })
      .state('authRequired', {
           url: '/authRequired',
        templateUrl: 'views/authrequired.html',
        controller: 'AuthrequiredCtrl',
        resolve: {
          authenticated: ['nbApiService', function(nbApiService){
            return nbApiService.authenticationStatus(true);
          }],
        }
      }).state("modals", {
      views:{
        "signin": {
          templateUrl: "modals/signin.html"
        }
      },
      abstract: true
    });
   
  })
  .run(function(nbApiService){
   
    nbApiService.initialize('http://23.102.158.243', false);
  });