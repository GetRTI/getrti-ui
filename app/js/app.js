'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.controllers', 'myApp.filters', 'myApp.services', 'myApp.directives']).

  config(['$routeProvider', function($routeProvider) {

    $routeProvider.when('/default', 
    	{
    		templateUrl: 'partials/default.tpl.html', 
    		controller: 'MyCtrl1'
    	}
    );
    $routeProvider.when('/signup', 
    	{
    		templateUrl: 'partials/register.tpl.html', 
    		controller: 'MyCtrl1'
    	}
    );
    $routeProvider.when('/login', 
    	{
    		templateUrl: 'partials/login.tpl.html', 
    		controller: 'MyCtrl1'
    	}
    );


    $routeProvider.otherwise({redirectTo: '/default'});
  }]);
