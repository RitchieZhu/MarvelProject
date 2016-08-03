

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('app.services', [])

    .value('version', '0.1')

    .service('marvelservice', ['$http', function ($http) {
        

        //var marvelServiceFactory = {};

        //var _getComics = function () {
        //    return $http.get(serviceUri + '/comics?format=comic&apikey=6aaa6dc26750c55c6baecb37eb95e7eb').then(function (results) {
        //        return results;
        //    });
        //};

        //marvelServiceFactory.getComics = _getComics;
        //return marvelServiceFactory;


        this.getComics = function () {
            var serviceUri = "http://gateway.marvel.com:80/v1/public/";

            return $http({
                method: 'GET',
                url: serviceUri + 'comics?format=comic&apikey=6aaa6dc26750c55c6baecb37eb95e7eb',
                params: 'limit = 100'
            });

        }

    }]);