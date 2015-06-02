/**
 * An adapter for the loaded analytics object so it easily usable in
 * our angular project.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.statistics.AnalyticsAdapter', [])


.factory('AnalyticsAdapter', function AnalyticsAdapter($rootScope, $location) {
    
    var AnalyticsAdapter = {};
    
    /**
     * Check if analytics is loaded.
     */
    var analyticsLoaded = function analyticsLoaded() {
        return (typeof ga !== 'undefined' && ga != null);
    };
    
    /**
     * Get the Analytics object.
     */
    var getAnalytics = function getAnalytics() {
        if(analyticsLoaded()) {
            return ga;
        }
        return null;
    };
    
    /**
     * This function has to be called by the run function of this module.
     */
    AnalyticsAdapter.activatePageviewLogger = function activatePageviewLogger() {
        if(!analyticsLoaded()) {
            return;
        }
        $rootScope.$on('$routeChangeSuccess', function(){
            getAnalytics()('send', 'pageview', $location.path());
        }); 
    };
    
    /**
     * Log an custom event. Used by other methods.
     */
    AnalyticsAdapter.logEvent = function logEvent(category, action, label) {
        if(!analyticsLoaded()) {
            return;
        }
        getAnalytics()('send', 'event', category, action, label);
    };
    
    return AnalyticsAdapter;
    
})

/**
 * Log pageview statistics
 */
.run(['AnalyticsAdapter', function(AnalyticsAdapter) {
    AnalyticsAdapter.activatePageviewLogger();
}]);