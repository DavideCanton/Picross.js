///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
"use strict";
var app = angular.module("picrossApp", ['ngRoute', 'controllers', 'filters', 'services']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/:schemeId', {
        templateUrl: 'partials/show_picross.html',
        controller: 'picrossCtrl'
    }).when('/error/:status', {
        templateUrl: 'partials/error_page.html',
        controller: 'errorCtrl'
    });
    $routeProvider.otherwise("/1");
}]);
//# sourceMappingURL=app.js.map