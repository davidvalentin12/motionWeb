angular.module('userCartFactory', ['firebase', 'productsFactory'])

    .factory('userCartFactory', function ($firebaseObject, $window, allProductsFactory) {

        var userCartFactory = {};

        userCartFactory.userCart = function(uid){
            var userCartRef = new Firebase('https://blistering-heat-482.firebaseio.com/mocean/users/'+uid+'/cart');
            return $firebaseObject(userCartRef);
        };
        userCartFactory.updateLocalCartToFB = function (uid){
            for(var i=0;$window.cart.length<i;i++){
                cartFactory.updateProductAmountInUserCart(uid, i, amount);
            }

        };
        userCartFactory.updateProductAmountInUserCart = function(uid, productID, amount){
            var userProductRef = new Firebase('https://blistering-heat-482.firebaseio.com/mocean/users/'+uid+'/cart/'+productID);
            userProductRef.update({
                "id": productID,
                "amount": amount
            });
        };
        userCartFactory.updateLocalTotalPriceToFB = function(uid){
            var products = allProductsFactory.products;
            products.$loaded().then(function () {
                var totalPrice = function () {
                    var totalPrice = 0;
                    for (var i = 0; i < $window.cart.length; i++) {
                        totalPrice = totalPrice + ($window.cart[i].amount * products[i].Price);
                    }
                    return totalPrice;
                };
                $window.cart.totalPrice = totalPrice();
                var userProductRef = new Firebase('https://blistering-heat-482.firebaseio.com/mocean/users/'+uid+'/cart');
                console.log($window.cart.totalPrice);
                userProductRef.update({
                    "totalPrice" : $window.cart.totalPrice
                });
            });
        };


        userCartFactory.updateFBCartToLocal = function (uid){
            var userCartFB = userCartFactory.userCart(uid);
            userCartFB.$loaded().then(function () {
                angular.forEach(userCartFB, function (value, key) {//recorremos el cart del usuario en busca de algun valor no nulo
                    if (value.amount != null) {
                        /*
                         Si encuentra un valor que no sea nullo, quiere decir
                         que este usuario ya tiene un shopping cart con item añadidos en su perfil,
                         por tanto sustituiremos la cantidad de su cart actual por la cantidad de su perfil
                         */

                        $window.cart[key].amount = value.amount;
                    }
                    if(key=='totalPrice'){
                        console.log("actualizada totalprice de fb a local :" +value);
                        $window.cart.totalPrice = value;
                    }
                });
            });
        };

        return userCartFactory;
    })
;