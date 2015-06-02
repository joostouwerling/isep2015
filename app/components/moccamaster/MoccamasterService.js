/**
 * This service handles the API talking with the Moccamaster.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */ 
 
angular.module('CoffeeApp.moccamaster.MoccamasterService', [
    'CoffeeApp.config'
])

.factory('MoccamasterService', ['$http', 'config.apiBase', function Moccamaster($http, apiBase) {
    
    var MoccamasterService = {};
    
    MoccamasterService.fetch = function getMoccamasterStatus(success, error) {
        $http.get(apiBase + 'coffeemachine/status/').success(success).error(
            function(data) {
                error(data.error ? data.error : "Unknown error occured.");
            }
        );
    };
    
    
    MoccamasterService.setSupplyFlag = function setSupplyFlag(state, success, error) {
        var url = 'coffeemachine/set' + (state ? 'high/' : 'low/');
        $http.put(apiBase + url).success(success).error(
            function (data) {
                error(data.error ? data.error : "Unknown error occured.");
            }
        );
    };
    
    MoccamasterService.turnOn = function turnOn(success, error) {
        $http.put(apiBase + 'coffeemachine/start/').success(success).error(
            function(data) {
                error(data.error ? data.error : "Unknown error occured.");
            }
        );
    };
    
    
    MoccamasterService.turnOff = function turnOn(success, error) {
        $http.put(apiBase + 'coffeemachine/stop/').success(success).error(
            function(data) {
                error(data.error ? data.error : "Unknown error occured.");
            }
        );
    };
    
    
    return MoccamasterService;
    
}]);