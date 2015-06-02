/**
 * The adapter for the api to get the access token for Analytics viewing.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */
 
 angular.module('CoffeeApp.statistics.AnalyticsAccessTokenAdapter', [
    'CoffeeApp.config'
])

.factory('AnalyticsAccessTokenAdapter', ['$http', 'config.apiBase', function($http, apiBase) {
    
    var getAccessToken = function getAccessToken(successCallback) {
        $http.get(apiBase + 'statistics/gettoken').success(
            function(data) {
                successCallback(data.token);
            }   
        ).error(
            function() {
                console.error('Cannot load access token.');   
            }
        );
    };
    
    return {
        getAccessToken: getAccessToken
    };
    
}]);