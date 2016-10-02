angular.module('mocean.account.ordertable', ['firebase', 'simpleLogin', 'userFBFactory', 'productsFactory'])

    .controller('orderTableController', function ($scope, simpleLogin, userFBFactory, allProductsFactory, ngTableParams) {
        if (simpleLogin.connected) {
            /*
             Si el usuario esta conectado con su cuenta
             */
            $scope.user = userFBFactory.getUserFBData(simpleLogin.userData.uid);
            $scope.user.$loaded().then(function () {
                $scope.userOrders = $scope.user.orders;
                angular.forEach($scope.userOrders, function (value, key) {
                    console.log($scope.userOrders.value);
                });
            });
            $scope.products = allProductsFactory.products;


            $scope.tableParams = new ngTableParams({
                    sorting: {
                        timestamp: 'asc'
                    }
                }
                , {})
        }
    })


;