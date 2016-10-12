(function () {
    'use struct';

    /**
     * @ngdoc directive
     * @name motion.main.components:mainNav
     * @description
     *
     */

    angular.module('motion').component('mainNav', {
            bindings: {
            },
            controller: mainNavCtrl,
            controllerAs: 'mainNavCtrl',
            templateUrl: 'src/scripts/mainNav/mainNav.tpl.html'
        }
    );

    /**
     * @ngdoc controller
     * @name motion.main.components:mainCtrl
     * @description
     *
     */
    function mainNavCtrl() {

        var self = this;


        self.dropDown = false;
        self.toggleDropDown = function () {
            $scope.dropDown = !$scope.dropDown;
        };
        self.tabChange = function (tab) {
            global.tab = tab;
            console.log($window.tab);
        }




    }

}());
