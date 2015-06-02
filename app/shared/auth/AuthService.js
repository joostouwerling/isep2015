/**
 * The CoffeeAuth service, which handles the back end communication
 * for authentication and authorization.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */
 
angular.module('CoffeeApp.auth.AuthService', [
    'CoffeeApp.config',
    'CoffeeApp.auth.AuthPersistence'
])

.factory('AuthService',['$http', 'AuthPersistence', 'config.apiBase', 
    function AuthServiceFactory($http, AuthPersistence, apiBase) {
   
    var AuthService = {};
    
    AuthService.login = function logUserIn(username, password, success, error) {
       
       var formData = {
            'username' : username,
            'password' : password
        };
        
        $http.post(apiBase + 'authentication/login/', formData)
        
        /**
         * Successfully logged in.
         * Fetch the token and store it in localstorage.
         */
        .success(function(data, status, headers, config) {
            if(!data.token) {
                error(500, "No token provided by the server.");
            } else {
                AuthPersistence.setData(data.token, data.user);
                success(data.user);
            }
        
        /**
         * No success in loggin in due to various reasons.
         */
        }).error(function(data, status, headers, config) {
            if(data == undefined || data.error == undefined) {
                data = {error : "The API could not be reached."};
            }
            if(status == undefined) {
                status = 500;
            }
            error(status, data.error);
        });
        
    };
   
    AuthService.logout = function LogUserOut() {
       AuthPersistence.removeAll();
    };
   
    AuthService.isAuthenticated = function returnTrueIfAuthenticated() {
        return AuthPersistence.getToken() != null;
    };
    
    AuthService.getUser = function getLocalUserData() {
        return AuthPersistence.getUser();
    };
    
    AuthService.changeUsername = function changeUsername(username) {
        var user = AuthPersistence.getUser();
        user.username = username;
        AuthPersistence.setUser(user);
    };
   
    return AuthService;
    
}]);