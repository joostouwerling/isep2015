/**
 * This service stores the autrhentication token data in
 * local storage or falls back on cookies if local storage
 * is not available.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.auth.AuthPersistence', [
    'angularLocalStorage'
])


.factory('AuthPersistence', ['storage', function AuthPersistence(storage) {
    
    var AuthPersistence = {};
    
    AuthPersistence.removeAll = function removeAllLocalstorage() {
        storage.remove("user");
        storage.remove('jwt');
    };
    
    AuthPersistence.getToken = function getAuthToken() {
        return storage.get('jwt');
    };
    
    AuthPersistence.getUser = function getLocalUserData() {
        return storage.get('user');
    };
    
    AuthPersistence.setData = function setLoginData(token, user) {
        storage.set("jwt", token);
        storage.set("user", user);
    };
    
    AuthPersistence.setUser = function setUser(user) {
        storage.set("user", user);
    };
    
    return AuthPersistence;
    
    
}]);