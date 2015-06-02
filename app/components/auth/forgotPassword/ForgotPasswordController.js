/**
 * Requesting a reset password link.
 * 
 * Author: Joost Ouwerling
 * Date: 02/06/2015
 */ 
 

angular.module('CoffeeApp.auth.forgotPassword.ForgotPasswordController', [
    'CoffeeApp.auth.forgotPassword.ForgotPasswordService'    
])

.controller('ForgotPasswordController', ['$scope', 'ForgotPasswordService', 
    function ForgotPasswordController($scope, ForgotPasswordService) {
    
    $scope.success = null;
    $scope.isLoading = false;
    $scope.errorMessage = null;
    
    $scope.requestPasswordReset = function requestPasswordReset() {
        $scope.isLoading = true;
        $scope.success = null;
        $scope.errorMessage = null;
        ForgotPasswordService.requestPasswordReset($scope.username,
            function requestSuccessfull() {
                $scope.success = "Instructions are sent to your e-mail. Check your inbox to continue.";
                $scope.isLoading = false;
            },
            function requestFailure(error) {
                $scope.errorMessage = error;
                $scope.isLoading = false;
            }
        );
    };
    
}]);