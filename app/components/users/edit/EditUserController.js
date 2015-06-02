/**
 * Edit an existing user. First, it is verified that the user exists.
 * If not, the form shows an error. Otherwise it has a listener for 
 * the save button. It uses the same HTML form as CreateUserController,
 * so some scope vars are used for display purposes.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.users.edit', [
    'CoffeeApp.users.UserService',
    'CoffeeApp.auth.AuthService'
])

.controller('EditUserController', [
    '$scope', '$routeParams', 'UserService', 'AuthService', 
    function($scope, $routeParams, UserService, AuthService) {
    
    $scope.isNewUser = false;
    $scope.errorMessage = null;
    $scope.successMessage = null;
    $scope.showForm = false;
    $scope.isLoading = true;
    $scope.passwordRepeat = null;
    // When the user is not an admin and is allowed to view the page, he's editing himself.
    $scope.editHimself = (AuthService.isAuthenticated() && AuthService.getUser().role != 'admin');
    
    /**
     * Load a certain user by the given id.
     */
    $scope.user = UserService.get({id : $routeParams.userId}, 
        function userFound(){
            $scope.showForm = true;
            $scope.isLoading = false;
        }, function userNotFound(error) {
            $scope.showForm = false;
            $scope.isLoading = false;
            $scope.errorMessage = error.data.error;
        }
    );
    
    /**
     * Save the user with the updated fields.
     */
    $scope.save = function updateUser() {
        if($scope.user.password != $scope.passwordRepeat) {
            $scope.successMessage = null;
            $scope.errorMessage = "The passwords are unequal.";
            return;
        }
        $scope.isLoading = true;
        UserService.update({id: $scope.user.id}, $scope.user, 
            function userUpdatedSuccesfully() {
                $scope.isLoading = false;
                $scope.errorMessage = null;
                $scope.successMessage = "The user has been updated.";
                AuthService.changeUsername($scope.user.username);
            },
            function failedUpdate(error) {
                $scope.isLoading = false;
                $scope.successMessage = null;
                $scope.errorMessage = error.data.error;
            }
        );
    };
    
}]);