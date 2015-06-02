/**
 * The bootstrap file for the users component. Load the required
 * subcomponents and configure the routes.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */
 
angular.module('CoffeeApp.users', [
    'CoffeeApp.users.edit',
    'CoffeeApp.users.create',
    'CoffeeApp.users.list',
    'ngRoute'
])

.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider
    .when('/users', {
        templateUrl : 'app/components/users/list/list.html',
        controller: 'ListUsersController'
    })
    .when('/users/new', {
        templateUrl : 'app/components/users/edit/EditUser.html',
        controller: 'CreateUserController'
    })
    .when('/users/:userId', {
        templateUrl : 'app/components/users/edit/EditUser.html',
        controller: 'EditUserController'
    });
    
}]);