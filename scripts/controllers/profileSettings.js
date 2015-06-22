'use strict';

angular.module('angularNoteboosterApp')
  .controller('ProfileSettingsCtrl', function ($scope,$modal,$stateParams,$http,nbApiService,Validate,$cookies, FileUploader) {
  	$scope.img = "";
  	$scope.bio = "";
  	$scope.username = "";
  	$scope.school = {};
  	$scope.email = "";
  	$scope.notifyByEmail = false;


    $scope.profilePic = ($scope.user.profile_picture || 'img/profile.png');
// FileUploader.prototype.uploadItem = function(value) {
//     var index = this.getIndexOfItem(value),
//         item = this.queue[index],
//         self = this;

//     item._prepareToUploading();
//     if (this.isUploading) {
//         return;
//     }

//     this.isUploading = true;

//      	if($cookies.token){
//          	$http.defaults.headers.common.Authorization = 'Token ' + $cookies.token;
//         }
// 	    $http({
// 	        url: item.url,
// 	        method: item.method,
// 	        data: item._file,
// 	        headers: item.headers
// 	    }).then(function (response, status, headers) {
// 	        self._onSuccessItem(item, response, status, headers);
// 	    }).catch(function (response, status, headers) {
// 	        self._onErrorItem(item, response, status, headers);
// 	    }).finally(function (response, status, headers) {
// 	        self._onCompleteItem(item, response, status, headers);
// 	    });
// 	};

    var uploader = $scope.uploader = new FileUploader({
            url: nbApiService.getBaseApiUrl() + '/profile/picture',
            autoUpload: true,

            headers: {'X-CSRFToken': $cookies['csrftoken'],
        				'Authorization': 'Token ' + $cookies.token},
        });

        // FILTERS

      uploader.filters.push({
          name: 'customFilter',
          fn: function(item /*{File|FileLikeObject}*/, options) {
              return this.queue.length < 10;
          }
      });

       // CALLBACKS

        uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);

          if(status==201){
            $scope.profilePic = response.profile_picture;
          }
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };

        console.info('uploader', uploader);

    $scope.searchSchool = function(school) {
      var params = {search: school, page: 1};      
      nbApiService.getSchools(params)
        .then(function(data){
         // success case
         $scope.schools = data.results;
        },function(data){
          // error case
          $scope.errors = data;
      });
    };

    $scope.saveSettings = function(){
    	$scope.data = {
        'username': $scope.username,
        'email': $scope.email,
        'profile': {
          'school': $scope.school,
          'email_notification': $scope.notifyByEmail,
          'bio': $scope.bio
        }
      }

    	nbApiService.updateProfile($scope.data)
    	.then(function(data){

    	},function(data){
        
    	});
    };

  	$scope.disableAccount = function(size) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/views/partials/disable_account_modal.html',
			controller: 'DisableAccountCtrl',
			size: size
		});

		modalInstance.result.then(function () {
			//TODO: disable account and log user out
			console.log('disable it');
		}, function (reason) {
			// Modal closed.
			console.log(reason);
		});
	};
  
  $scope.onFileSelect = function($flow) {
    console.log($files);
    //$files: an array of files selected, each file has name, size, and type.
    // for (var i = 0; i < $files.length; i++) {
    //   var $file = $files[i];
    //   $upload.upload({
    //     url: 'my/upload/url',
    //     file: $file,
    //     progress: function(e){}
    //   }).then(function(data, status, headers, config) {
    //     // file is uploaded successfully
    //     console.log(data);
    //   }); 
    // }
  }

  init();
  function init() {
    getUserProfile();
  }

  function getUserProfile(){
    nbApiService.profile()
    .then(function(data){
      $scope.bio = data.profile.bio;
      $scope.username = data.username;
      $scope.school = {selected: data.profile.school};
      $scope.email = data.email;
      $scope.notifyByEmail = data.profile.email_notification;
    },function(data){

    });
  }
  
});
