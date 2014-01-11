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
	controller('LoginCtrl', function($scope, $rootScope, $location, AuthService) {
	  // This object will be filled by the form
	  $scope.user = {};

	  // Register the login() function
	  $scope.login = function(){
	  	console.log('username = ' + $scope.user.username + '  password = ' + $scope.user.password );

		AuthService.login($scope.user)
		.success(function(user){
		  // No error: authentication OK
		  console.log("successful !!!!!!");
		  $rootScope.message = 'Authentication successful!';
		  $location.url('/files');
		})
		.error(function(){
		  // Error: authentication failed
		  console.log("Error !!!!!!");
		  $rootScope.message = 'Authentication failed.';
		  $location.url('/login');
		});
	  };
	}).

	/**********************************************************************
	 * Controller for the register/signup form
	 **********************************************************************/
	controller('SignupCtrl', function($scope, $rootScope, $location, AuthService) {
		//Signup form object
		$scope.registerObj = {};

		//Signup handler
		$scope.register = function(){
			AuthService.signup($scope.registerObj)
			.success(function(user){
				//Redirect to login page after registration is succesful
				$rootScope.message = 'Signup successful, Please check your email';
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

	/**********************************************************************
	 * Controller for the File list
	 **********************************************************************/	
	controller('FileCtrl', function($scope, FileService, ngTableParams) {
		FileService.get().then(function(data){
			$scope.files = data.data;
			$scope.tableParams = new ngTableParams({
				page: 1,            // show first page
				count: 5           // count per page
				}, 
				{
					total: $scope.files.length, // length of data
					getData: function($defer, params) {
						$defer.resolve($scope.files.slice((params.page() - 1) * params.count(), params.page() * params.count()));
				}
			});
		});
	});
