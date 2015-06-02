/**
 * Auth/forgetpassword component bootstrap. Defines routes and load controller.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.auth.forgotPassword', [
    'ngRoute',
    'CoffeeApp.auth.forgotPassword.ForgotPasswordController',
    'CoffeeApp.auth.forgotPassword.SetNewPasswordController',
])

.config(['$routeProvider', function($routeProvider) {
    
    $routeProvider
    
    .when('/forgotpassword', {
        templateUrl : 'app/components/auth/forgotPassword/forgot-password.html',
        controller: 'ForgotPasswordController'
    })
    .when('/forgotpassword/:key', {
        templateUrl : 'app/components/auth/forgotPassword/forgot-password-setnew.html',
        controller: 'SetNewPasswordController'
    });
    
    
}]);