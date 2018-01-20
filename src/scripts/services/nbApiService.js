'use strict';
angular.module('angularNoteboosterApp').service('nbApiService', function nbApiService($q, $http, $cookies, $rootScope) {
    // Intended to use as a Singleton
    var service = {
        'API_URL': '',
        // Set use_session to true to use Django sessions to store security token.
        // Set use_session to false to store the security token locally and transmit it as a custom header.
        'use_session': false,
        'authenticated': null,
        'authPromise': null,
        '_identity': undefined,
        'request': function(args) {
            params = args.params || {}
            args = args || {};
            var deferred = $q.defer(),
                url = this.API_URL + args.url,
                method = args.method || "GET",
                params = params,
                angularCache = (typeof args.cache !== 'undefined' ? args.cache : false),
                data = args.data || {},
                fresh = (typeof args.fresh !== 'undefined' ? args.fresh :  false),
                useAuthToken = (typeof args.useAuthToken !== 'undefined' ? args.useAuthToken : true);
                

            // Let's retrieve the token from the cookie, if available
            if (useAuthToken && $cookies.token) {
                $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
            }else if($http.defaults.headers.common.Authorization){
            	delete $http.defaults.headers.common.Authorization;
            }



            var headersSend = {
                    'X-CSRFToken': $cookies['csrftoken']
                };

             if(fresh){
       
            	headersSend = angular.extend(headersSend, {
                "Pragma": "no-cache",
                "Expires": -1,
                "Cache-Control": "no-cache"
            	});

            }

            if(typeof args.extraHeader !== 'undefined'){
                headersSend = angular.extend(headersSend, args.extraHeader);
            }

            // Fire the request, as configured.
            $http({
                cache: angularCache,
                url: url,
                withCredentials: this.use_session,
                method: method.toUpperCase(),
                headers: headersSend,
                params: params,
                data: data
            }).success(angular.bind(this, function(data, status, headers, config) {
                deferred.resolve(data, status);
            })).error(angular.bind(this, function(data, status, headers, config) {
                console.log("error syncing with: " + url);

                
                var reason = {};       
                reason.status = status;

                if (status == 0) {
                    if (data == "") {
                        data = {};
                        data['status'] = 0;
                        data['non_field_errors'] = ["Could not connect. Please try again."];
                    }
                    // or if the data is null, then there was a timeout.
                    if (data == null) {
                        // Inject a non field error alerting the user
                        // that there's been a timeout error.
                        data = {};
                        data['status'] = 0;
                        data['non_field_errors'] = ["Server timed out. Please try again."];
                    }
                }
                reason.data = data;
        
                deferred.reject(reason, status, headers, config);
            }));
            return deferred.promise;
        },
        'register': function(username, password1, password2, email, more) {
            var data = {
                'username': username,
                'password1': password1,
                'password2': password2,
                'email': email
            }
            data = angular.extend(data, more);
            return this.request({
                'method': "POST",
                'url': "/user/signup",
                'data': data
            });
        },
        'login': function(username, password) {
            var nbApiService = this;
            return this.request({
                'method': "POST",
                'url': "/rest-auth/login/",
                'data': {
                    'username': username,
                    'password': password
                }
            }).then(function(data) { // todo check if token was passed back to us from the server
                if (!nbApiService.use_session) {
                    $http.defaults.headers.common.Authorization = 'Token ' + data.key;
                    $cookies.token = data.key;
                }
                nbApiService.authenticated = true;
                return nbApiService.authenticationStatus(true, true);
            }).then(function(data) {
                $rootScope.$broadcast("nbApiService.logged_in");
            });
        },
        'socialLogin': function(provider, token) {
            var nbApiService = this;
            return this.request({
                'method': "POST",
                'url': "/rest-auth/" + provider + "/",
                'data': {
                    'access_token': token
                }
            }).then(function(data) {
                if (!nbApiService.use_session) {
                    $http.defaults.headers.common.Authorization = 'Token ' + data.key;
                    $cookies.token = data.key;
                }
                nbApiService.authenticated = true;
                return nbApiService.authenticationStatus(true, true);
            }).then(function(data) {
                $rootScope.$broadcast("nbApiService.logged_in");
            });
        },
        'logout': function() {
            var nbApiService = this;
            var logoutRequest = this.request({
                'method': "POST",
                'url': "/rest-auth/logout/"
            });
            this.authPromise = null;
            this._identity = undefined;

            delete $http.defaults.headers.common.Authorization;
            delete $cookies.token;
            nbApiService.authenticated = false;
            $rootScope.$broadcast("nbApiService.logged_out");
            return logoutRequest;
        },
        'identity': function(force) {
            var deferred = $q.defer();
            if (angular.isDefined(this._identity)) {
                nbApiService.authenticated = true;
                var newObj = {};
                var data = this._identity;
                if (data.id) newObj.id = data.id;
                if (data.username) newObj.username = data.username;
                if (data.email) newObj.email = data.email;
                if (data.profile){
                    if (data.profile.profile_picture) newObj.profile_picture = data.profile.profile_picture;
                    if (data.profile.user_type) {
                        newObj.account_type = data.profile.user_type.toLowerCase();
                    } else {
                        newObj.account_type = 'student'
                    }
                    if (data.profile.paypal_email) {
                        newObj.paypal_email = data.profile.paypal_email;
                    }
                }
                deferred.resolve(newObj);
            } else {
                deferred.reject("User is not logged in.");
            }
            return deferred.promise;
            //    var deferred = $q.defer();
            //    var da = this;
            //    if (force === true) this._identity = undefined;
            //    if (angular.isDefined(this._identity)) {
            //        deferred.resolve(this._identity);
            //    }else{
            //         if(this.authPromise == null || force){
            //            this.authPromise = this.request({
            //                'method': "GET",
            //                'url': "/rest-auth/user/"
            //            })
            //         }
            //        this.authPromise.then(function(data){
            //            da._identity = data;
            //            deferred.resolve(da._identity);
            //           // alert( alert(JSON.stringify(data)))
            //        },function(){
            //            da.authenticated = false;
            //            deferred.resolve();
            //        });
            // }
            //    return deferred.promise;
        },
        'changePassword': function(password1, password2,old_password) {
            return this.request({
                'method': "POST",
                'url': "/rest-auth/password/change/",
                'data': {
                    'new_password1': password1,
                    'new_password2': password2,
                    'old_password': old_password
                }
            });
        },
        'resetPassword': function(email) {
            return this.request({
                'method': "POST",
                'url': "/rest-auth/password/reset/",
                'data': {
                    'email': email
                }
            });
        },
        'messageCount': function() {
            return this.request({
                'method': "GET",
                'url': "/message/newcount"
            });
        },
        'siteStats': function() {
            return this.request({
                'method': "GET",
                'url': "/stats",
                'cache':false
            });
        },
        'organizationFacts': function() {
            return this.request({
                'method': "GET",
                'url': "/organization_facts",
                'cache':true
            });
        },
        'profile': function() {
            return this.request({
                'method': "GET",
                'url': "/profile/update"
            });
        },
        'getProfile': function(username) {
            return this.request({
                'method': "GET",
                'url': "/profile/user/" + username,
                'useAuthToken':false
            });
        },
        'updateProfile': function(data) {
            return this.request({
                'method': "PUT",
                'url': "/profile/update",
                'data': data
            });
        },
        'getOrganizationProfile': function(username) {
            return this.request({
                'method': "GET",
                'url': "/profile/organization/" + username,
                'useAuthToken':false
            });
        },
        'getNotesForSale': function(username, page) {
            return this.request({
                'method': "GET",
                'url': "/user/" + username + "/forsale",
                'fresh':true,
                'params': {
                    'page': page
                },
                'useAuthToken':false
            });
        },
        'getNoteEarnings': function() {
            return this.request({
                'method': "GET",
                'url': "/note/totalEarnings"
            });
        },
        'verify': function(key) {
            return this.request({
                'method': "POST",
                'url': "/rest-auth/registration/verify-email/",
                'data': {
                    'key': key
                }
            });
        },
        'confirmReset': function(uid, token, password1, password2) {
            return this.request({
                'method': "POST",
                'url': "/rest-auth/password/reset/confirm/",
                'data': {
                    'uid': uid,
                    'token': token,
                    'new_password1': password1,
                    'new_password2': password2
                }
            });
        },
        'authenticationStatus': function(restrict, force) {
            var da = this;
            var getAuthStatus = $q.defer();
            // Set restrict to true to reject the promise if not logged in
            // Set to false or omit to resolve when status is known
            // Set force to true to ignore stored value and query API
            restrict = restrict || false;
            force = force || false;
            //Check if cookies are set for token, if not we automatically rule authentication out
            if (!$cookies.token) {
                if (restrict) {
                    getAuthStatus.reject("User is not logged in.");
                    delete $http.defaults.headers.common.Authorization;
                    delete $cookies.token;
                    nbApiService.authenticated = false;
                    $rootScope.$broadcast("nbApiService.logged_out");
                } else {
                    getAuthStatus.resolve();
                }
            } else { // if token cookie is set
                // Create auth promise if none exists
                if (this.authPromise == null || force) {
                    this.authPromise = this.request({
                        'method': "GET",
                        'url': "/rest-auth/user/",
                        'fresh':true
                    })
                }
                // if authenticated and we aren't forcing recheck
                if (this.authenticated != null && !force) {
                    // We have a stored value which means we can pass it back right away.
                    if (this.authenticated == false && restrict) {
                        getAuthStatus.reject("User is not logged in.");
                        delete $http.defaults.headers.common.Authorization;
                        delete $cookies.token;
                        nbApiService.authenticated = false;
                        $rootScope.$broadcast("nbApiService.logged_out");
                    } else {
                        getAuthStatus.resolve();
                    }
                } else { // if not authenticated or forced to recheck
                    // There isn't a stored value, or we're forcing a request back to
                    // the API to get the authentication status.
                    this.authPromise.then(function(data) {
                        // alert('success?')
                        //alert('got here')
                        da.authenticated = true;
                        da._identity = data;
                        getAuthStatus.resolve();
                        // alert( alert(JSON.stringify(data)))
                        //$rootScope.$broadcast("nbApiService.logged_out");
                    }, function() {
                        da.authenticated = false;
                         delete $http.defaults.headers.common.Authorization;
                            delete $cookies.token;
                            nbApiService.authenticated = false;
                        if (restrict) {
                            getAuthStatus.reject("User is not logged in.");
                            // delete $http.defaults.headers.common.Authorization;
                            // delete $cookies.token;
                            //nbApiService.authenticated = false;
                            $rootScope.$broadcast("nbApiService.logged_out");
                        } else {
                            getAuthStatus.resolve();
                        }
                    });
                }
            }
            return getAuthStatus.promise;
        },
        'contact': function(email, message, name, subject, more) {
            var data = {
                'email': email,
                'message': message,
                'subject': subject,
                'name': name
            }
            data = angular.extend(data, more);
            return this.request({
                'method': "POST",
                'url': "/contact",
                'data': data
            });
        },
        'reportViolation': function(email, message, subject,url, more) {
            var data = {
                'email': email,
                'comment': message,
                'kind': subject,
                'url': url
            }
            data = angular.extend(data, more);
            return this.request({
                'method': "POST",
                'url': "/violation",
                'data': data
            });
        },
        'browseNotes': function(schoolId, courseId, page,order, more) {

           var orderAppend = (order != '' ? (order == 'newest' ? {'ordering':'-created'} 
            : (order == 'oldest' ? {'ordering':'-created'}
                : (order == 'highest' ? {'ordering':'-price'}
                    : (order == 'lowest' ? {'ordering':'price'} : {'ordering':'-created'})))) : {'ordering':'-created'})
          
            var data = {
                'schoolId': schoolId,
                'courseId': courseId,
                'page': page
            }
            data = angular.extend(data, more);
            data = angular.extend(data, orderAppend);

            return this.request({
                'method': "GET",
                'url': "/note",
                'params': data
            });
        },
        'noteDetails': function(noteId) {
            return this.request({
                'method': "GET",
                'url': "/note/" + noteId + "?format=json"
            });
        },
        'noteEditDetails': function(noteId) {
            return this.request({
                'method': "GET",
                'url': "/note/" + noteId + "/editDetails"
            });
        },
        'noteFeedbackList': function(noteId) {
            return this.request({
                'method': "GET",
                'url': "/note/" + noteId + "/feedback"
            });
        },

        'leaveNoteFeedback': function(saleId, data) {
            return this.request({
                'method': "POST",
                'url': "/note/sale/" + saleId + "/feedback",
                'data':data
            });
        },

        'initialNotePurchase': function(nid, data) {
            return this.request({
                'method': "POST",
                'url': "/note/" + nid + "/purchase/initial",
                'data':data
            });
        },

		'notePurchaseConfirmation': function(nid, data) {
			return this.request({
			'method': "GET",
			'url': "/note/" + nid + "/purchase/confirmation",
			'data':data,
            'fresh':true
			});
		},

        'newNote': function(data) {
            return this.request({
                'method': "POST",
                'url': "/note/new",
                'data': data
            });
        },
        'updateNote': function(noteId, data) {
            return this.request({
                'method': "PUT",
                'url': "/note/" + noteId,
                'data': data
            });
        },
        'getNotesPosted': function(username) {
            return this.request({
                'method': "GET",
                'url': "/user/" + username + "/?format=json",
                'fresh':true
            });
        },
        'getNotesPurchased': function(page, order) {
            return this.request({
                'method': "GET",
                'url': "/note/purchased",
                'params': {
                    'page': page,
                    'order': order
                },
                'fresh':true
            });
        },
        'getNoteFileListing': function(nid) {
            return this.request({
                'method': "GET",
                'url': "/note/" + nid + "/file",
                'fresh':true
            });
        },
        'getMyNotesForSale': function(page, order) {

            return this.request({
                'method': "GET",
                'url': "/note/forsale",
                'params': {
                    'page': page,
                    'ordering': order
                },
                'fresh':true
            });
        },
        'getNote': function(noteId) {
            return this.request({
                'method': "GET",
                'url': "/note/" + noteId,
                'useAuthToken':false
            });
        },
        'setNoteStatus': function(noteId, noteStatus) {
           
            return this.request({
                'method': "PUT",
                'url': "/note/" + noteId,
                'data': {
                    'status': noteStatus
                }
            });
        },
        'getInbox': function(page, order) {
            var orderS = (order != '' ? (order == 'newest' ? '-latest_msg' : (order == 'oldest' ? 'latest_msg' : '-latest_msg')) : '-latest_msg')
            return this.request({
                'method': "GET",
                'url': "/message/inbox",
                'params' : {'page': page,
                            'ordering' : orderS},
                'fresh':true,
            });
        },
        'sendMsg': function(recipient, subject, msg) {
            var data = {
                'recipient': recipient,
                'subject': subject,
                'message': msg
            }
            return this.request({
                'method': "POST",
                'url': "/message/compose",
                'data': data
            });
        },
        'getThread': function(threadId) {
            return this.request({
                'method': "GET",
                'url': "/message/thread/" + threadId + "/",
                'fresh':true
            });
        },
        'threadReply': function(threadId, msg) {
            return this.request({
                'method': "POST",
                'url': "/message/thread/" + threadId + "/reply",
                'data': {
                    'message': msg
                }
            });
        },
        'deleteThread': function(threadId) {
            return this.request({
                'method': "DELETE",
                'url': "/message/thread/" + threadId + "/delete"
            });
        },
        'getSimpleOrgnizationList': function() {
            return this.request({
                'method': "GET",
                'url': "/organization/simple",
                'useAuthToken':false
            });
        },
        'getDonations': function(page, order) { // convert to a param object in request
            var orderAppend = (order != '' ? (order == 'newest' ? '?ordering=latest' : (order == 'oldest' ? '?ordering=latest_msg' : '')) : '')
            return this.request({
                'method': "GET",
                'url': "/organization/donations" + orderAppend
            });
        },
        'followUser': function(userId) {
            return this.request({
                'method': "POST",
                'url': "/user/watchlist",
                'data': {
                    'user_id': userId
                }
            });
        },
        'getWatchlist': function(order, page) {
            return this.request({
                'method': "GET",
                'url': "/user/watchlist",
                'params': {
                    'order': order,
                    'page': page
                },
                'fresh':true
            });
        },
        'removeFromWatchlist': function(userId) {
            return this.request({
                'method': "DELETE",
                'url': "/user/watchlist",
                'data': {
                    'user_id': userId,
                },
                'extraHeader' : {'Content-Type': 'application/json'}
            });
        },
        'setPaymentSettings': function(email) {
            return this.request({
                'method': "PUT",
                'url': "/profile/update",
                'data': {
                    'profile': {
                        'paypal_email': email
                    }
                }
            });
        },
        'getUserFeedback': function(username, page) {
            return this.request({
                'method': "GET",
                'url': "/profile/" + username + '/feedback',
                'params': {
                    'page': page
                }
            });
        },
        'getUsers': function(term,page) {
            return this.request({
                'method': "GET",
                'url': "/user",
                'params': {'page':page, 'search':term},
                'useAuthToken':false
            });
        },
        'getSchools': function(params) {
            return this.request({
                'method': "GET",
                'url': "/school",
                'params': params,
                'useAuthToken':false
            });
        },
        'getCourseSubject': function(params) {
            return this.request({
                'method': "GET",
                'url': "/subject",
                'params': params,
                'useAuthToken':false
            });
        },
        'getInstructors': function(params) {
            //var url = "/school/" + school_id + "/instructor" + (term && term.length > 0 ? '?search=' + term : '');
            return this.request({
                'method': "GET",
                'url': "/instructor",
                'params':params,
                'useAuthToken':false
            });
        },
        'getCourses': function(params) {
            return this.request({
                'method': "GET",
                'url': "/course",
                'params': params,
                'useAuthToken':false
            });
        },
        'saveCourse': function(school_id, name, title, subject_id) {
            return this.request({
                'method': "POST",
                'url': "/course",
                'data': {'school_id':school_id,
            			'name':name,
            			'title':title,
            			'subject_id':subject_id}
            });
        },
        'saveInstructor': function(school_id, name) {
            return this.request({
                'method': "POST",
                'url': "/instructor",
                'data': {'school_id':school_id,
            			'name':name
            			}
            });
        },

        'getNotePaymentDetails': function(noteId) {
            return this.request({
                'method': "GET",
                'url': "/note/" + noteId + "/purchaseDetails"
            });
        },
        'getBaseApiUrl': function() {
            return this.API_URL;
        },
        'randomDateString': function(){
			return new Date().getTime() + Math.random();
        },
        'initialize': function(url, sessions) {
            this.API_URL = url;
            this.use_session = sessions;
            return this.authenticationStatus();
        }
    }
    return service;
});