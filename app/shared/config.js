/**
 * This module does some basic configuration. These things are done
 * - Set some constants and values
 * - Configure the default route
 * - Set the trailing slash settings
 * - Do the http transofmrtaions for the api.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */
 

angular.module('CoffeeApp.config', ['ngRoute'])

/**
 * The config api endpoint, should end with a slash
 */
.value('config.apiBase', './')

/**
 * The google analytics constant for showing statistics
 */
.constant('gaids', 'ga:101783654')


/**
 * Configure the default route for the app
 */
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({
        redirectTo : '/login'
    });
}])

/**
 * Configure $resource to use a trailing slash
 */
.config(['$resourceProvider', function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
}])

/**
 * This does two things:
 * 
 * 1) Send the authentication bearer token if available.
 * 
 * 2) Configure POST and PUT requests to be sent as a "traditional"
 * form submission. The parameters will be converted from JSOn to
 * a normal query string. See for more information this post:
 * http://stackoverflow.com/questions/19254029/angularjs-http-post-does-not-send-data
 */
.config(['$httpProvider', function($httpProvider) {
    
    // 1)
    $httpProvider.interceptors.push(['$q', '$location', 'AuthPersistence', 
    function configureAuthToken($q, $location, AuthPersistence) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                var token = AuthPersistence.getToken();
                if (token != null) {
                    config.headers.Authorization = 'Bearer ' + token;
                }
                return config;
            },
            'responseError': function(response) {
                if(response.status === 401) {
                    AuthPersistence.removeAll();
                    window.location = "./";
                } else if(response.status == 403) {
                    $location.path('/forbidden');
                }
                return $q.reject(response);
            }
        };
    }]);
    
    // Use x-www-form-urlencoded Content-Type
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
    
    /**
     * The workhorse; converts an object to x-www-form-urlencoded serialization.
    */ 
    var param = function(obj) {
        var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

        for(name in obj) {
            if(name == '$promise' || name == "$resolved") {
                continue;
            }
            value = obj[name];

            if(value instanceof Array) {
                for(i=0; i<value.length; ++i) {
                    subValue = value[i];
                    fullSubName = name + '[' + i + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value instanceof Object) {
                for(subName in value) {
                    subValue = value[subName];
                    fullSubName = name + '[' + subName + ']';
                    innerObj = {};
                    innerObj[fullSubName] = subValue;
                    query += param(innerObj) + '&';
                }
            }
            else if(value !== undefined && value !== null) {
                query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }
        }
        
            return query.length ? query.substr(0, query.length - 1) : query;
        };
        
        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }
]);