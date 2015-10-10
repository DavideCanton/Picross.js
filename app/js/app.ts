///<reference path="typings/angularjs/angular.d.ts"/>
///<reference path="typings/angularjs/angular-route.d.ts"/>
///<reference path="controllers.ts"/>

module PicrossApp
{
    "use strict";

    export var app : ng.IModule = angular.module("picrossApp", ['ngRoute', 'controllers', 'directives']);

    app.config(['$routeProvider',
        ($routeProvider : ng.route.IRouteProvider) =>
        {
            $routeProvider.
                when('/', {}).
                when('/scheme', {
                    templateUrl: 'partials/show_picross.html',
                    controller: 'picrossCtrl'
                }).
                when('/error/:status', {
                    templateUrl: 'partials/error_page.html',
                    controller: 'errorCtrl'
                }).
                otherwise("/error/404");
        }]);
}
