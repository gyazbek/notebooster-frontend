'use strict';
angular.module('angularNoteboosterApp', ['ui.router', 'ngCookies', 'ngResource', 'ngSanitize', 'ui.select', 'ui.bootstrap', 'angularFileUpload', 'cgBusy']).
config(function($stateProvider, $urlRouterProvider) {
    //  .config(['$routeProvider', function ($routeProvider) {
    $stateProvider.state('users', {
        url: '/users',
        templateUrl: 'views/users.html'
    });
    $urlRouterProvider.otherwise('/');
    $stateProvider.state('app', {
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
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.about', {
        url: 'about',
        views: {
            'content@': {
                controller: 'AboutCtrl',
                templateUrl: 'views/about.html'
            }
        }
    }).state('app.contact', {
        url: 'contact',
        views: {
            'content@': {
                controller: 'ContactCtrl',
                templateUrl: 'views/contact.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.browse', {
        url: 'browse?schoolId&schoolName&courseId&courseName',
        views: {
            'content@': {
                controller: 'BrowseCtrl',
                templateUrl: 'views/browse.html'
            }
        },
          params: {school: null, course: null},
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.note-details', {
        url: 'note-details?noteId',
        views: {
            'content@': {
                controller: 'NoteDetailsCtrl',
                templateUrl: 'views/notedetails.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.settings', {
        views: {
            'content@': {
                templateUrl: 'views/settings-template.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.settings.payment', {
        url: 'payment-settings',
        views: {
            'settings-content@app.settings': {
                controller: 'PaymentSettingsCtrl',
                templateUrl: 'views/payment-settings.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.settings.notes-purchased', {
        url: 'notes-purchased',
        views: {
            'settings-content@app.settings': {
                controller: 'NotesPurchasedCtrl',
                templateUrl: 'views/notes-purchased.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.settings.watch-list', {
        url: 'watch-list',
        views: {
            'settings-content@app.settings': {
                controller: 'WatchlistCtrl',
                templateUrl: 'views/watch-list.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.settings.messages', {
        url: 'messages',
        views: {
            'settings-content@app.settings': {
                controller: 'MessagesCtrl',
                templateUrl: 'views/messages.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus(true);
            }],
        }
    }).state('app.settings.messagethread', {
        url: 'messages/{threadId}',
        views: {
            'settings-content@app.settings': {
                controller: 'MessagesThreadCtrl',
                templateUrl: 'views/messages-detail.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.settings.notes-forsale', {
        url: 'notes-forsale',
        views: {
            'settings-content@app.settings': {
                controller: 'NotesForSaleCtrl',
                templateUrl: 'views/notes-forsale.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.settings.profile-settings', {
        url: 'profile-settings',
        views: {
            'settings-content@app.settings': {
                controller: 'ProfileSettingsCtrl',
                templateUrl: 'views/profile-settings.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.settings.password-settings', {
        url: 'password-settings',
        views: {
            'settings-content@app.settings': {
                controller: 'PasswordSettingsCtrl',
                templateUrl: 'views/password-settings.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.settings.organization-donations', {
        url: 'organization-donations',
        views: {
            'settings-content@app.settings': {
                controller: 'OrganizationDonationsCtrl',
                templateUrl: 'views/organization-donations.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.settings.organization-profile-settings', {
        url: 'organization-profile-settings',
        views: {
            'settings-content@app.settings': {
                controller: 'OrganizationProfileSettingsCtrl',
                templateUrl: 'views/organization-profile-settings.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.new-note', {
        url: 'new-note',
        views: {
            'content@': {
                controller: 'NewNoteCtrl',
                templateUrl: 'views/new-note.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus(true);
            }],
        }
    }).state('app.update-note', {
        url: 'update-note?noteId',
        views: {
            'content@': {
                controller: 'UpdateNoteCtrl',
                templateUrl: 'views/update-note.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.viewprofile', {
        url: 'profile/user/{username}',
        views: {
            'content@': {
                controller: 'UserprofileCtrl',
                templateUrl: 'views/user-profile.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.vieworganization', {
        url: 'organization/{username}',
        views: {
            'content@': {
                controller: 'OrganizationProfileCtrl',
                templateUrl: 'views/organization-profile.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.legal', {
        url: 'legal',
        views: {
            'content@': {
                controller: 'LegalCtrl',
                templateUrl: 'views/legal.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.faq', {
        url: 'faq',
        views: {
            'content@': {
                controller: 'FaqCtrl',
                templateUrl: 'views/faq.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.organization-partnerships', {
        url: 'organization-partnerships',
        views: {
            'content@': {
                controller: 'OrganizationPartnershipsCtrl',
                templateUrl: 'views/organization-partnerships.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.organization-register', {
        url: 'organization-register',
        views: {
            'content@': {
                controller: 'OrganizationRegisterCtrl',
                templateUrl: 'views/organization-signup.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.organization-register.confirmation', {
        views: {
            'content@': {
                templateUrl: 'views/organization-signup-confirmation.html'
            }
        },
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('register', {
        url: '/register',
        templateUrl: 'views/register.html',
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.passwordReset', {
        url: '/passwordReset',
        templateUrl: 'views/passwordreset.html',
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state('app.passwordResetConfirm', {
        url: '/passwordResetConfirm/:firstToken/:passwordResetToken',
        templateUrl: 'views/passwordresetconfirm.html',
        resolve: {
            authenticated: ['nbApiService', function(nbApiService) {
                return nbApiService.authenticationStatus();
            }],
        }
    }).state("modals", {
        views: {
            "signin": {
                templateUrl: "modals/signin.html"
            }
        },
        abstract: true
    });
}).run(function($state, $stateParams, $rootScope, nbApiService) {

	nbApiService.initialize('https://notebooster.com/api', false).then(function(data) {

    //nbApiService.initialize('http://localhost:8000', false).then(function(data) {
        // nbApiService.identity().then(function(data){$rootScope.user = data;
        // });
    });
    //nbApiService.initialize('https://notebooster.com/api', false);
}).directive('ngEnter', function() {
    return function(scope, element, attrs) {
        element.bind("keydown keypress", function(event) {
            if (event.which === 13) {
                scope.$apply(function() {
                    scope.$eval(attrs.ngEnter);
                });
                event.preventDefault();
            }
        });
    };
});