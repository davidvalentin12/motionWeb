angular.module('productsFactory', ['firebase'])

    .factory('allProductsFactory', function ($firebaseArray) {
        var productsRef = new Firebase('https://blistering-heat-482.firebaseio.com/mocean/products');
        var allProductsFactory = {};
        allProductsFactory.products = $firebaseArray(productsRef);

        return allProductsFactory;
    })

;