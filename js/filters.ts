///<reference path="typings/angularjs/angular.d.ts"/>

"use strict";

module Filters
{
    export var filters : ng.IModule = angular.module("filters", []);

    filters.filter('reverse', () =>
    {
        return (items) => angular.isArray(items) ? items.slice().reverse() : false;
    });
}