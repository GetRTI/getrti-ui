'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'myApp.controllers', 
    'myApp.filters', 
    'myApp.services', 
    'myApp.directives', 'ngTable']).

  config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/', 
    	{
    		templateUrl: 'partials/main.tpl.html', 
    		controller: 'MainCtrl'
    	}
    );
    $routeProvider.when('/about', 
        {
            templateUrl: 'partials/about.tpl.html'
        }
    );
    $routeProvider.when('/files', 
        {
            templateUrl: 'partials/files.tpl.html',
            controller: 'FileCtrl'
        }
    );
    $routeProvider.when('/signup', 
    	{
    		templateUrl: 'partials/register.tpl.html', 
    		controller: 'SignupCtrl'
    	}
    );
    $routeProvider.when('/login', 
    	{
    		templateUrl: 'partials/login.tpl.html', 
    		controller: 'LoginCtrl'
    	}
    );

    $routeProvider.otherwise({redirectTo: '/default'});

  }]);