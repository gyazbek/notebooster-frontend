'use strict';
angular.module('angularNoteboosterApp', [
  'ui.router',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.select',
  'ui.bootstrap'
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
        controller: 'AboutCtrl',
        templateUrl: 'views/about.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus(true);
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
  .state('app.browse', {
    url: 'browse?schoolId&schoolName&courseId&courseName',
    views: {
      'content@': {
        controller: 'BrowseCtrl',
        templateUrl: 'views/browse.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
  .state('app.note-details', {
    url: 'note-details?noteId',
    views: {
      'content@': {
        controller: 'NoteDetailsCtrl',
        templateUrl: 'views/notedetails.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
  .state('app.payment-settings', {
    url: 'payment-settings',
    views: {
      'content@': {
        controller: 'PaymentSettingsCtrl',
        templateUrl: 'views/payment-settings.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
  .state('app.new-note', {
    url: 'new-note',
    views: {
      'content@': {
        controller: 'NewNoteCtrl',
        templateUrl: 'views/new-note.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
  .state('app.notes-forsale', {
    url: 'notes-forsale',
    views: {
      'content@': {
        controller: 'NotesForSaleCtrl',
        templateUrl: 'views/notes-forsale.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
  .state('app.notes-purchased', {
    url: 'notes-purchased',
    views: {
      'content@': {
        controller: 'NotesPurchasedCtrl',
        templateUrl: 'views/notes-purchased.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
  .state('app.watch-list', {
    url: 'watch-list',
    views: {
      'content@': {
        controller: 'WatchlistCtrl',
        templateUrl: 'views/watch-list.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
  .state('app.messages', {
    url: 'messages',
    views: {
      'content@': {
        controller: 'MessagesCtrl',
        templateUrl: 'views/messages.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
   .state('app.messagethread', {
    url: 'messages/{threadId}',
    views: {
      'content@': {
        controller: 'MessagesThreadCtrl',
        templateUrl: 'views/messages-detail.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
    .state('app.viewprofile', {
    url: 'user/{username}',
    views: {
      'content@': {
        controller: 'MessagesCtrl', //Create new controller for viewing profile
        templateUrl: 'views/user-profile.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })    
    .state('app.vieworganization', {
    url: 'organization/{username}', // I might use a slug based of the organization name, i'll let you know
    views: {
      'content@': {
        controller: 'MessagesCtrl', //Create new controller for viewing organization profile
        templateUrl: 'views/organization-profile.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
  .state('app.profile-settings', {
    url: 'profile-settings',
    views: {
      'content@': {
        controller: 'ProfileSettingsCtrl',
        templateUrl: 'views/profile-settings.html'
      }
    },
    resolve: {
      authenticated: ['nbApiService', function(nbApiService){
        return nbApiService.authenticationStatus();
      }],
    }
  })
  .state('app.password-settings', {
    url: 'password-settings',
    views: {
      'content@': {
        controller: 'PasswordSettingsCtrl',
        templateUrl: 'views/password-settings.html'
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
