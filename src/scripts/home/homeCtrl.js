angular.module('mocean.home', ['homeFactory'])
    /* main video controller */
    .controller('mainVideoController', function ($scope) {
        var myVideo = document.getElementById("mainVideo");
        $scope.playVid = function () {
            myVideo.play();
        };
        $scope.pauseVid = function () {
            myVideo.pause();
        };
    })

    .controller('productsOnMainController', function ($scope, allProductsFactory) {
        $scope.products = allProductsFactory.products;
        $scope.shownItems = [1, 8, 9];

        /* seleccionar productos para la main page */

        $scope.productIsShown = function (id) {
            for (var i = 0; i <= $scope.shownItems.length; i++) {
                if ($scope.shownItems[i] == id) {
                    return true;
                }
            }
            return false;
        };
    })

    /* Taglines controller*/
    .controller('taglinesController', function ($scope, $interval, taglineFactory) {
        $scope.taglines = taglineFactory.taglines;
        $scope.selectedId = 1;
        $scope.taglines.$loaded().then(function () {
            var numTaglines = $scope.taglines.length;
            $interval(function () {
                $scope.selectedId = $scope.selectedId++;
                var max = numTaglines;
                if ($scope.selectedId >= max) {
                    $scope.selectedId = 0;
                }
                $scope.selectedId++;
            }, 8000, 0);
        });
        $scope.x = {item: 1};
    })

    /* Menu/Navigation controller */
    .controller('menuController', function ($scope, $window) {
        $scope.dropDown = false;
        $scope.toggleDropDown = function () {
            $scope.dropDown = !$scope.dropDown;
        };
        $scope.tabChange = function (tab) {
            global.tab = tab;
            console.log($window.tab);
        }
    })
;