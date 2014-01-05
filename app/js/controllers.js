'use strict';

/* Controllers */

angular.module('myApp.controllers', []).

/**********************************************************************
 * Login controller
 **********************************************************************/
	controller('LoginCtrl', function($scope, $rootScope, $http, $location) {
	  // This object will be filled by the form
	  $scope.user = {};

	  // Register the login() function
	  $scope.login = function(){
	    $http.post('/login', {
	      username: $scope.user.username,
	      password: $scope.user.password,
	    })
	    .success(function(user){
	      // No error: authentication OK
	      $rootScope.message = 'Authentication successful!';
	      $location.url('/dashboard');
	    })
	    .error(function(){
	      // Error: authentication failed
	      $rootScope.message = 'Authentication failed.';
	      $location.url('/login');
	    });
	  };
	}).


	controller('MyCtrl1', function() {

	}).
	
	controller('MyCtrl2', function() {

	});
