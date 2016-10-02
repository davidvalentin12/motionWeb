angular.module('mocean.shopping', ['mocean.shopping.directives', 'productsFactory', 'userFBFactory', 'simpleLogin', 'userCartFactory'])
    .controller('shoppingController', function ($scope, $location, allProductsFactory, userFBFactory, simpleLogin, userCartFactory, $window) {
        $scope.paymentMethods = ['On delivery', 'Credit Card'];
        $scope.user = {};


        if (simpleLogin.connected) {
            /*
             Si el usuario esta conectado con su cuenta, queremos facilitarle la
             informacion que ya sabemos de el autocompletandola en el formulario.
             */
            $scope.user = userFBFactory.getUserFBData(simpleLogin.userData.uid);
        } else {
            /*
             Ofrecemos la opcion de loggearse si llega a este paso sin estarlo
             */
        }

        $scope.step1Submit = function (firstname, lastname, idType, idNumber, tlf, email, password1, password2) {
            if (!simpleLogin.connected) {
                /*
                 Primero tenemos que mirar si el email introducido ya esta uso, intentando registrarlo
                 */
                simpleLogin.authObj.$createUser({
                    email: email,
                    password: password1
                }).then(function (userData) {
                    // ON SUCCES-- si conseguimos que se cree el usuario lo logeamos para poder actualizar su perfil
                    simpleLogin.ref.authWithPassword({
                        email: email,
                        password: password1
                    }, function (error, authData) {
                        if (error) {
                            console.log("login failed!", error); //si sale algun error al conectarse
                        } else {
                            //si lo conectamos con exito
                            //creamos la instancia con su email
                            simpleLogin.createUserFB(userData.uid, email);
                            //actualizamos los datos del formulario en su instancia
                            userFBFactory.updateUserPersonalInfo(userData.uid, firstname, lastname, idType, idNumber, email, tlf);
                            //actualizamos del cart local a su instancia tambien
                            userCartFactory.updateLocalCartToFB(userData.uid);
                            userCartFactory.updateLocalTotalPriceToFB(userData.uid);
                            $window.location.replace('/#/shopping/step2');
                            $window.location.reload();
                        }
                    }, {
                        remember: 'sessionOnly'
                    });
                }).catch(function (error) {
                    //ERROR - si el email esta en uso o cualquier otro error
                    console.log(error);
                    if (error.code == 'EMAIL_TAKEN') {
                        $scope.errorMessage = 'This email has already an associated account, if its your email try to log in. ';
                    } else if (error.code == 'INVALID_EMAIL') {
                        $scope.errorMessage = 'Invalid email ';
                    } else {
                        $scope.errorMessage = error.message;
                    }
                });
            } else if (simpleLogin.connected) {
                //actualizamos los datos del formulario en su instancia
                var userData = simpleLogin.userData;
                userFBFactory.updateUserPersonalInfo(userData.uid, firstname, lastname, idType, idNumber, email, tlf);
                //actualizamos del cart local a su instancia
                userCartFactory.updateLocalCartToFB(userData.uid);
                //cambiamos de location al siguiente paso de la compra
                $location.path('/shopping/step2');
            }
        };
        $scope.step2Submit = function (selectedMethod, address1, address2, city, state, zip, creditcardnumber, creditcardexpirationMoth, creditcardexpirationYear, creditcardcode) {
            var userData = simpleLogin.userData;
            if (selectedMethod == 'ondelivery') {
                userFBFactory.updateUserAddressInfo(userData.uid, selectedMethod, address1, address2, city, state, zip);
                /*
                 Una vez actualizada la informacion a nivel global dentro del FB del usuario.
                 Tenemos que crear la instancia de este pedido.
                 */
                userFBFactory.newFinishedShopping(userData.uid);
            } else {
                /*
                 PAYPAL MAYBE
                 */
            }
            $location.path('/shopping/step3');
        }
    }
)

;