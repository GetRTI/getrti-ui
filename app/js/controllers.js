'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
	
	/**********************************************************************
	 * Main Controller  --- Do we really need this???
	 **********************************************************************/
	controller('MainCtrl', function($scope) {

	}).

/**********************************************************************
 * Login controller
 **********************************************************************/

    controller('NavCtrl', function ($rootScope, $scope, AuthService) {
      
      $scope.loggedIn = AuthService.isLoggedIn();
      
      $scope.logout = function(){
        AuthService.logout();
        $rootScope.$broadcast('logout');
      };

      $rootScope.$on('loggedin', function(){
          $scope.loggedIn = true;
      });

      $rootScope.$on('loggedout', function(){
          $scope.loggedIn = false;
      });

    }).

    controller('LoginCtrl', function($scope, $rootScope, $location, AuthService) {
      // This object will be filled by the form
      $scope.user = {};
      $scope.error = $rootScope.flash;

      // Register the login() function
      $scope.login = function(){
        AuthService.login($scope.user.username, $scope.user.password)
        .then(function(user){
          // No error: authentication OK
          $rootScope.$broadcast('loggedin');
          $location.url('/dashboard');
        },
        function(message){
          // Error: authentication failed
          $scope.error = message;
        });
      };

      $rootScope.$on('logout', function(){
        AuthService.logout().
        then(function(){
          $scope.loggedIn = false;
        });
      });

    }).

    /*
     * Controller for the register/signup form
     */
    controller('SignupCtrl', function($scope, $rootScope, $location, AuthService) {
        //Signup form object
        $scope.user = {};

        //Signup handler
        $scope.signup = function(){

            var username = $scope.user.username,
                email    = $scope.user.email,
                fullname = $scope.user.fullname,
                password = $scope.user.password;

            AuthService.signup(username, email, fullname, password)
            .success(function(user){
                //Redirect to login page after registration is succesful
                $rootScope.message = 'Signup successful, Please check you email';
                $location.url('/login');
            })
            .error(function(error){
                // In case of error while creating the account, show the flash message
                // this can happen if the primary key for the user username/email already
                // exists
                $rootScope.message = error.message;
            })
        };
    }).
    
    controller('FileCtrl', function($scope, $upload, $modal, FileService, ngTableParams) {
        FileService.get().then(function(data){
            $scope.files = data.data;
            $scope.tableParams = new ngTableParams({
                page: 1,            // show first page
                count: 10           // count per page
                }, 
                {
                    total: $scope.files.length, // length of data
                    getData: function($defer, params) {
                        $defer.resolve($scope.files.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            });
        });

        $scope.edit = function(file_index){
            var file = $scope.files[0];
            var modalInstance = $modal.open({
                templateUrl: 'partials/file_classify.tpl.html'
            });
        };


        $scope.allfiles = {'checked': false, selected: {}};

        // Select all the checkboxes when the checkbox header is changed;
        $scope.$watch('allfiles.checked', function(value){
            angular.forEach($scope.files,  function(file){
                if (angular.isDefined(file.id)) {
                  $scope.allfiles.selected[file.id] = value;
                }
            });
        });

        // These needs to be called whenever the checkbox of the any files
        // gets changed
        $scope.showLink = function(){
            if(_.map($scope.allfiles, function(value){
              return value;
            }).length > 1){
              return false;
            };
            return true;
        };
        
        $scope.showDelete = function(){
            return ! _.some($scope.allfiles, function(value){
              return value;
            });
        };

        $scope.onFileSelect = function($files) {
            //$files: an array of files selected, each file has name, size, and type.
            for (var i = 0; i < $files.length; i++) {
              var file = $files[i];
              $scope.upload = $upload.upload({
                url: '/file', //upload.php script, node.js route, or servlet url
                method: 'PUT',
                // headers: {'headerKey': 'headerValue'}, withCredential: true,
                file: file,
                // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
                /* set file formData name for 'Content-Desposition' header. Default: 'file' */
                //fileFormDataName: myFile,
                /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
                //formDataAppender: function(formData, key, val){} 
              }).progress(function(evt) {
                console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
              }).success(function(data, status, headers, config) {
                // file is uploaded successfully
                console.log(data);
              });
              //.error(...)
              //.then(success, error, progress); 
            }
        };
    }).

    controller('FileDetailsCtrl', function($scope, $rootScope, $location, AuthService, selectedFile) {
        $scope.selectedFile = {};

        if (selectedFile){
            $scope.selectedFile = selectedFile.data;
        } else{
            $scope.selectedFile = {};
        }
    });
