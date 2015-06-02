/**
 * This service handles the api handling of the forgot password
 * process.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.auth.forgotPassword.ForgotPasswordService', [
    'CoffeeApp.config'
])

.factory('ForgotPasswordService', ['$http', 'config.apiBase',
    function ForgotPasswordService($http, apiBase) {
        
    var ForgotPasswordService = {};
    
    /**
     * Request a new password reset link for a user
     */
    ForgotPasswordService.requestPasswordReset = function requestPasswordReset(username, success, error) {
        
        var formData = {
            username: username
        };
        
        $http.post(apiBase + 'authentication/forgot/', formData)
        .success(success)
        .error(
            function(data) {
                error(data.error ? data.error : "Unknown error occured.");
            }
        );
        
    };
    
    /**
     * Fetch a request by a key.
     */
    ForgotPasswordService.fetchRequestUserByKey = function fetchRequestUserByKey(key, success, error) {
        $http.get(apiBase + 'authentication/recover/' + key)
        .success(
            function(data) {
                success(data.username);
            }
        ).error(
            function(data) {
                error(data.error ? data.error : "Unknown error occured.");
            }
        );
    };
    
    /**
     * Set a new password for the user
     */
    ForgotPasswordService.setNewPassword = function setNewPassword(key, password, success, error) {
        var formData = {
            password: password
        };
        $http.put(apiBase + 'authentication/recover/' + key, formData)
        .success(success)
        .error(
            function(data) {
                error(data.error ? data.error : "Unknown error occured.");
            }
        );  
    };
    
    
    return ForgotPasswordService;
    
}]);