angular.module('mocean.how', [])

    /*  controller del nav de propiedades en ¿como funciona?  */
    .controller('howPropertieController', function ($scope, $state, $stateParams) {
        $scope.propertiename = 'Policarbonate';
        if ($stateParams.propertiename) {
            $scope.propertiename = $stateParams.propertiename;
        }
    })

;


