angular.module('mocean.products', [])

    /*  products/shopping cart controller */
    .controller('shoppingCartController', function ($scope, $firebaseObject, $window, allProductsFactory) {
        $scope.products = allProductsFactory.products;
        $scope.shoppingCart = $window.cart;

        $scope.products.$loaded().then(function () {
            $scope.totalPrice = function () {
                var totalPrice = 0;
                for (var i = 0; i < $window.cart.length; i++) {
                    totalPrice = totalPrice + ($window.cart[i].amount * $scope.products[i].Price);
                }
                return totalPrice;
            };
        });
        /*
         Miramos si hay algun item en el cart, si no devolvemos true para que se vea el mensaje de que no hay items
         */
        $scope.noItems = function () {
            var noItems = true;
            for (var i = 0; i < $window.cart.length; i++) {
                if ($window.cart[i].amount != null) {
                    noItems = false;
                }
            }
            return noItems;
        };
        $scope.confirmCart = function () {
            /*Llamamos a esta funcion cuando pasamos del cart al primer paso de compra,
            asi podremos llamar a esta variable desde $window mas adelante cuando este
            conectado el usuario y podamos acceder a su FB
             */
            $window.cart.totalPrice = $scope.totalPrice();
        }
    })

    /* controllador de un producto seleccionado  */
    .controller('selectedProductController', function ($scope, $stateParams, allProductsFactory) {
        $scope.productname = $stateParams.productname;
        var products = allProductsFactory.products;
        products.$loaded().then(function () {
            angular.forEach(products, function (value, key) {
                if (value.name === $scope.productname) {
                    $scope.selectedProduct = value;
                    $scope.selectedProductID = key;
                }
            });
        });
    })
    /* Global product/Filter controller */
    .controller('productController', function ($scope, allProductsFactory) {
        $scope.products = allProductsFactory.products;
        $scope.shownItems = [1, 8, 9];
        $scope.productIsShown = function (id) {
            for (var i = 0; i <= $scope.shownItems.length; i++) {
                if ($scope.shownItems[i] == id) {
                    return true;
                }
            }
            return false;
        };

        $scope.filter = [];
        $scope.getTypes = function () {
            return ($scope.products || []).map(function (p) {
                return p.Category;
            }).filter(function (p, idx, arr) {
                return arr.indexOf(p) === idx;
            });
        };
        $scope.filterByType = function (product) {
            return $scope.filter[product.Category] || noFilter($scope.filter);
        };

        function noFilter(filterObj) {
            for (var key in filterObj) {
                if (filterObj[key]) {
                    return false;
                }
            }
            return true;
        }
    })
;
