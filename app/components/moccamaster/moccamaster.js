/**
 * Moccamaster component bootstrap. Defines routes and load controller.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.moccamaster', [
    'ngRoute',
    'CoffeeApp.moccamaster.MoccamasterController'
])

.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider.when('/moccamaster', {
        templateUrl : 'app/components//moccamaster/moccamaster.html',
        controller : 'MoccamasterController'
    });
    
}]);