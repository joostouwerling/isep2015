/**
 * This service handles showing the statistics. It connects the Embed api
 * to user configurable filters, defined in the Statistics Controller.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.statistics.StatisticsView', [
    'CoffeeApp.statistics.AnalyticsAccessTokenAdapter',
    'CoffeeApp.config'
])

.factory('StatisticsView', ['$filter', 'AnalyticsAccessTokenAdapter', 'gaids',
    function StatisticsView($filter, AnalyticsAccessTokenAdapter, gaids) {
    
    var StatisticsView = {};
    
    /**
     * Available dimensions and their allowable charts when selected alone
     */
    StatisticsView.dimensions = {
        'ga:date': {
            text: 'Date',
            allowableCharts: ['TABLE', 'LINE']
        },
        'ga:eventLabel': {
            text: 'Username',
            allowableCharts: ['TABLE', 'PIE', 'BAR']
        },
        'ga:eventAction': {
            text: 'Action',
            allowableCharts: ['TABLE', 'PIE', 'BAR']
        }
    };
    
    /**
     * Actions on which can be filtered
     */
    StatisticsView.actions = [
        {key: 'turnOn', text: 'Turn on'},
        {key: 'turnOff', text: 'Turn off'},
        {key: 'changeSupplyFlag', text: 'Change supply flag'},
    ];
    
    /**
     * The analytics instance
     */
    var instance = null;
    
    /**
     * Chart options which affect how the chart is displayed.
     */
    var chartOptions = {
        viewContainer: null,
        options: {
            fontSize: 12,
            width: '100%'
        },
        type: 'TABLE'
    };
    
    /**
     * User applied filters
     */
    var filters = {};
    
    /**
     * This function loads the access token sets basic chart configuration
     */
    StatisticsView.initialize = function initialize(viewContainer, successCallback) {
        
        AnalyticsAccessTokenAdapter.getAccessToken(function(token) {
            gapi.analytics.auth.authorize({
                serverAuth: {
                    access_token: token
                }
            });
            
            chartOptions.container = viewContainer;
            successCallback();
        });
        
    };
    
    /**
     * Show the statistics view based on the filters
     * applied by the user
     */
    StatisticsView.execute = function createInstance() {
        instance = null;
        instance = new gapi.analytics.googleCharts.DataChart({
            query: buildQuery(), 
            chart: angular.extend({}, chartOptions, {type: filters.chartType})
        });
        instance.execute();
    };
    
    /**
     * Build an embed api query based on the user filters.
     */
    var buildQuery = function buildQuery() {
        var query = {
            ids: gaids,
            metrics: 'ga:totalEvents',
            'start-date':  $filter('date')(filters.dateRange.start, 'yyyy-MM-dd'),
            'end-date':  $filter('date')(filters.dateRange.end, 'yyyy-MM-dd'),
            'filters': 'ga:hostname!=(not set)' // anti spam
        };
        query.dimensions = buildDimensions();
        if(filters.username != null && filters.username != "") {
            query.filters += ';ga:eventLabel=~^' + filters.username + '.*';
        }
        if(filters.action != null) {
            query.filters += ';ga:eventAction==' + filters.action.key;
        }
        return query;
    };
    
    /**
     * COnvert the user selected dimensions into a query component for the embed api
     */
    function buildDimensions() {
        var dimensions = '';
        dimensions += filters.dimensions.date == true ? 'ga:date,' : '';
        dimensions += filters.dimensions.username == true ? 'ga:eventLabel,' : '';
        dimensions += filters.dimensions.action == true ? 'ga:eventAction,' : '';
        if(dimensions.length > 0) {
            dimensions = dimensions.substr(0, dimensions.length - 1);
        }
        return dimensions;
    }
    
    /**
     * Check if the embed api is available.
     */
    StatisticsView.embedApiAvailable = function embedApiAvailable() {
        return (typeof gapi !== 'undefined' && typeof  gapi.analytics !== 'undefined' && gapi.analytics != null);
    };
    
    StatisticsView.setFilters = function setFilters(filtersParam) {
        filters = filtersParam;
    };
    
    return StatisticsView;
    
}]);