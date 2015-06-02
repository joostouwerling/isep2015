/**
 * Statistics component bootstrap. Defines routes and load controller.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.statistics', [
    'ngRoute',
    'CoffeeApp.statistics.StatisticsController'
])

.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider.when('/statistics', {
        templateUrl : 'app/components/statistics/statistics.html',
        controller : 'StatisticsController'
    })
    
}]);