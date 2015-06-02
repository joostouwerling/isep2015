/**
 * The menu controller. This is mainly used for setting the 
 * active/inactive status of the navbar.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.menu', [
    'CoffeeApp.auth.AuthService'    
])


.controller('MenuController', ['$location', '$scope', 'AuthService', 
    function menuController($location, $scope, AuthService) {
        
    $scope.isActive = function (viewLocation) {
        var active = $location.path().indexOf(viewLocation) >= 0;
        return active;
    };
    
    $scope.authenticated = AuthService.isAuthenticated();
    $scope.isAdmin = $scope.authenticated ? AuthService.getUser().role == "admin" : false;
    $scope.userId = $scope.authenticated ? AuthService.getUser().id : null;
    
}]);