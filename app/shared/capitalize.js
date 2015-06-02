/**
 * This filters capitalizes words, i.e. :
 * TABLE -> Table
 * table -> Table
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.capitalize', [])

.filter('capitalize', function() {
    return function(input, scope) {
        return input.substring(0,1).toUpperCase()+input.substring(1).toLowerCase();
    }
})