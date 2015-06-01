///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="controllers.ts"/>
var PicrossApp;
(function (PicrossApp) {
    "use strict";
    PicrossApp.app = angular.module("picrossApp", ['ngRoute', 'controllers', 'filters', 'services', 'directives']);
    PicrossApp.app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/scheme/:schemeId', {
            templateUrl: 'partials/show_picross.html',
            controller: 'picrossCtrl'
        }).when('/error/:status', {
            templateUrl: 'partials/error_page.html',
            controller: 'errorCtrl'
        });
        $routeProvider.otherwise("/scheme/1");
    }]);
})(PicrossApp || (PicrossApp = {}));
//# sourceMappingURL=app.js.map