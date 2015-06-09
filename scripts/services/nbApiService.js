'use strict';

angular.module('angularNoteboosterApp')
  .service('nbApiService', function nbApiService($q, $http, $cookies, $rootScope) {
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
        'request': function(args) {
            // Let's retrieve the token from the cookie, if available
            if($cookies.token){
                $http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
            }
            // Continue
            params = args.params || {}
            args = args || {};
            var deferred = $q.defer(),
                url = this.API_URL + args.url,
                method = args.method || "GET",
                params = params,
                data = args.data || {};
            // Fire the request, as configured.
            $http({
                url: url,
                withCredentials: this.use_session,
                method: method.toUpperCase(),
                headers: {'X-CSRFToken': $cookies['csrftoken']},
                params: params,
                data: data
            })
            .success(angular.bind(this,function(data, status, headers, config) {
                deferred.resolve(data, status);
            }))
            .error(angular.bind(this,function(data, status, headers, config) {
                console.log("error syncing with: " + url);
                // Set request status
                if(data){
                    data.status = status;
                }
                if(status == 0){
                    if(data == ""){
                        data = {};
                        data['status'] = 0;
                        data['non_field_errors'] = ["Could not connect. Please try again."];
                    }
                    // or if the data is null, then there was a timeout.
                    if(data == null){
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
        'register': function(username,password1,password2,email,schoolId,more){
            var data = {
                'username':username,
                'password1':password1,
                'password2':password2,
                'email':email,
                'schoolId': schoolId
            }
            data = angular.extend(data,more);
            return this.request({
                'method': "POST",
                'url': "/rest-auth/registration/",
                'data' :data
            });
        },
        'login': function(username,password){
            var nbApiService = this;
            return this.request({
                'method': "POST",
                'url': "/rest-auth/login/",
                'data':{
                    'username':username,
                    'password':password
                }
            }).then(function(data){
                if(!nbApiService.use_session){
                    $http.defaults.headers.common.Authorization = 'Token ' + data.key;
                    $cookies.token = data.key;
                }
                nbApiService.authenticated = true;
                $rootScope.$broadcast("nbApiService.logged_in", data);
            });
        },
        'logout': function(){
            var nbApiService = this;
            return this.request({
                'method': "POST",
                'url': "/rest-auth/logout/"
            }).then(function(data){
                delete $http.defaults.headers.common.Authorization;
                delete $cookies.token;
                nbApiService.authenticated = false;
                $rootScope.$broadcast("nbApiService.logged_out");
            });
        },
        'changePassword': function(password1,password2){
            return this.request({
                'method': "POST",
                'url': "/rest-auth/password/change/",
                'data':{
                    'new_password1':password1,
                    'new_password2':password2
                }
            });
        },
        'resetPassword': function(email){
            return this.request({
                'method': "POST",
                'url': "/rest-auth/password/reset/",
                'data':{
                    'email':email
                }
            });
        },
        'profile': function(){
            return this.request({
                'method': "GET",
                'url': "/rest-auth/user/"
            }); 
        },
        'updateProfile': function(data){
            return this.request({
                'method': "PATCH",
                'url': "/rest-auth/user/",
                'data':data
            }); 
        },
        'verify': function(key){
            return this.request({
                'method': "POST",
                'url': "/rest-auth/registration/verify-email/",
                'data': {'key': key} 
            });            
        },
        'confirmReset': function(uid,token,password1,password2){
            return this.request({
                'method': "POST",
                'url': "/rest-auth/password/reset/confirm/",
                'data':{
                    'uid': uid,
                    'token': token,
                    'new_password1':password1,
                    'new_password2':password2
                }
            });
        },
        'authenticationStatus': function(restrict, force){
            // Set restrict to true to reject the promise if not logged in
            // Set to false or omit to resolve when status is known
            // Set force to true to ignore stored value and query API
            restrict = restrict || false;
            force = force || false;
            if(this.authPromise == null || force){
                this.authPromise = this.request({
                    'method': "GET",
                    'url': "/rest-auth/user/"
                })
            }
            var da = this;
            var getAuthStatus = $q.defer();
            if(this.authenticated != null && !force){
                // We have a stored value which means we can pass it back right away.
                if(this.authenticated == false && restrict){
                    getAuthStatus.reject("User is not logged in.");
                    delete $http.defaults.headers.common.Authorization;
                    delete $cookies.token;
                    nbApiService.authenticated = false;
                    $rootScope.$broadcast("nbApiService.logged_out");
                }else{
                    getAuthStatus.resolve();
                }
            }else{
                // There isn't a stored value, or we're forcing a request back to
                // the API to get the authentication status.
                this.authPromise.then(function(){
                    da.authenticated = true;
                    getAuthStatus.resolve();
                },function(){
                    da.authenticated = false;
                    if(restrict){
                        getAuthStatus.reject("User is not logged in.");
                        delete $http.defaults.headers.common.Authorization;
                        delete $cookies.token;
                        nbApiService.authenticated = false;
                        $rootScope.$broadcast("nbApiService.logged_out");
                    }else{
                        getAuthStatus.resolve();
                    }
                });
            }
            return getAuthStatus.promise;
        },
        'contact': function(email,message,name,subject, more){
            var data = {
                'email':email,
                'message':message,
                'subject':subject,
                'name':name
                
            }
            data = angular.extend(data,more);
            return this.request({
                'method': "POST",
                'url': "/contact",
                'data' :data
            });
        },
        'browseNotes': function(schoolId, courseId, page, more){
            var data = {
                'schoolId':schoolId,
                'courseId':courseId,
                'page':page
            }
            data = angular.extend(data,more);
            return this.request({
                'method': "GET",
                'url': "/note/",
                'data' :data
            });
        },
        'noteDetails': function(noteId){
            return this.request({
                'method': "GET",
                'url': "/note/" + noteId + "/?format=json"
            });
        },
        'getInbox': function(){
            return this.request({
                'method': "GET",
                'url': "/message/inbox"
            });
        },
        'sendMsg': function(recipient,subject,msg){
            var data = {
                'recipient':recipient,
                'subject':subject,
                'message':msg
            }
            return this.request({
                'method': "POST",
                'url': "/message/compose",
                'data': data
            });
        },
        'initialize': function(url, sessions){
            this.API_URL = url;
            this.use_session = sessions;
            return this.authenticationStatus();
        }

    }
    return service;
  });
