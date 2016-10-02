angular.module('mocean.account', ['firebase', 'simpleLogin','userFBFactory', 'productsFactory'])
    /* profileController */
    .controller('profileController', function ($scope,  $location, $firebaseAuth, simpleLogin,userFBFactory, userCartFactory) {
        if (simpleLogin.connected) {
            /*
             Si el usuario esta conectado con su cuenta, queremos facilitarle la
             informacion que ya sabemos de el autocompletandola en el formulario.
             */
            $scope.user = userFBFactory.getUserFBData(simpleLogin.userData.uid);
        } else {
            /*
            Redireccionamos a home, no tiene sentido que un usuario no logueado llegue a su profile
             */
            $location.path('/home');
        }
        $scope.updatePersonalInformation = function(firstname, lastname, idType, idNumber,  tlf){
            var email=simpleLogin.userData.password.email;
            userFBFactory.updateUserPersonalInfo(simpleLogin.userData.uid, firstname, lastname, idType, idNumber, email, tlf);
            alert('Succesfully updated Personal Information')
        };
        $scope.updateAddressInformation = function(address1, address2, city, state, zip){
            var selectedMethod='ondelivery';
            userFBFactory.updateUserAddressInfo(simpleLogin.userData.uid, selectedMethod, address1, address2, city, state, zip);
            alert('Succesfully updated Address Information')
        };


        /*
         Profile, variable global, que ahora mismo solo
         utilizo para postear el email acutal, atraves de
         "profile.userData.password.email"
         (posible mejora haciendo esta variable global)
         */

        $scope.profile = {};
        $scope.profile.userData = simpleLogin.userData;
        /*
         Change email llama al metodo del la factoria
         */
        $scope.changeEmail = function () {
            return simpleLogin.changeEmail($scope.newEmail, $scope.password);
        };
        /*
         changePasswordMessage, si las contraseñas no coinciden
         cambiara este mensaje y se mostrara debajo del formulario
         */
        $scope.changePasswordMessage = "";
        /*
         CHANGE PASSWORD
         */
        $scope.changePassword = function () {
            if (!angular.equals($scope.newPassword, $scope.newPassword2)) {
                $scope.changePasswordMessage = "Passwords have to match";
            } else {
                $scope.changePasswordMessage = simpleLogin.changePassword($scope.password, $scope.newPassword);
            }
        };

    })
    /* LOGIN CONTROLLER */
    .controller('loginController', function ($scope, simpleLogin, $location, $window, userCartFactory) {

        /*
         LOGIN
         */
        $scope.loginSubmit = function () {
            simpleLogin.ref.authWithPassword({
                email:  $scope.email,
                password: $scope.password
            }, function (error, authData) {
                if (error) {
                    console.log("login failed!", error);
                    $scope.errorMessage = error;
                } else {
                    console.log("Authenticated successfully with payload", authData);
                    simpleLogin.createUserFB(authData.uid, authData.password.email);
                    alert('You are now succesfully logged in your account.');

                    $location.path('/home');
                    $window.location.reload();
                }
            }, {
                remember: 'sessionOnly'
            })
        };

        /*
         PASSWORD RESET
         */
        $scope.sendResetPassword = function () {
            simpleLogin.sendResetPassword($scope.email);
        };

    })
    /* REGISTER CONTROLLER */
    .controller('registerController', function ($scope, simpleLogin, $location, $window) {
        $scope.registerSubmit = function () {
            if (!angular.equals($scope.password, $scope.password2)) {
                $scope.errorMessage = 'Passwords have to match.';
                console.log('Passwords have to match.');
            } else {
                simpleLogin.authObj.$createUser({
                    email: $scope.email,
                    password: $scope.password
                }).then(function (userData) {
                    console.log("User created with uid: " + userData.uid);
                    $scope.errorMessage = "Your account has been succesfully created, we'll now log you in.";
                    simpleLogin.ref.authWithPassword({
                        email:  $scope.email,
                        password: $scope.password
                    }, function (error, authData) {
                        if (error) {
                            console.log("login failed!", error);
                            $scope.errorMessage = error;
                        } else {
                            console.log("Authenticated successfully with payload", authData);
                            simpleLogin.createUserFB(authData.uid, authData.password.email)
                            alert('You are now succesfully logged in your account.');

                            $location.path('/home');
                            $window.location.reload();
                        }
                    }, {
                        remember: 'sessionOnly'
                    })
                }).catch(function (error) {
                    console.log(error.message);
                    $scope.errorMessage = error.message;
                });
            }
        };
    })
;