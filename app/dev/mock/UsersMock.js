/**
 * The Mockup API for theusers part.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */ 
 
 
angular.module('CoffeeApp.dev.mock.UsersMock', [
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
     * Get a list of all users.
     */
    $httpBackend.whenGET(apiBase + 'users/').respond(
        function(method, url, data, headers) {
            var role = MockService.getRoleByHeader(headers);
            if(role == null) {
                return [401, {error: "We can't authenticate you."}];
            }
            if(role != "admin") {
                return [403, {error: "Only admins can fetch single users."}];
            }
            return [200, users];
        }
    );
  
    /**
     * Request a specific user by ID
     */
    $httpBackend.whenGET(new RegExp('\\/users\\/[0-9]+')).respond(
        function(method, url, data, headers){
            
            var regexp = new RegExp('\\/users\\/([0-9]+)');
            var userId = url.match(regexp)[1];
            
            var user = MockService.getUserByHeader(headers);
            if(user == null) {
                return [401, {error: "We can't authenticate you."}];
            }
            if(user.role != "admin" && user.id != userId) {
                return [403, {error: "Only admins can fetch single users."}];
            }
            
            var i;
            for(i = 0; i < users.length; i++) {
                if(users[i].id == userId) {
                    return [200, users[i]];
                }
            }
            return [404, {error: "This user could not be found."}];
        }
    );
  
    /**
     * Delete a user by a given ID
     */
    $httpBackend.whenDELETE(new RegExp(apiBase + 'users\\/[0-9]+')).respond(
        function(method, url, data, headers){
            
            var role = MockService.getRoleByHeader(headers);
            if(role == null) {
                return [401, {error: "We can't authenticate you."}];
            }
            if(role != "admin") {
                return [403, {error: "Only admins can fetch single users."}];
            }
            
            var regexp = new RegExp(apiBase + 'users\\/([0-9]+)');
            var userId = url.match(regexp)[1];
            var i;
            for(i = 0; i < users.length; i++) {
                if(users[i].id == userId) {
                    users.splice(i, 1);
                    return [200];
                }
            }
            return [404, {error: "This user could not be found."}];
        }
    );
  
    /**
     * Update a user. The ID is in the url, the complete user in the
     * querystring. Return an object of the updated user.
     */
    $httpBackend.whenPUT(new RegExp(apiBase + 'users\\/[0-9]+')).respond(
        function(method, url, data, headers){
            
            var regexp = new RegExp(apiBase + 'users\\/([0-9]+)');
            var userId = url.match(regexp)[1];
            
            
            var user = MockService.getUserByHeader(headers);
            if(user == null) {
                return [401, {error: "We can't authenticate you."}];
            }
            if(user.role != "admin" && user.id != userId) {
                return [403, {error: "You cant update this user."}];
            }
            
            var i;
            var user = null;
            for(i = 0; i < users.length; i++) {
                if(users[i].id == userId) {
                    user = users[i];
                }
            }
            if(user == null) {
                return [404, , {error: "This user could not be found."}];
            }
            var input = MockService.getQueryString(data);
            if(!input.username || !input.role || !input.email || !input.disabled) {
                return [400, {error: "Not all fields were present in the input."}];
            }
            if(input.username.length == 0 || input.email.length == 0) {
                return [400, {error: "Not all fields were present in the input."}];
            }
            if(input.role != "admin" && input.role != "user") {
                return [400, {error: "Invalid role."}];
            }
            if(input.disabled != "false" && input.disabled != "true") {
                return [400, {error: "Invalid disabled status."}];
            }
            user.username = input.username;
            user.email = input.email;
            user.role = input.role;
            user.disabled = input.disabled == "true" ? true : false;
            return [200, user];
        }
    );
  
    /**
     * Create a new user. Input in the query string. Return a newly 
     * created user object including id.
     */
    $httpBackend.whenPOST(apiBase + 'users/').respond(function(method, url, data, headers){
        
        var role = MockService.getRoleByHeader(headers);
        if(role == null) {
            return [401, {error: "We can't authenticate you."}];
        }
        if(role != "admin") {
            return [403, {error: "Only admins can fetch single users."}];
        }
        
        var input = MockService.getQueryString(data);
        if(!input.username || !input.password || !input.role || !input.email || !input.disabled) {
            return [400, {error: "Not all fields were present in the input."}];
        }
        if(input.username.length == 0 || input.password.length == 0 || input.email.length == 0) {
            return [400, {error: "Not all fields were present in the input."}];
        }
        if(input.role != "admin" && input.role != "user") {
            return [400, {error: "Invalid role."}];
        }
        if(input.disabled != "false" && input.disabled != "false") {
            return [400, {error: "Invalid disabled status."}];
        }
        var minId = 1;
        var i;
        for(i = 0; i < users.length; i++) {
            if(users[i].id > minId) {
                minId = users[i].id;
            }
        }
        var newUser = {
            username: input.username,
            id: minId + 1,
            email: input.email,
            role: input.role,
            disabled: input.disabled == "true" ? true : false
        };
        users.push(newUser);
        return [200, newUser];
    });
        
}]);