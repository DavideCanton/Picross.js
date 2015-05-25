///<reference path="typings/angularjs/angular.d.ts"/>
"use strict";
var Filters;
(function (Filters) {
    Filters.filters = angular.module("filters", []);
    Filters.filters.filter('reverse', function () {
        return function (items) { return angular.isArray(items) ? items.slice().reverse() : false; };
    });
})(Filters || (Filters = {}));
//# sourceMappingURL=filters.js.map