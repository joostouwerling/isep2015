/**
 * Initialize the development module and configure the base mock routes.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */
 
angular.module('CoffeeApp.dev', [
    'CoffeeApp.dev.mock.MockService',
    'CoffeeApp.dev.mock.UsersMock',
    'CoffeeApp.dev.mock.MoccamasterMock',
    'CoffeeApp.dev.mock.AuthMock',
    'CoffeeApp.dev.mock.StatisticsMock',
    'ngMockE2E'
])

.run(['$httpBackend', function($httpBackend) {
    
    $httpBackend.whenGET(/^/).passThrough();
    $httpBackend.whenPOST(/^/).passThrough();
    $httpBackend.whenPUT(/^/).passThrough();
    
}]);