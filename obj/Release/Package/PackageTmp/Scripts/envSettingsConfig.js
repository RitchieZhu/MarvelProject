//(function (window) {
//    window.__env = window.__env || {};

//    // API url
//    window.__env.marvelApiUrl = 'http://gateway.marvel.com:80/v1/public';


//    //API_key
//    window.__env.marvelApiKey = '6aaa6dc26750c55c6baecb37eb95e7eb';

//    // Base url
//    window.__env.baseUrl = '/';

//    // Whether or not to enable debug mode
//    // Setting this to false will disable console output
//    window.__env.enableDebug = true;
//}(this));


var config_module = angular.module('marvelApp.config', [])
	.constant('marvelApiUrl', 'http://gateway.marvel.com:80/v1/public')
	.constant('marvelApiKey', '6aaa6dc26750c55c6baecb37eb95e7eb')
;

