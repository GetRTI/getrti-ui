'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  
factory('AuthService', function($http, $q, $timeout, SessionService, USER_COOKIE_NAME){
	
	var cacheSession = function(user){
		SessionService.set(USER_COOKIE_NAME, user);
	};
	var uncacheSession = function(){
		SessionService.unset(USER_COOKIE_NAME);
	};

	//Hook up with the server api here
	return {
		login: function(username, password){
			var defer = $q.defer();
			$timeout(function(){
				if(username =='getRTI' && password == 'getRTI'){
					cacheSession(username);
					return defer.resolve();
				}else {
					return defer.reject('Username and password doesn\'t match');
				}
			}, 5);
			return defer.promise;
		},
		logout: function(){
			var defer = $q.defer();
			uncacheSession();
			return defer.resolve();
		},
		signup: function(credentials){
			return $http.post('http://localhost:3000/register', credentials);
		},
		isLoggedIn: function(){
			return !!SessionService.get(USER_COOKIE_NAME);
		}
	}
}).

//Gets the details about the files
factory('FileService', function($http){
	//Hook up with the server api here
	return {
		//Returns all the files available 
		get: function(){
			return $http.get('http://localhost:3000/files');
		},
		// Uploads the new files through form data
		upload: function(content){
			return $http.put('http://localhost:3000/file');
		},
		// Updates the existing data for the file
		update: function(fileId, tags, department, pages){
			return $http.post('http://localhost:3000/file/' + fileId);
		},
		//Gets the detailed information about the file
		get_details: function(fileId){
			return $http.get('http://localhost:3000/file/' + fileId);
		},
		delete: function(fileId){
			return $http.delete('http://localhost:3000/file/' + fileId);
		}
	}
}).

factory('FileLoader', function ($route, $q, $http) {
	return function(){
		var fileId = $route.current.params.fileId;
		return $http.get('/file/' + fileId);
	};
}).

factory('SessionService', ['$cookieStore', function ($cookieStore) {
	
	return {
		get: function(key){
			return $cookieStore.get(key);
		},
		set: function(key, val){
			$cookieStore.put(key, val);
		},
		unset: function(key){
			$cookieStore.put(key, undefined);
		}
	};
}]).

// Search interface
factory('SearchService', function($location, $http){
	return {
		query: function(seach_term){
			return $http.get('http://localhost:3000/search/:' + seach_term);
		}
	}
}).

factory("FlashService", function($rootScope) {
  return {
    show: function(message) {
      $rootScope.flash = message;
    },
    clear: function() {
      $rootScope.flash = "";
    }
  }
});


