'use strict';
angular.module('angularNoteboosterApp').service('nbApiService', function nbApiService($q, $http, $cookies, $rootScope) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service = {
        /* START CUSTOMIZATION HERE */
        // Change this to point to your Django REST Auth API
        // e.g. /api/rest-auth  (DO NOT INCLUDE ENDING SLASH)
        'API_URL': '',
        // Set use_session to true to use Django sessions to store security token.
        // Set use_session to false to store the security token locally and transmit it as a custom header.
        'use_session': false,
        /* END OF CUSTOMIZATION */
        'authenticated': null,
        'authPromise': null,
        '_identity': undefined,
        'request': function(args) {
            
            // Continue
            params = args.params || {}
            args = args || {};
            var deferred = $q.defer(),
                url = this.API_URL + args.url,
                method = args.method || "GET",
                params = params,
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
            // Fire the request, as configured.
            $http({
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
                // Set request status
                if (data && status && status != 500) {
                    data.status = status;
                }else if(status && status > 200){
                	data = {};
                	data.status = status;
                }

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
                deferred.reject(data, status, headers, config);
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
            // alert('I was called')
            if (angular.isDefined(this._identity)) {
                nbApiService.authenticated = true;
                // alert('nice, we are defined')
                var newObj = {};
                var data = this._identity;
                if (data.id) newObj.id = data.id;
                if (data.username) newObj.username = data.username;
                if (data.email) newObj.email = data.email;
                if (data.profile.profile_picture) newObj.profile_picture = data.profile.profile_picture;
                if (data.profile.user_type) {
                    newObj.account_type = data.profile.user_type.toLowerCase();
                } else {
                    newObj.account_type = 'student'
                }
                if (data.profile.paypal_email) {
                    newObj.paypal_email = data.profile.paypal_email;
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
                'data': {
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
            //alert('restrict: ' + restrict + ' / force: ' + force);
            //  alert(this.authenticated);
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
			'data':data
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
                'url': "/user/" + username + "/?format=json"
            });
        },
        'getNotesPurchased': function(page, order) {
            return this.request({
                'method': "GET",
                'url': "/note/purchased",
                'data': {
                    'page': page,
                    'order': order
                }
            });
        },
        'getNoteFileListing': function(nid) {
            return this.request({
                'method': "GET",
                'url': "/note/" + nid + "/file"
            });
        },
        'getMyNotesForSale': function(page, order) {

            return this.request({
                'method': "GET",
                'url': "/note/forsale",
                'params': {
                    'page': page,
                    'order': order
                }
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
            var orderAppend = (order != '' ? (order == 'newest' ? '?ordering=latest' : (order == 'oldest' ? '?ordering=latest_msg' : '')) : '')
            return this.request({
                'method': "GET",
                'url': "/message/inbox" + orderAppend,
                'params' : {'page': page}
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
                'url': "/message/thread/" + threadId + "/"
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
                'data': {
                    'order': order,
                    'page': page
                }
            });
        },
        'removeFromWatchlist': function(userId) {
            return this.request({
                'method': "DELETE",
                'url': "/user/watchlist",
                'data': {
                    'user_id': userId,
                }
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