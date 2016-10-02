/**
 * Created by DAAAVIIID on 19/03/2015.
 */
'use strict';

/* Declaro una variable global, accesible por $window.cart, para poder acceder a ella e editarla desde toda la app */
var cart=[];

/* Declaro mi modulo principal, y sus dependencias */
angular.module('mocean', ['ui.router','angular-loading-bar', 'ngTable','ngMap',
    'mocean.controllers',
    'mocean.config'
])

;