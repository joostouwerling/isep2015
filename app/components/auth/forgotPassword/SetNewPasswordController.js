/**
 * Set a new password for a user who clicked on
 * the link in the email.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */ 

angular.module('CoffeeApp.auth.forgotPassword.SetNewPasswordController', [
    'CoffeeApp.auth.forgotPassword.ForgotPasswordService'
])

.controller('SetNewPasswordController', ['$scope', '$routeParams', 'ForgotPasswordService', 
    function SetNewPasswordController($scope, $routeParams, ForgotPasswordService){
    
    $scope.key = $routeParams.key;
    $scope.username = null;
    
    $scope.isLoading = true;
    $scope.errorMessage = null;
    $scope.success = null;
    $scope.hideForm = false;
    
    /**
     * Fetch the specified request.
     */
    ForgotPasswordService.fetchRequestUserByKey($scope.key,
        function requestFound(username) {
            $scope.username = username;
            $scope.isLoading = false;
        },
        function requestNotFound(error) {
            $scope.errorMessage = error;
            $scope.isLoading = false;
            $scope.hideForm = true;
        }
    );
    
    /**
     * Handle the new password.
     */
    $scope.setNewPassword = function setNewPassword() {
        
        $scope.success = null;
        $scope.errorMessage = null;
        
        if($scope.password != $scope.passwordRepeat) {
            $scope.errorMessage = "The passwords are not the same.";
            return;
        }
        $scope.isLoading = true;
        ForgotPasswordService.setNewPassword($scope.key, $scope.password,
            function successfullChange() {
                $scope.success = "The password has been set. You can login with your new credentials.";
                $scope.isLoading = false;
            },
            function errorSetPassword(error) {
                $scope.errorMessage = error;
                $scope.isLoading = false;
            }
        );
    };
    
    
}]);