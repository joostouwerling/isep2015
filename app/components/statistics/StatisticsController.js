/**
 * This controller for showing statistics. It heavily uses the StatisticsView
 * service for accessing the embed api.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */


angular.module('CoffeeApp.statistics.StatisticsController', [
    'CoffeeApp.statistics.StatisticsView',
    'CoffeeApp.capitalize'    
])

.controller('StatisticsController', ['$scope', 'StatisticsView', function StatisticsController($scope, StatisticsView) {
    
    $scope.analyticsAvailable = false;
    
    /**
     * Default options and load available filters
     */
    $scope.allowableActions = StatisticsView.actions;
    $scope.allowableCharts = ['TABLE'];
    $scope.dimensions = StatisticsView.dimensions;
    
    
    var curDate = new Date();
    var weekAgo = new Date();
    weekAgo.setDate(curDate.getDate() - 7);
    
    $scope.filters = {
        'username': null,
        'action': null,
        'dateRange': {
            'start': weekAgo,
            'end': curDate
        },
        'dimension': null,
        'chartType': 'TABLE',
        'dimensions': {
            'date': true,
            'username': true,
            'action': true
        }
    };
    
    /**
     * When the view content is loaded, initialize the embed api.
     * Listen to a change in the filters and apply them when they change,
     */
    $scope.$on('$viewContentLoaded', function(){
        $scope.analyticsAvailable = StatisticsView.embedApiAvailable();
        gapi.analytics.ready(function() {
            StatisticsView.initialize('statsContainer', function success() {
                showStatistics();
                $scope.$watch('filters', function() {
                    $scope.allowableCharts = getAvailableChartTypes();
                    checkChartType();
                    showStatistics();
                }, true);
            });
        });
    });
    
    var showStatistics = function showStatistics() {
        StatisticsView.setFilters($scope.filters);
        StatisticsView.execute();  
    };
    
    /**
     * Get the available chart types based on the dimension selections.
     */
    var getAvailableChartTypes = function() {
        var activated = 0;
        if($scope.filters.dimensions.date == true) {
            activated++;
        }
        if($scope.filters.dimensions.username == true) {
            activated++;
        }
        if($scope.filters.dimensions.action == true) {
            activated++;
        }
        if(activated != 1) {
            return ['TABLE'];
        }
        if($scope.filters.dimensions.date == true) {
            return ['TABLE', 'LINE'];
        }
        return ['TABLE', 'PIE', 'BAR'];
    };
    
    /**
     * Check if the selected chart type is allowable. This can be
     * the case when changing from 1 to n dimensions, and the view 
     * was not a table.
     */
    var checkChartType = function checkChartType() {
        for(var i = 0; i < $scope.allowableCharts.length; i++) {
            if($scope.allowableCharts[i] == $scope.filters.chartType) {
                return;
            }
        }
        $scope.filters.chartType = $scope.allowableCharts[0];
    };
    
}]);