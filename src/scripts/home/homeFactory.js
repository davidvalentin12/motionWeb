angular.module('homeFactory', ['firebase'])

    .factory('taglineFactory', function ($firebaseArray) {
        var taglinesRef = new Firebase('https://blistering-heat-482.firebaseio.com/mocean/taglines');
        var taglineFactory = {};
        taglineFactory.taglines= $firebaseArray(taglinesRef);
        return taglineFactory;
    })

;