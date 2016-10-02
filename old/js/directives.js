
/* Directives */
angular.module('mocean.directives', [])
    .directive('loginpanel', function() {
        return {
            restrict: 'E',
            templateUrl: "views/account/loginPanel.html",
            controller: 'loginController'
        };
    })



;
