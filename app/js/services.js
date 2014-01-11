'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  

factory('AuthService', function($location, $http){
	//Hook up with the server api here
	return {
		login: function(credentials){
			return $http.post('http://localhost:3000/login', credentials);
		},
		signup: function(credentials){
			return $http.post('http://localhost:3000/register', credentials);
		}
	}
}).

//Gets the details about the files
factory('FileService', function($location, $http){
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

// Search interface
factory('SearchService', function($location, $http){
	return {
		query: function(seach_term){
			return $http.get('http://localhost:3000/search/:' + seach_term);
		}
	}
});

