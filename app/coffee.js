/**
 * The main file for the coffee app. It loads the necessary modules and
 * initizes the statistics logger.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp', [
    'CoffeeApp.users', 
    'CoffeeApp.auth',
    'CoffeeApp.statistics',
    'CoffeeApp.moccamaster',
    'CoffeeApp.config',
    'CoffeeApp.menu',
    
    /* comment this line out if you dont want the development mock api */
    /*'CoffeeApp.dev',*/
    
    /* required for the configuration below */
    'CoffeeApp.statistics.StatisticsLogger',
    'CoffeeApp.auth.AuthService'
    
])


/**
 * Inject the user object into the statistics logger
 */
.run(['StatisticsLogger', 'AuthService', function(StatisticsLogger, AuthService) {
    if(AuthService.isAuthenticated()) {
        StatisticsLogger.setUser(AuthService.getUser());
    }
}]);