/**
 * Log a user in. If correct, the user gets redirect to
 * /moccamaster, which is the main page for logged in users.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */ 
 

angular.module('CoffeeApp.auth.login', [
    'CoffeeApp.auth.AuthService'    
])


.controller('LoginController', [
    '$scope', 'AuthService', '$location', 
    function LoginController($scope,  AuthService, $location) {
    
    if(AuthService.isAuthenticated()) {
        $location.path("/moccamaster");
    }
    
    $scope.errorMessage = null;
    $scope.isLoading = false;
    
    $scope.login = function doLoginAttempt() {
        
        $scope.isLoading = true;
        AuthService.login($scope.username, $scope.password, 
            function successfulLogin(user) {
                window.location = "./";
            },
            function failedLogin(status, err) {
                $scope.isLoading = false;
                $scope.errorMessage = err;
            }
        );
        
    };
    
}]);