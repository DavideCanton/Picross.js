///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="controllers.ts"/>
var PicrossApp;
(function (PicrossApp) {
    "use strict";
    PicrossApp.app = angular.module("picrossApp", ['ngRoute', 'controllers', 'directives']);
    PicrossApp.app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {}).when('/scheme', {
            templateUrl: 'partials/show_picross.html',
            controller: 'picrossCtrl'
        }).when('/error/:status', {
            templateUrl: 'partials/error_page.html',
            controller: 'errorCtrl'
        }).otherwise("/error/404");
    }]);
})(PicrossApp || (PicrossApp = {}));
//# sourceMappingURL=app.js.map