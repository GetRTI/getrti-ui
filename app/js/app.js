'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
    'ngRoute',
    'myApp.controllers', 
    'myApp.filters', 
    'myApp.services', 
    'myApp.directives', 'ngTable', 'angularFileUpload', 'ui.bootstrap', 'ngCookies']).

  config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider) {
    // for sending CORS request
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    $routeProvider.when('/', 
    	{
    		templateUrl: 'partials/main.tpl.html'
    	}
    );
    $routeProvider.when('/search',
        {
            templateUrl: 'partials/search.tpl.html',
            controller: 'SearchCtrl'
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
    
    $routeProvider.when('/contributors', 
        {
            templateUrl: 'partials/contributors.tpl.html',
        }
    );
    
    $routeProvider.when('/file/:fileId', 
        {
            templateUrl: 'partials/file_details.tpl.html',
            controller: 'FileDetailsCtrl',
            resolve: {
                selectedFile: function(FileLoader){
                    return FileLoader();
                }
            }
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

  }]).

run(function($rootScope, $location, AuthService){
    var authRoutes = ['/files', '/reports'];
    $rootScope.$on('$routeChangeStart', function(event, current, prev){
        var location = $location.path();
        if (authRoutes.indexOf(location) !== -1 && !AuthService.isLoggedIn()){
            $rootScope.flash = 'Login is required to acess this page';
            $location.path('/login');
        }
        else if(authRoutes.indexOf(location) !== -1 || location !== '/login'){
            $rootScope.flash = '';
        }
    });
})

.constant('USER_COOKIE_NAME', 'GETRTI_UER');
