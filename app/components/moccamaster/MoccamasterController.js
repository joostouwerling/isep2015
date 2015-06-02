/**
 * The Moccamaster controller. Also logs events using the StatisticsLogger.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.moccamaster.MoccamasterController', [
    'CoffeeApp.config',
    'CoffeeApp.moccamaster.MoccamasterService',
    'CoffeeApp.statistics.StatisticsLogger'
])

.controller('MoccamasterController', ['$scope', '$interval', 'MoccamasterService', 'StatisticsLogger', 
    function CoffeeControl($scope, $interval, MoccamasterService, StatisticsLogger) {
    
    $scope.isLoading = true;
    $scope.moccamaster = null;
    
    /**
     * Load the data from the server. This also does the 
     * access rights check.
     */
    MoccamasterService.fetch(
        function moccamasterDataLoadedSuccesfully(moccamasterInstance) {
            $scope.moccamaster = moccamasterInstance;
            if(moccamasterInstance.state == "On") {
                startProgressBar();
            }
            $scope.isLoading = false;
        },
        function errorLoadingMoccamasterData(error) {
            $scope.errorMessage = error;
            $scope.isLoading = false;
        }
    );
    
    /**
     * Change the supply flag to the opposite of the current one.
     */
    $scope.changeSupplyFlag = function changeSupplyFlag() {
        MoccamasterService.setSupplyFlag(!$scope.moccamaster.supplies,
            function supplyFlagChangedSuccesfully() {
                StatisticsLogger.logChangeSupply();
                $scope.moccamaster.supplies =  !$scope.moccamaster.supplies;
            },
            function errorChangingSupplyFlag(error) {
                $scope.errorMessage = error;
            }
        );
    };
    
    /**
     * Turn the machine on
     */
    $scope.turnMoccamasterOn = function turnMoccamasterOn() {
        if($scope.moccamaster.supplies == false) {
            var goOn = confirm("Are you sure you want to start the Moccamaster? There are probably no supplies!");
            if(goOn == false) {
                return;
            }
        }
        MoccamasterService.turnOn(
            function moccamasterTurnedOnSuccesfully(moccamasterInstance) {
                StatisticsLogger.logTurnOn();
                $scope.moccamaster = moccamasterInstance;
                startProgressBar();
            },
            function errorTurningOnMoccamaster(error) {
                $scope.errorMessage = error;
            }
        );
    };
    
    /**
     * Turn the machine off
     */
    $scope.turnMoccamasterOff = function turnMoccamasterOff() {
        MoccamasterService.turnOff(
            function moccamasterTurnedOffSuccesfully(moccamasterInstance) {
                StatisticsLogger.logTurnOff();
                $scope.moccamaster = moccamasterInstance;
                stopProgressBar();
            },
            function errorTurningOffMoccamaster(error) {
                $scope.errorMessage = error;
            }
        );
    };
    
    
    /*****************
     * This is for showing the progress bar
     */
    
    $scope.percentage = 0;
    
    var updateInterval;
    var startProgressBar = function startProgressBar() {
        var count = $scope.moccamaster.timeleft;
        if( angular.isDefined(updateInterval) ) return;
        
        updateInterval = $interval(function() {
            $scope.moccamaster.timeleft--;
            $scope.percentage = Math.round( ($scope.moccamaster.endtime - $scope.moccamaster.timeleft - $scope.moccamaster.starttime) / ($scope.moccamaster.endtime - $scope.moccamaster.starttime) * 1000)/10;
            // error catch
            if($scope.percentage > 100) {
                $scope.percentage = 100;
                $scope.moccamaster.timeleft = 0;
            }
        }, 1000, count);
    };
    
    var stopProgressBar = function stopProgressBar() {
        if(angular.isDefined(updateInterval)) {
            $interval.cancel(updateInterval);
            updateInterval = undefined;
        }
        $scope.percentage = 0;
        $scope.secsLeft = 0;
    };
    
}]);