angular.module('userFBFactory', ['firebase'])

    .factory('userFBFactory', function ($firebaseObject) {
        var userFBFactory = {};
        userFBFactory.getUserFBData = function (uid) {
            var userFB = new Firebase("https://blistering-heat-482.firebaseio.com/mocean/users/" + uid);
            return $firebaseObject(userFB);
        };
        userFBFactory.updateUserPersonalInfo = function (uid, firstname, lastname, idType, idNumber, email, tlf) {
            var userFB = new Firebase('https://blistering-heat-482.firebaseio.com/mocean/users/' + uid);
            userFB.update({
                    firstname: firstname,
                    lastname: lastname,
                    idType: idType,
                    idNumber: idNumber,
                    email: email,
                    tlf: tlf
                }
            );
            console.log('Personal info Actualizada');
        };
        userFBFactory.updateUserAddressInfo = function (uid, selectedMethod, address1, address2, city, state, zip, creditcardnumber, creditcardexpirationMoth, creditcardexpirationYear, creditcardcode) {
            var userFB = new Firebase('https://blistering-heat-482.firebaseio.com/mocean/users/' + uid);
            userFB.update({
                selectedMethod: selectedMethod,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zip: zip
            });
            /*
             userFB.update({
             selectedMethod: selectedMethod,
             creditcardnumber: creditcardnumber,
             creditcardexpirationMoth: creditcardexpirationMoth,
             creditcardexpirationYear: creditcardexpirationYear,
             creditcardcode: creditcardcode
             })
             */
            console.log('Address info Actualizada');
        };
        userFBFactory.createUserFB = function (uid, email) {
            var newUserFB = new Firebase("https://blistering-heat-482.firebaseio.com/mocean/users/" + uid);
            /*
             @newUserFB.set insert email data to save this first information of the user in his FB
             */
            newUserFB.set({
                email: email
            });
        };
        userFBFactory.newFinishedShopping = function (uid) {
            /*
             Creamos la instancia del order global en Mocean/Orders para asi tener una lista de todos los orders y cada una tenga su identificador unico
             Y tambien creamos otra instancia dentro del FB del usuario, para poder listarle sus orders mas facilmente
             */
            var userOrders = new Firebase('https://blistering-heat-482.firebaseio.com/mocean/orders');
            var newOrderRef = userOrders.push({
                    uid: uid
                }
            );
            /*
            Key que necesitaremos para acceder al order y meterle todos los productos y demas.
             */
            var orderID = newOrderRef.key();
            var userFBData = userFBFactory.getUserFBData(uid);
            var userFBOrder = new Firebase("https://blistering-heat-482.firebaseio.com/mocean/users/" + uid + "/orders/" + orderID);
            var orderRef = new Firebase("https://blistering-heat-482.firebaseio.com/mocean/orders/" + orderID);
            userFBData.$loaded().then(function () {
                angular.forEach(userFBData, function (value, key) {
                    if(key!='orders'){
                        userFBOrder.child(key).set(value);
                        orderRef.child(key).set(value);
                    }
                });
                userFBOrder.child('orderID').set(orderID);
                orderRef.child('orderID').set(orderID);
                userFBOrder.child('TIMESTAMP').set(Firebase.ServerValue.TIMESTAMP);
                orderRef.child('TIMESTAMP').set(Firebase.ServerValue.TIMESTAMP);
                userFBOrder.child('status').set('Ordered');
                orderRef.child('status').set('Ordered');
            })
        };
        return userFBFactory;



    });