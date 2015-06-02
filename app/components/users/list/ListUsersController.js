/**
 * Query the api for a list of all users. 
 * There is also a binding for the deleting of a user.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.users.list', [
    'CoffeeApp.users.UserService'
])


.controller('ListUsersController', ['$scope', 'UserService',  
    function($scope, UserService) {
    
    $scope.isLoading = true;
    $scope.users = UserService.query(function() {
        $scope.isLoading = false;
    });
    
    /**
     * Delete a user. The input index equals
     * the index in the $scope.users array.
     */
    $scope.delete = function deleteUser(index) {
        var user = $scope.users[index];
        var sureDeleteUser = window.confirm("Are you sure you want to delete user " + user.username + " with id " + user.id + "?");
        if(sureDeleteUser) {
            user.$delete(
                function userDeletedSuccesfully() {
                    $scope.users.splice(index, 1);
                },
                function failedDeletion(error) {
                    alert("Error: " + error.data.error);
                }
            );
        }
    };
    
    
}]);