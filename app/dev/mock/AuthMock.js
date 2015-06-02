/**
 * The Mockup API for theusers part.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */ 

 
angular.module('CoffeeApp.dev.mock.AuthMock', [
    'ngMockE2E',
    'CoffeeApp.config',
    'CoffeeApp.dev.mock.MockService'
])

.run(['$httpBackend', 'config.apiBase', 'MockService', 
    function($httpBackend, apiBase, MockService) {
        
    /**
     * Dummy user data
     */
    var users = MockService.fakeUsers;
    
    /**
     * Dummy forgot password requests
     */
    var passwordRequests = [{
        key: 'key123',
        userId: 2
    }];
    
    
    /**
     * Initialize a forget request.
     */
    $httpBackend.whenPOST(apiBase + 'authentication/forgot/').respond(
        function (method, url, data, headers) {
            var input = MockService.getQueryString(data);
            if(!input.username) {
                return [400, {error: "Username was not sent!"}];
            }
            for(var i = 0; i < users.length; i++) {
                if(users[i].username == input.username) {
                    passwordRequests.push({key: 'key', userId: users[i].id});
                    return [204];
                }
            }
            return [404, {error: "User not found!"}];
        }    
    );
    
    /**
     * Handle a  user who clicked at a forgot password link
     */
    $httpBackend.whenGET(new RegExp(apiBase + 'authentication/recover/[a-zA-Z0-9]+')).respond(
        function (method, url, data, headers) {
            
            var regexp = new RegExp('\\/recover\\/([a-zA-Z0-9]+)');
            var key = url.match(regexp)[1];
            
            for(var i = 0; i < passwordRequests.length; i++) {
                if(passwordRequests[i].key == key) {
                    /* We found the password request. Find the corresponding user. */
                    for(var j = 0; j < users.length; j++) {
                        if(users[j].id == passwordRequests[i].userId) {
                            return [200, {username: users[j].username}];
                        }
                    }
                    return [404, {error: "The user could not be found."}];
                }
            }
            return [404, {error: "The request could not be found."}];
            
        }
    );
    
    
    /**
     * Handle a new password
     */
    $httpBackend.whenPUT(new RegExp(apiBase + 'authentication/recover/[a-zA-Z0-9]+')).respond(
        function (method, url, data, headers) {
            
            var regexp = new RegExp('\\/recover\\/([a-zA-Z0-9]+)');
            var key = url.match(regexp)[1];
            
            var input = MockService.getQueryString(data);
            if(!input.password) {
                return [400, {error: "Password was not sent!"}];
            }
            
            for(var i = 0; i < passwordRequests.length; i++) {
                if(passwordRequests[i].key == key) {
                    /* We found the password request. Find the corresponding user. */
                    for(var j = 0; j < users.length; j++) {
                        if(users[j].id == passwordRequests[i].userId) {
                            console.log("Setting password for user " + users[j].username + " to " + input.password);
                            return [204];
                        }
                    }
                    return [404, {error: "The user could not be found."}];
                }
            }
            return [404, {error: "The request could not be found."}];
            
        }
    );
    
    
    /**
     * Authentication
     */
    $httpBackend.whenPOST(apiBase + 'authentication/login/').respond(
        function(method, url, data, headers) {
            var defPassword = "password";
            var input = MockService.getQueryString(data);
            if(!input.username || !input.password) {
                return [400, {error: "Not all fields were present in the input."}];
            }
            for(var i = 0; i < users.length; i++) {
                if(users[i].username == input.username && defPassword == input.password) {
                    return [200, {user: users[i], token: "token:" + users[i].id}];
                }
            }
            return [404, {error: "User not found."}];
        }    
    );
    
}]);