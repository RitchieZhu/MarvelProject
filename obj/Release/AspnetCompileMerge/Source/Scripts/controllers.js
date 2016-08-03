

// Google Analytics Collection APIs Reference:
// https://developers.google.com/analytics/devguides/collection/analyticsjs/

angular.module('app.controllers', ['marvelApp.config'])

    // Path: /
    .controller('HomeCtrl', ['$scope', '$location', '$window', '$http', 'marvelservice', 'marvelApiUrl', 'marvelApiKey', function ($scope, $location, $window, $http, marvelservice, marvelApiUrl, marvelApiKey) {
        $scope.$root.title = 'Ritchie Marvel Test App';

        $scope.marvelApiUrl = marvelApiUrl;
        $scope.marvelApiKey = marvelApiKey;
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });

            
        });


        //define the variables for the current scope
        $scope.books = [];
        $selectedBook = {};

        $scope.getBookDetails = getBookDetails;
        $scope.closeModal = closeModal;
        $scope.PrevPage = PrevPage;
        $scope.NextPage = NextPage;
        $scope.getData = getData;
        $scope.Page = 1;
        $scope.totalPages = 0;
       
        init();
        function init() {
            //if on the first page, disable the Previous page link
            if ($scope.Page == 1) {
                $('#prvPage').addClass('disabled');
            }
            else {
                $('#prvPage').removeClass('disabled');
            }


           

            //Tried to make the API calls as a service. Didn't work. 
            //var promiseData = marvelservice.getComics();
            //promiseData.then(function (resp) {
               
            //    var stats = {};
            //    //stats.year = year;
            //    stats.pics = [];



            //    if (resp.code === 200) {
            //        for (var i = 0; i < resp.data.results.length; i++) {
            //            var comic = resp.data.results[i];

            //            if (comic.thumbnail && comic.thumbnail.path != IMAGE_NOT_AVAIL) stats.pics.push(comic.thumbnail.path + "." + comic.thumbnail.extension);

            //            $scope.books.push(comic);
            //        }
            //    }
            //});
            getData($scope.Page);
            
        }

        function getData(pageOffset) {

            var IMAGE_NOT_AVAIL = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
               
            var numberOffset = pageOffset * 20;

            var ApiUrl =$scope.marvelApiUrl + '/comics?orderBy=title&limit=20&offset=' + numberOffset + '&format=comic&apikey=' + $scope.marvelApiKey;

            $http.get(ApiUrl).success(function (res) {

                var stats = {};
                //stats.year = year;
                stats.pics = [];


                if (res.code === 200) {
                    $scope.books = [];
                    $scope.totalPages = res.data.total / 20 + 1;
                    for (var i = 0; i < res.data.results.length; i++) {
                        var comic = res.data.results[i];

                        if (comic.thumbnail && comic.thumbnail.path != IMAGE_NOT_AVAIL) stats.pics.push(comic.thumbnail.path + "." + comic.thumbnail.extension);

                        $scope.books.push(comic);
                    }
                }

            }).error(function (data, status, headers, config) {
                alert("webservice call failed");
                $scope.status = status;
            });
        }

        function getBookDetails(resUrI) {
            $http.get(resUrI + '?apikey='+ $scope.marvelApiKey).success(function (res) {
                $scope.selectedBook = res.data.results[0];
                $('#lightBoxContainer').show(600);
                $('#lightBoxMask').show();

            });
        }
        
        //a function to control the light box       
        function closeModal() {
            $('#lightBoxContainer').hide();
            $('#lightBoxMask').hide(500);
        }
        
        function PrevPage() {
            if ($scope.Page > 1) {
                $scope.Page = $scope.Page - 1;
                getData($scope.Page);
            }
            else
            {
                if(!($('#prvPage').hasClass('disabled')))
                {
                    $('#prvPage').addClass('disabled');
                }
            }
           
        }

        function NextPage() {
            if ($scope.Page < $scope.totalPages) {
                $scope.Page = $scope.Page + 1;
                if ($('#nextPage').hasClass('disabled')) {
                    $('#nextPage').removeClass('disabled');
                }

                getData($scope.Page);
            }
            else {
                $('nextPage').addClass('disabled');
            }

            if ($('#prvPage').hasClass('disabled'))
            {
                 $('#prvPage').removeClass('disabled');
            }
            
        }


    }])

    // Path: /about
    .controller('AboutCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'AngularJS SPA | About';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /login
    .controller('LoginCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'AngularJS SPA | Sign In';
        // TODO: Authorize a user
        $scope.login = function () {
            $location.path('/');
            return false;
        };
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }])

    // Path: /error/404
    .controller('Error404Ctrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {
        $scope.$root.title = 'Error 404: Page Not Found';
        $scope.$on('$viewContentLoaded', function () {
            $window.ga('send', 'pageview', { 'page': $location.path(), 'title': $scope.$root.title });
        });
    }]);