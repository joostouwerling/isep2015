/**
 * Set up the User resource, so it can be used in the
 * controllers without hassle. Make sure the update method
 * uses PUT.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */
 
angular.module('CoffeeApp.users.UserService', ['ngResource', 'CoffeeApp.config'])

.factory('UserService', ['$resource', 'config.apiBase', function($resource, apiBase) {
    return $resource(apiBase + 'users/:id', {id : '@id'}, {'update': {method:'PUT'}});
}]);