## One time setup

> npm install

### Running this app during development

> grunt

This will use concurrent task runner to do following tasks in a watch mode:

1) Watch for any JS (src and test files) changes and run jsHint

2) Watch for any JS (src and test files) changes and run Karma

3) Start the Node server at "9000"

### TODO

1) Migrate 'angular' version from 1.1.4 to 1.2.x
2) Once above migration is complete add "bower" support

## Directory Layout

    app/                --> all of the files to be used in production
      assets/
	      css/          --> CSS Files
	        app.css     --> Default Stylesheet
	      images/       --> Images
	      fonts/        --> Fonts
      js/               --> Javascript files
        app.js          --> application
        controllers.js  --> application controllers
        directives.js   --> application directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
      lib/              --> angular and 3rd party javascript libraries
        angular/
          angular.js        --> the latest angular js
          angular.min.js    --> the latest minified angular js
          angular-*.js      --> angular add-on modules
          version.txt       --> version number
      partials/             --> angular view partials (partial html templates)
        partial1.html
        partial2.html
	  index.html        --> app layout file (the main html template file of the app)
	  
    test/               --> test source files and libraries
      e2e/              -->
        runner.html     --> end-to-end test runner (open in your browser to run)
        scenarios.js    --> end-to-end specs
      lib/
        angular/                --> angular testing libraries
          angular-mocks.js      --> mocks that replace certain angular services in tests
          angular-scenario.js   --> angular's scenario (end-to-end) test runner library
          version.txt           --> version file
      unit/                     --> unit level specs/tests
        controllersSpec.js      --> specs for controllers
        directivessSpec.js      --> specs for directives
        filtersSpec.js          --> specs for filters
        servicesSpec.js         --> specs for services
