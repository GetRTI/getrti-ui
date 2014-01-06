'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  

factory('AuthService', function($location, $http){
	//Hook up with the server api here
	return {
		login: function(credentials){
			
		},
		signup: function(credentials){

		}
	}
}).

//Gets the details about the files
factory('FileService', function($location, $http){
	//Hook up with the server api here
	return {
		//Returns all the files available 
		get: function(){
			return $http.get('/files');
		},
		// Uploads the new files through form data
		upload: function(content){
			return $http.put('/file');
		},
		// Updates the existing data for the file
		update: function(fileId, tags, department, pages){
			return $http.post('file/' + fileId);
		},
		//Gets the detailed information about the file
		get_details: function(fileId){
			return $http.get('/file/' + fileId);
		},
		delete: function(fileId){
			return $http.delete('/file/' + fileId);
		}
	}
}).

// Search interface
factory('SearchService', function($location, $http){
	return {
		query: function(seach_term){
			return $http.get('/search/:' + seach_term);
		}
	}
});

