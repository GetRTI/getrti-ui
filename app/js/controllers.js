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

    controller('FileCtrl', function($scope, $modal, FileService, ngTableParams) {
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
        
        // Enable the delete button in the sidebar only when atleast one file
        // gets selected
        $scope.showDelete = function(){
            return ! _.some($scope.allfiles, function(value){
              return value;
            });
        };

        //Deletes the multiple files
        $scope.delete = function(){
          var filesToDelete = Object.keys($scope.allfiles.selected);
          FileService.delete(filesToDelete).then(function(){
            //After the files are deleted, remove them from the $scope.files to
            //update the view
            angular.each($scope.files, function(file){
                if (_.contains(filesToDelete, file.id)){
                  $scope.files = _.without($scope.files, _.findWhere($scope.files, {id: file.id}));
                }
            });
          });
        };

        // Uploads the file when selected
        $scope.onFileSelect = function($files) {
            FileService.upload($files).then(function(){
              console.log('Uploaded all the files');
            });
        };
    }).

    controller('FileDetailsCtrl', function($scope, $rootScope, $location, AuthService, FileService, selectedFile) {
        $scope.selectedFile = {};

        if (selectedFile){
            $scope.selectedFile = selectedFile.data;
        } else{
            $scope.selectedFile = {};
        }

        // Save any changes made to this file
        $scope.publish = function(){
            var file = $scope.selectedFile;
            FileService.update(file);
        };
    }).

    controller('SearchCtrl', function($scope, $rootScope, $location, AuthService) {


        $scope.record = [

            { Country: 'Algeria',
              Station: 'Algiers',
              Public_Information_Officer: 'Mr. A. V. Satyanarayana  First Secretary',
              Appellate_Authority: 'Dr. Ashok K. Amrohi,   Ambassador',
              Email: 'Amb(dot)algiers[at]mea(dot)gov(dot)in',
              Fax_No: '00-213-21-924011',
              url: 'http://cic.gov.in/pio_and_aa_of_indian_missions.htm' },

            { Country: 'Australia',
              Station: 'Canberra',
              Public_Information_Officer: 'Mr. N. G. Vasanth Kumar  First Secretary',
              Appellate_Authority: 'Mr. Vinod Kumar,   Dy. High Commissioner',
              Email: 'hoc[at]hcindia-au(dot)org',
              Fax_No: '61-2-62731308',
              url: 'http://cic.gov.in/pio_and_aa_of_indian_missions.htm' },

            { Country: 'Bahrain',
              Station: 'Bahrain1',
              Public_Information_Officer: 'Mr. A. K. Bhatnagar,  First Secretary',
              Appellate_Authority: 'Mr. Balkrishna Shetty,   Ambassador',
              Email: 'ndemb[at]batelco(dot)com(dot)bh  counslrs[at]batelco(dot)combh',
              Fax_No: '00973 17717363',
              url: 'http://cic.gov.in/pio_and_aa_of_indian_missions.htm' },

            { Country: 'Bahrain',
                Station: 'Bahrain2',
                Public_Information_Officer: 'Mr. A. K. Bhatnagar,  First Secretary',
                Appellate_Authority: 'Mr. Balkrishna Shetty,   Ambassador',
                Email: 'ndemb[at]batelco(dot)com(dot)bh  counslrs[at]batelco(dot)combh',
                Fax_No: '00973 17717363',
                url: 'http://cic.gov.in/pio_and_aa_of_indian_missions.htm' },

            { Country: 'Bahrain',
                Station: 'Bahrain3',
                Public_Information_Officer: 'Mr. A. K. Bhatnagar,  First Secretary',
                Appellate_Authority: 'Mr. Balkrishna Shetty,   Ambassador',
                Email: 'ndemb[at]batelco(dot)com(dot)bh  counslrs[at]batelco(dot)combh',
                Fax_No: '00973 17717363',
                url: 'http://cic.gov.in/pio_and_aa_of_indian_missions.htm' },
            { Country: 'Bahrain',
                Station: 'Bahrain4',
                Public_Information_Officer: 'Mr. A. K. Bhatnagar,  First Secretary',
                Appellate_Authority: 'Mr. Balkrishna Shetty,   Ambassador',
                Email: 'ndemb[at]batelco(dot)com(dot)bh  counslrs[at]batelco(dot)combh',
                Fax_No: '00973 17717363',
                url: 'http://cic.gov.in/pio_and_aa_of_indian_missions.htm' },
            { Country: 'Bahrain',
                Station: 'Bahrain5',
                Public_Information_Officer: 'Mr. A. K. Bhatnagar,  First Secretary',
                Appellate_Authority: 'Mr. Balkrishna Shetty,   Ambassador',
                Email: 'ndemb[at]batelco(dot)com(dot)bh  counslrs[at]batelco(dot)combh',
                Fax_No: '00973 17717363',
                url: 'http://cic.gov.in/pio_and_aa_of_indian_missions.htm' },
            { Country: 'Bahrain',
                Station: 'Bahrain6',
                Public_Information_Officer: 'Mr. A. K. Bhatnagar,  First Secretary',
                Appellate_Authority: 'Mr. Balkrishna Shetty,   Ambassador',
                Email: 'ndemb[at]batelco(dot)com(dot)bh  counslrs[at]batelco(dot)combh',
                Fax_No: '00973 17717363',
                url: 'http://cic.gov.in/pio_and_aa_of_indian_missions.htm' }
        ];

        $scope.searchData = function(){
            $scope.objAry = new Array();
              if($scope.searchText )
              {

                 for(var i =0 ; i< $scope.record.length;i++)
                 {
                     //alert($scope.record[i]['Country']);
                     if($scope.record[i]['Country']== $scope.searchText)
                     {
                         //alert($scope.record[i]['Country']);
                         $scope.objAry.push($scope.record[i]);
                         //console.log($scope.objAry);
                     }
                 }
              }
              else
              {
                 return $scope.objAry = null;
              }
        }

        $scope.itemsPerPage = 2;
        $scope.currentPage = 0;
        $scope.range = function() {
            var rangeSize = 2;
            var ret = [];
            var start;

            start = $scope.currentPage;
            if ( start > $scope.pageCount()-rangeSize ) {
                start = $scope.pageCount()-rangeSize+1;
            }

            for (var i=start; i<start+rangeSize; i++) {
                ret.push(i);
            }
            return ret;
        };

        $scope.prevPage = function() {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.prevPageDisabled = function() {
            return $scope.currentPage === 0 ? "disabled" : "";
        };

        $scope.pageCount = function() {
            return Math.ceil($scope.objAry.length/$scope.itemsPerPage)-1;
        };

        $scope.nextPage = function() {
            if ($scope.currentPage < $scope.pageCount()) {
                $scope.currentPage++;
            }
        };

        $scope.nextPageDisabled = function() {
            return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
        };

        $scope.setPage = function(n) {
            $scope.currentPage = n;
        };

    });
