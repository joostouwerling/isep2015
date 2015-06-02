/**
 * An adapter for the AnalyticsAdapter which makes it possible
 * to log app specific events. It has a user dependency.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */


angular.module('CoffeeApp.statistics.StatisticsLogger', [
    'CoffeeApp.statistics.AnalyticsAdapter'    
])


.factory('StatisticsLogger', ['AnalyticsAdapter',  function StatisticsLogger(AnalyticsAdapter) {
    
    var StatisticsLogger = {};
    
    var user = null;
    
    StatisticsLogger.logTurnOn = function logTurOn() {
        AnalyticsAdapter.logEvent('Moccamaster', 'turnOn', user.username);    
    };
    
    StatisticsLogger.logTurnOff = function logTurnoff() {
        AnalyticsAdapter.logEvent('Moccamaster', 'turnOff', user.username);
    };
    
    StatisticsLogger.logChangeSupply = function logChangeSupply() {
        AnalyticsAdapter.logEvent('Moccamaster', 'changeSupplyFlag', user.username);
    };
    
    /**
     * Dependency injector for the username
     */
    StatisticsLogger.setUser = function setUser(u) {
        user = u;
    };
    
    return StatisticsLogger;
    
}]);