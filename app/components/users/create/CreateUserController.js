/**
 * Create a new user. Default values for role and disabled are
 * resp. user and false. It has a listener for the save button. 
 * It uses the same HTML form as CreateUserController,
 * so some scope vars are used for display purposes.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */

angular.module('CoffeeApp.users.create', [
    'CoffeeApp.users.UserService'
])

.controller('CreateUserController', ['$scope', 'UserService', function($scope, UserService) {
    
    $scope.isNewUser = true;
    $scope.errorMessage = null;
    $scope.successMessage = null;
    $scope.showForm = true;
    $scope.isLoading = false;
    
    $scope.user = new UserService();
    $scope.user.role = "user";
    $scope.user.disabled = false;
    
    $scope.save = function saveUser() {
        if($scope.user.password != $scope.passwordRepeat) {
            $scope.successMessage = null;
            $scope.errorMessage = "The passwords are unequal.";
            return;
        }
        $scope.isLoading = true;
        $scope.user.$save(
            function userCreatedSuccesfully() {
                $scope.isLoading = false;
                $scope.errorMessage = null;
                $scope.showForm = false;
                $scope.successMessage = "The user has been created.";
            },
            function failedCreation(error) {
                $scope.isLoading = false;
                $scope.errorMessage = error.data.error;
            }
        );
    }
    
}]);