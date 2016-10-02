angular.module('simpleLogin', ['firebase'])


    .factory('simpleLogin', function ($firebaseAuth, $location) {
        /*
         @ref needed in all simpleLogin methods
         */
        var ref = new Firebase("https://blistering-heat-482.firebaseio.com");
        /*
         @simpleLogin factory
         */
        var simpleLogin = {};
        /*
         @getUserData               triggered when user is logged in o loggen out
         @simpleLogin.connected     "true" if user is connected, "false" if not
         @simpleLogin.userData      container of all simplelogins connected user data
         */
        var getUserData = function (authData) {
            if (authData) {
                simpleLogin.connected = true;
                simpleLogin.userData = authData;
            } else {
                simpleLogin.connected = false;
                simpleLogin.userData = null;
            }
        };
        /*
         triggers getUserData() when users changes conected or disconected state
         */
        ref.onAuth(getUserData);
        /*
         @authObj firebase object refencing to simplelogins methods and users
         */
        var authObj = $firebaseAuth(ref);
        simpleLogin.authObj= authObj;
        simpleLogin.ref= ref;

        /*
         @simpleLogin.loginwWithPassword  trys to log user in and return succes or failure message
         */
        simpleLogin.loginWithPassword = function (email, password, remember) {
            ref.authWithPassword({
                email: email,
                password: password
            }, function (error, authData) {
                if (error) {
                    console.log("login failed!", error);
                    return error;
                } else {
                    console.log("Authenticated successfully with payload", authData);
                    alert('You are now succesfully logged in your account.');
                    $location.path('/home');
                    return "success";
                }
            }, {
                remember: remember
            })
        };






        /*
         @simpleLogin.sendResetPassword trys to send reset email, return succes or failure message
         */
        simpleLogin.sendResetPassword = function (email) {
            authObj.$resetPassword({
                email: email
            }).then(function () {
                console.log("Password reset email sent successfully!");
                alert("Password reset email sent successfully!");
            }).catch(function (error) {
                console.error("Error: ", error);
            });
        };
        /*
         @simpleLogin.changeEmail trys to change email, return succes or failure message
         */
        simpleLogin.changeEmail = function (newEmail, password) {
            authObj.$changeEmail({
                oldEmail: simpleLogin.userData.password.email,
                newEmail: newEmail,
                password: password
            }).then(function () {
                console.log("Email changed successfully!");
                return "Email changed successfully!"
            }).catch(function (error) {
                console.error("Error: ", error);
                return "Error: " + error
            });
        };
        /*
         @simpleLogin.changePassword trys to change password, return succes or failure message
         */
        simpleLogin.changePassword = function (password, newPassword) {
            authObj.$changePassword({
                email: simpleLogin.userData.password.email,
                oldPassword: password,
                newPassword: newPassword
            }).then(function () {
                console.log("Password changed successfully!");
                alert("Password changed successfully");
                return "Password changed successfully"
            }).catch(function (error) {
                console.error("Error: ", error);
                return "Error"
            });
        };
        /*
         createUser
         */
        simpleLogin.createSimpleLogin = function (email, password) {
            authObj.$createUser({
                email: email,
                password: password
            }).then(function (userData) {
                simpleLogin.createUserFB(userData.uid, email);
                console.log("User created with uid: " + userData.uid);
                alert("User created with uid: " + userData.uid);
                return true;
            }).catch(function (error) {
                console.log(error.message);
                alert(error.message);
                return false;
            });
        };
        simpleLogin.createUserFB = function (uid, email) {
            var newUserFB = new Firebase("https://blistering-heat-482.firebaseio.com/mocean/users/" + uid);
            /*
             @newUserFB.set insert email data to save this first information of the user in his FB
             */
            newUserFB.update({
                email: email
            });
        };



        /*
         Returns factory with all asignated methods and variables
         */
        return simpleLogin;
    });













