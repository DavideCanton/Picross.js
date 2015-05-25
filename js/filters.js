///<reference path="typings/angularjs/angular.d.ts"/>
"use strict";
var filters = angular.module("filters", []);
filters.filter('reverse', function () {
    return function (items) { return angular.isArray(items) ? items.slice().reverse() : false; };
});
//# sourceMappingURL=filters.js.map