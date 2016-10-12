(function () {
    'use strict';

    angular.module('motion').config(function ($stateProvider) {

        $stateProvider
            .state('index', {
                url: '',

                views: {
                    'header@': {
                        template: '<main-nav></main-nav>'
                    },
                    'container@': {
                        template: 'src/scripts/home/home.tpl.html'
                    },
                    'footer@': {
                        template: 'src/scripts/mainfooter.html'
                    }
                }
            })
            .state('index.home', {
                url: '/home',
                views: {
                    'header@': {
                        templateUrl: 'views/mainnav.html'
                    },
                    'container@': {
                        templateUrl: 'views/home/home.html'
                    },
                    'footer@': {
                        templateUrl: 'views/mainfooter.html'
                    }
                },
                onEnter: function(){
                    //$window.scrollTo(0,0);
                }
            })
            /*-------------PRODUCTS-PRODUCTS-PRODUCTS------------*/
            .state('index.products', {
                url: '/products',
                views: {
                    'container@': {
                        templateUrl: 'views/products/products.html'
                    },
                    'productState@index.products': {
                        templateUrl: 'views/products/products.filter.html'
                    }
                },
                onEnter: function(){
                   // $window.scrollTo(0,0);
                }
            })/*--------------SELECTED-PRODUCT------------*/
            .state('index.products.product', {
                url: '/product/:productname',
                views: {
                    'productState@index.products': {
                        templateUrl: 'views/products/products.product.html',
                        controller: 'selectedProductController'
                    }
                },
                onEnter: function(){
                    //$window.scrollTo(0,0);
                }
            })
            /*--------------SHOPPING-CART------------*/
            .state('index.products.cart', {
                url: '/cart',
                views: {
                    'productState@index.products': {
                        templateUrl: 'views/products/products.cart.html',

                    }
                },
                onEnter: function(){
                   // $window.scrollTo(0,0);
                }
            })
            /*-------------SHOPPING-SHOPPING-SHOPPING------------*/
            .state('index.shopping', {
                url: '/shopping',
                views: {
                    'container@': {
                        templateUrl: 'views/shopping/shopping.html'
                    },
                    'shoppingState@index.shopping': {
                        templateUrl: 'views/shopping/shopping.step1.html'
                    }
                },
                onEnter: function(){
                   // $window.scrollTo(0,0);
                }
            })
            .state('index.shopping.step1', {
                url: '/step1',
                views: {
                    'shoppingState@index.shopping': {
                        templateUrl: 'views/shopping/shopping.step1.html'
                    }
                },
                onEnter: function(){
                   // $window.scrollTo(0,0);
                }
            })
            .state('index.shopping.step2', {
                url: '/step2',
                views: {
                    'shoppingState@index.shopping': {
                        templateUrl: 'views/shopping/shopping.step2.html'
                    }
                },
                onEnter: function(){
                   // $window.scrollTo(0,0);
                }
            })
            .state('index.shopping.step3', {
                url: '/step3',
                views: {
                    'shoppingState@index.shopping': {
                        templateUrl: 'views/shopping/shopping.step3.html'
                    }
                },
                onEnter: function(){
                    //$window.scrollTo(0,0);
                }
            })
            /*-------------COMPANY-COMPANY-COMPANY------------*/
            .state('index.company', {
                url: '/team',
                views: {
                    'container@': {
                        templateUrl: 'views/company/company.html'
                    }
                },
                onEnter: function(){
                   // $window.scrollTo(0,0);
                }
            })
            /*-------------CONTACT-CONTACT-CONTACT------------*/
            .state('index.contact', {
                url: '/contact',
                views: {
                    'container@': {
                        templateUrl: 'views/contact/contact.html'
                    }
                },
                onEnter: function(){
                   // $window.scrollTo(0,0);
                }
            })
            /*-------------HOW-HOW-HOW------------*/
            .state('index.how', {
                url: '/idea',
                views: {
                    'container@': {
                        templateUrl: 'views/how/howitworks.html'
                    },
                    'propertieView@index.how': {
                        templateUrl: 'views/how/propertie.html',
                        controller: 'howPropertieController'
                    }
                },
                onEnter: function(){
                    //$window.scrollTo(0,0);
                }
            })
            /*-------------HOW-PROPERTIES------------*/
            .state('index.how.propertie', {
                url: '/:propertiename',

                views: {
                    'propertieView@index.how': {
                        templateUrl: 'views/how/propertie.html',
                        controller: 'howPropertieController'
                    }
                },
                onEnter: function(){
                   // $window.scrollTo(0,0);
                }
            })
            /*-------------ACCOUNT------------*/
            .state('index.account', {
                url: '/account',
                views: {
                    'container@': {
                        templateUrl: 'views/account/account.html'
                    },
                    'accountState@index.account':{
                        templateUrl: 'views/account/login_register/register.html'
                    }
                },
                onEnter: function(){
                   // $window.scrollTo(0,0);
                }

            })
            /*--------ACCOUNT-REGISTER-------*/
            .state('index.account.register', {
                url: '/register',
                views: {
                    'accountState@index.account':{
                        templateUrl: 'views/account/login_register/register.html'
                    }
                }
                ,
                onEnter: function( ){
                    if(simpleLogin.connected){
                        $location.path('/home');
                    }
                    // $window.scrollTo(0,0);
                }
            })
            /*--------ACCOUNT-LOGIN-------*/
            .state('index.account.login', {
                url: '/login',
                views: {
                    'accountState@index.account':{
                        templateUrl: 'views/account/login_register/login.html'

                    }
                },
                onEnter: function(){
                    if(simpleLogin.connected){
                        $location.path('/home');
                    }
                    // $window.scrollTo(0,0);
                }

            })
            /*------ACCOUNT-PROFIL-------*/
            .state('index.account.profile', {
                url: '/profile',
                views: {
                    'accountState@index.account':{
                        templateUrl: 'views/account/profile.html'
                    }
                },
                onEnter: function(){
                    if(simpleLogin==null){
                        $location.path('/home');
                    }
                    // $window.scrollTo(0,0);
                }
            })
            /*------ACCOUNT-ORDERS--------*/
            //.state('index.account.orders', {
            //    url: '/orders',
            //    views: {
            //        'accountState@index.account':{
            //            templateUrl: 'views/account/orders.html'
            //        }
            //    },
            //    onEnter: function(){
            //        if(simpleLogin==null){
            //            $location.path('/home');
            //        }
            //        // $window.scrollTo(0,0);
            //    }
            //})
    })
    .run( function ($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $state.transitionTo('index.home');
    })

})();