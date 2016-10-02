angular.module('mocean.mainController', ['firebase', 'simpleLogin', 'userCartFactory'])


    /* Main/Global Controller */
    .controller('mainController', function ($scope, $window, $firebaseObject, $location, allProductsFactory, userCartFactory, simpleLogin, userCartFactory) {
        //variable global para todo tipo de variables
        $scope.global = {
            'login': false
        };
        /*
         Cargamos las id's de los productos en el shopping cart, llamando a los productos y luego iterando por ellos asignando a cada id un amount null
         */
        var products = allProductsFactory.products;
        products.$loaded().then(function () {
            angular.forEach(products, function (value, key) {
                $window.cart.push(
                    {
                        "id": key,
                        "amount": null
                    }
                );
            });
        });
        /*
         metodos add, remove y delete  globales, para modificar productos en el cart desde toda la web (product page basically)
         */
        $scope.addToCart = function (id, amount) {
            /*
             Cambio de "amount" al producto en el cart "local" en cliente
             */
            $window.cart[id].amount = ($window.cart[id].amount) + amount;
            console.log("You added " + amount + " units to item-->id:" + $window.cart[id].id + " ,amount:" + $window.cart[id].amount);
            /*
             Llamamos al firebasedel producto dentro del cart del usuario conectado (o undefinded si no hay nadie conectado)
             Y le asignamos el nuevo "amount" al producto correspondiente
             */
            var userData = simpleLogin.userData;
            if(userData!=null){
                userCartFactory.updateProductAmountInUserCart(userData.uid, id, $window.cart[id].amount);
                userCartFactory.updateLocalTotalPriceToFB(userData.uid);
            }
        };
        $scope.removeFromCart = function (id, amount) {
            /*
             Cambio de "amount" al producto en el cart "local" en cliente
             Con la condicion de que no sea 0 ya, en ese caso no haria nada, ya que no queremos que baje de 0 a numero negativos
             */
            if ($window.cart[id].amount > 0) {
                $window.cart[id].amount = ($window.cart[id].amount) - amount;
                console.log("You removed " + 1 + " units to item-->id:" + $window.cart[id].id + " ,amount:" + $window.cart[id].amount);
                /*
                 Llamamos al firebasedel producto dentro del cart del usuario conectado (o undefinded si no hay nadie conectado)
                 Y le asignamos el nuevo "amount" al producto correspondiente
                 */
                var userData = simpleLogin.userData;
                if(userData!=null) {
                    userCartFactory.updateProductAmountInUserCart(userData.uid, id, $window.cart[id].amount);
                    userCartFactory.updateLocalTotalPriceToFB(userData.uid);
                }
            }
        };
        $scope.deleteFromCart = function (id) {
            /*
             Cambio de "amount" al producto en el cart "local" en cliente
             */
            $window.cart[id].amount = null;
            console.log("You deleted item-->id:" + $window.cart[id].id);
            /*
             Llamamos al firebasedel producto dentro del cart del usuario conectado (o undefinded si no hay nadie conectado)
             Y le asignamos el nuevo "amount" al producto correspondiente (en este caso null)
             */
            var userData = simpleLogin.userData;
            if(userData!=null) {
                userCartFactory.updateProductAmountInUserCart(userData.uid, id, $window.cart[id].amount);
                userCartFactory.updateLocalTotalPriceToFB(userData.uid);
            }
        };
        /*
         SESION DE USUARIO, etc...
         */
        if (simpleLogin.userData!=null) {
            var userData = simpleLogin.userData;
            console.log("User " + userData.uid + " is logged in with " + userData.password.email);
            $scope.global.login = true;
            /*
             como esta funcion se ejecuta en haberse conectado un usuario
             tambien pasaremos por aqui la funcion que mire si exite un shipping cart en su perfil
             */
            console.log("lala");
            userCartFactory.updateFBCartToLocal(userData.uid);
        } else {
            console.log("User is logged out");
            /*
            El usuario esta deslogeado
             */
            $scope.global.login = false;
        }
        var ref = new Firebase("https://blistering-heat-482.firebaseio.com");
        /* Logout function */
        $scope.logout = function () {
            //Cerramos sesion
            ref.unauth();
            //Recargamos la pagina a la home
            $location.path('/home');
            $window.location.reload();
        };
    })
;
