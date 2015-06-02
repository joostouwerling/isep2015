/**
 * Simple logout controller. Destroys the token and redirects.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */ 
 

angular.module('CoffeeApp.auth.logout', [
    'CoffeeApp.auth.AuthService'    
])

.controller('LogoutController', [
    '$scope', 'AuthService', '$location', 
    function LogoutController($scope, AuthService, $location){
        
    $scope.errorMessage = "You have been logged out.";
    AuthService.logout();
    window.location = "./";
    
}]);