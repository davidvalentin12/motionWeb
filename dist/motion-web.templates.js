(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('srcscripts/home/home.tpl.html',
    '<div id=home><div class=backgroundImage></div><div class=spacer></div><div class="row intro"><section class="group t-center" ng-controller=taglinesController><h1>Mocean Secure System</h1><br><h3 class=maintagline>Worlds most versatile unbreakable glasses!</h3><br><h5 ng-repeat="tagline in taglines track by $index" ng-if="(tagline.$id)==selectedId-1" class="animate-if t-center">{{tagline.$value}}</h5></section><br><br><section class="t-center span_2_of_3 float-middle"><div class=float-middle ng-controller=mainVideoController><a class="videoButton hvr-grow" ng-click="global.video=true; playVid()"><i class="fa fa-1x fa-play-circle"></i>Watch our video</a></div></section></div><div ng-controller=mainVideoController><div class="popUpBackGround videoDisplay span2of2" ng-init="global.video=false" ng-show="global.video==true" ng-click="global.video=false; pauseVid()"><video id=mainVideo controls=true ng-click="global.video=true"><source src=/img/MoceanVideo.mp4 type=video/mp4></video><br><a ng-click="video=false"><i class="fa fa-2x fa-times-circle-o"></i></a></div></div><div class="row howitwork"><header class="section group"><h3 class=float-left>Our idea</h3><a ui-sref="index.how.propertie({propertiename: \'Neodymium\' })" class="btn green float-right"><i class="fa fa-1x fa-plus"></i> <i class="fa fa-1x fa-info-circle"></i><label>Know more</label></a></header><section class=group><div class="col span_2_of_6 propertieBox"><h4 class="span_2_of_2 t-center">Secure</h4><div class="span_2_of_2 t-center iconBox"><i class="fa fa-5x fa-lock"></i></div><div class="span_2_of_2 descriptionBox group"><p class=span_2_of_2>Mocean has designed a special system to secure glasses and other galleyware that can adapt to uneven surfaces and with different inclinations.</p></div></div><div class="col span_2_of_6 propertieBox"><h4 class="span_2_of_2 t-center">Elegant</h4><div class="span_2_of_2 t-center iconBox"><i class="fa fa-5x fa-diamond"></i></div><div class="span_2_of_2 descriptionBox group"><p class=span_2_of_2>All Mocean products are hand finished to remove manufacturing join lines, giving the best clarity and elegance possible.</p></div></div><div class="col span_2_of_6 propertieBox"><h4 class="span_2_of_2 t-center">Simple</h4><div class="span_2_of_2 t-center iconBox"><i class="fa fa-5x fa-glass"></i></div><div class="span_2_of_2 descriptionBox group"><p class=span_2_of_2>All our products are easy to use, and does not require changing consumer habits or make a specific installation.</p></div></div></section></div><div class=productDisplayOnMain ng-controller=productsOnMainController><div class=row><header class="section group"><h3 class=float-left>Trending products</h3></header><article class="section group"><div class="col span_1_of_3 product" ng-repeat="product in products" ng-if=productIsShown(product.$id)><a ui-sref="index.products.product({productname: \'{{product.name}}\', })"><img class="productImage span_2_of_2" ng-src={{product.image}}></a><label class="span_2_of_2 productName float-left">{{product.name}}</label><a ui-sref="index.products.product({productname: \'{{product.name}}\'})" class=""><label class="span_2_of_2 float-left btn green productDetails">Details</label></a></div><a ui-sref=index.products><h5 class="btn blue invert float-right span_2_of_8 seeallproducts">See all products <i class="fa fa-1x fa-arrow-right"></i></h5></a></article></div></div><div class=spacer></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('srcscripts/main/motionMain.tpl.html',
    '<div id=wrapper><div ui-view=header id=header></div><div ui-view=container id=container></div><div ui-view=footer id=footer></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('srcscripts/mainNav/mainNav.tpl.html',
    '<header id=header><div class="section group" ng-init="global.tab = 1"><div class=row><i class="fa fa-bars fa-2x" ng-click=toggleDropDown()></i> <a ui-sref=index.home><div class=logo_wrapper><img src=src/images/logo.png></div></a><nav><ul class=dropdownnav ng-show=dropDown><li ng-click=mainNavCtrl.toggleDropDown() ui-sref=index.home class=hvr-underline-from-left><i class="fa fa-home"></i>Homes</li><li ng-click=mainNavCtrl.toggleDropDown() ui-sref=index.how class=hvr-underline-from-left>Idea</li><li ng-click=mainNavCtrl.toggleDropDown() ui-sref=index.products class=hvr-underline-from-left>Products</li><li class=hvr-underline-from-left>About us<ul><li ng-click=mainNavCtrl.toggleDropDown() ui-sref=index.company class=hvr-underline-reveal>Our Team</li><li ng-click=mainNavCtrl.toggleDropDown() ui-sref=index.contact class=hvr-underline-reveal>Contact</li></ul></li><li class=hvr-underline-from-left>My Account<ul ng-if=!global.login><li ng-click=mainNavCtrl.toggleDropDown() ui-sref=index.account.login ng-if=!global.login class=hvr-underline-reveal>Login<i class="fa fa-1x fa-sign-in"></i></li><li ng-click=mainNavCtrl.toggleDropDown() ui-sref=index.account.register ng-if=!global.login class=hvr-underline-reveal>Sign Up</li></ul><ul ng-if=global.login><li ng-click=mainNavCtrl.toggleDropDown() ui-sref=index.products.cart class=hvr-underline-reveal>Your Cart <i class="fa fa-1x fa-shopping-cart"></i></li><li ng-click=mainNavCtrl.toggleDropDown() ui-sref=index.account.orders class=hvr-underline-reveal>Orders</li><li ng-click=mainNavCtrl.toggleDropDown() ui-sref=index.account.profile class=hvr-underline-reveal>Settings</li><li ng-click=logout() class=hvr-underline-reveal>Logout<i class="fa fa-1x fa-sign-out"></i></li></ul></li><li ng-click=mainNavCtrl.toggleDropDown() class=t-center><i class="fa fa-2x fa-arrow-up"></i></li></ul><ul class=horizontalnav><li ui-sref=index.home class=hvr-underline-from-center><i class="fa fa-home"></i>Home</li><li ui-sref=index.how class=hvr-underline-from-center>Idea</li><li ui-sref=index.products class=hvr-underline-from-center>Products</li><li>About us<ul><li ui-sref=index.company class=hvr-underline-reveal>Our Team</li><li ui-sref=index.contact class=hvr-underline-reveal>Contact</li></ul></li><li>My Account<ul ng-if=!global.login><li ui-sref=index.account.login ng-if=!global.login class=hvr-underline-reveal>Login <i class="fa fa-1x fa-sign-in"></i></li><li ui-sref=index.account.register ng-if=!global.login class=hvr-underline-reveal>Sign Up</li></ul><ul ng-if=global.login><li ui-sref=index.products.cart class=hvr-underline-reveal>Your Cart <i class="fa fa-1x fa-shopping-cart"></i></li><li ui-sref=index.account.orders class=hvr-underline-reveal>Orders</li><li ui-sref=index.account.profile class=hvr-underline-reveal>Settings</li><li ng-click=logout() class=hvr-underline-reveal>Logout <i class="fa fa-1x fa-sign-out"></i></li></ul></li></ul></nav></div></div></header>');
}]);
})();

(function(module) {
try {
  module = angular.module('dvm.templates');
} catch (e) {
  module = angular.module('dvm.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('srcscripts/mainFooter/mainFooter.tpl.html',
    '');
}]);
})();
