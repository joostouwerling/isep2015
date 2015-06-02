/**
 * The Mockup API for the statistics access token api
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */ 
 
angular.module('CoffeeApp.dev.mock.StatisticsMock', [
    'ngMockE2E',
    'CoffeeApp.config'
])

.run(['$httpBackend', 'config.apiBase',
    function($httpBackend, apiBase) {
        
    $httpBackend.whenGET(apiBase + 'statistics/gettoken').respond(
        function() {
            return [200, {token: 'ya29.hgH480gayz3M8VGCLPD_oTOa7MKDvUyZUgY-vGCg7bgEn5RbdC6Gk0Cp4mF1RX6473aJNHt_JvNiew', expiresAt: 0}];
        }
    );
        
}]);