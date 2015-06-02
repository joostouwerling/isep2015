/**
 * Auth component bootstrap. Defines routes and load controller.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.auth', [
    'ngRoute',
    'CoffeeApp.auth.login',
    'CoffeeApp.auth.logout',
    'CoffeeApp.auth.forbidden',
    'CoffeeApp.auth.forgotPassword',
])

.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider
    
    .when('/login', {
        templateUrl : 'app/components/auth/login/login.html',
        controller: 'LoginController'
    })
    .when('/logout', {
        templateUrl : 'app/components/auth/logout/logout.html',
        controller: 'LogoutController'
    })
    .when('/forbidden', {
        templateUrl : 'app/components/auth/forbidden/forbidden.html',
        controller: 'ForbiddenController'
    });
    
    
}]);