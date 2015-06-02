/**
 * Some utilities for the mockup api.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */ 
 
angular.module('CoffeeApp.dev.mock.MockService', [])

.factory('MockService', function() {
   
   var MockService = {};
   
   /**
    * Get the query string in a JS object format.
    */
   MockService.getQueryString = function getQueryString(string) {
        if(string instanceof Object){
            return string;
        }
        var pairs = string.split('&');
    
        var result = {};
        pairs.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
        return result;
   };
   
   /**
    * Get the user by the given header token. If invalid or the 
    * user cant be found, return null.
    */
    MockService.getUserByHeader = function getUserByHeader(headers) {
        var users = MockService.fakeUsers;
        if(!headers.Authorization) {
            return null;
        }
        var head = headers.Authorization.split(" ");
        if(head.length != 2) {
            return null;
        }
        var tokens = head[1].split(":");
        if(tokens.length != 2) {
            return null;
        }
        var id = tokens[1];
        for(var i = 0; i < users.length; i++) {
            if(users[i].id == id) {
                return users[i];
            }
        }
        return null;
    };
    
    /**
     * Get the role of a user based on the auth token header.
     */
    MockService.getRoleByHeader = function getRoleByHeader(headers){
        var user = MockService.getUserByHeader(headers);
        return user == null ? null : user.role;
    };
    
    /**
     * Get the id of a user based on the auth token header.
     */
    MockService.getIdByHeader = function getIdByHeader(headers){
        var user = MockService.getUserByHeader(headers);
        return user == null ? null : user.id;
    };
    
    
    /**
     * The default list of fake users.
     */
    MockService.fakeUsers = [{
        id: 1,
        username: 'admin',
        email: 'email@domain.com',
        role: 'admin',
        disabled: false
    },
    {
        id: 2,
        username: 'user',
        email: 'email@domain.com',
        role: 'user',
        disabled: false
    },
    {
        id: 3,
        username: 'user2',
        email: 'email@domain.com',
        role: 'user',
        disabled: false
    }];
    
    return MockService;
    
});