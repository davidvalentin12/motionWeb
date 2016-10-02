angular.module('mocean.contact', [])
    .controller('contactController', function ($scope) {
        $scope.sendContactMessage = function(){
            var ZapierRef = new Firebase('https://blistering-heat-482.firebaseio.com/zapier_queue');
            ZapierRef.update({
                "to": "davidvalentinsemail@gmail.com",
                "from": $scope.email,
                "name": $scope.name,
                "phone": $scope.tel,
                "reply": "",
                "subject": "New Mocean Contact Message",
                "text": $scope.message
            })
        };


    });
